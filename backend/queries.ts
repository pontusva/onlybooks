import { client } from "./dbinit";

export const userQueries = {
  createUser: {
    text: "INSERT INTO users (firebase_uid, username, email, is_author) VALUES ($1, $2, $3, $4) RETURNING *",
    values: async function (
      firebase_uid: string,
      username: string,
      email: string,
      isAuthor: boolean
    ) {
      await client.query(this.text, [firebase_uid, username, email, isAuthor]);
    },
  },
  getUser: {
    text: "SELECT created_at, firebase_uid, is_author, id, username FROM users WHERE firebase_uid = $1",
    values: async function (firebase_uid: string) {
      const result = await client.query(this.text, [firebase_uid]);
      return result.rows;
    },
  },
  redeemCode: {
    text: `
      WITH updated_code AS (
        UPDATE PurchaseCodes
        SET is_redeemed = TRUE
        WHERE code = $1 AND is_redeemed = FALSE
        RETURNING id, audio_file_id
      )
      INSERT INTO Purchases (user_id, purchase_code_id, audio_file_id)
      SELECT $2, id, audio_file_id FROM updated_code
      RETURNING *;
    `,
    values: async function (code: string, user_id: string) {
      try {
        await client.query("BEGIN");
        console.log("Transaction started");

        const result = await client.query(this.text, [code, user_id]);
        console.log("Purchase code updated and purchase inserted", result.rows);

        if (result.rows.length === 0) {
          throw new Error("Invalid or already redeemed code");
        }

        await client.query("COMMIT");
        console.log("Transaction committed");

        return result.rows;
      } catch (error) {
        await client.query("ROLLBACK");
        console.log("Transaction rolled back", error);
        throw error;
      }
    },
  },
  getPurchasedAudioFiles: {
    text: `SELECT af.id, af.title, af.description, af.file_url, af.created_at, p.purchased_at
           FROM AudioFiles af
           INNER JOIN Purchases p ON af.id = p.audio_file_id
           WHERE p.user_id = $1;`,
    values: async function (user_id: string) {
      const result = await client.query(this.text, [user_id]);
      return result.rows;
    },
  },
};

export const authorQueries = {
  becomeAuthor: {
    text: "UPDATE users SET is_author = TRUE WHERE firebase_uid = $1 RETURNING *",
    values: async function (firebase_uid: string) {
      const result = await client.query(this.text, [firebase_uid]);
      return result.rows;
    },
  },
  isAuthor: {
    text: "SELECT * FROM users WHERE firebase_uid = $1 AND is_author = TRUE",
    values: async function (firebase_uid: string) {
      const result = await client.query(this.text, [firebase_uid]);
      return result.rows;
    },
  },
  getAuthorsBooks: {
    text: "SELECT * FROM AudioFiles WHERE author_id = $1",
    values: async function (author_id: string) {
      const result = await client.query(this.text, [author_id]);
      return result.rows;
    },
  },
  saveAudioFile: {
    text: "INSERT INTO AudioFiles (author_id, title, description, file_url) VALUES ($1, $2, $3, $4) RETURNING *;",
    values: async function (
      author_id: number,
      title: string,
      description: string,
      file_url: string
    ) {
      const result = await client.query(this.text, [
        author_id,
        title,
        description,
        file_url,
      ]);
      return result.rows;
    },
  },
  insertPurchaseCode: {
    text: "INSERT INTO PurchaseCodes (author_id, code, audio_file_id, expires_at, is_redeemed) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
    values: async function (
      author_id: number,
      code: string,
      audio_file_id: number,
      expires_at: Date,
      is_redeemed: boolean = false // Default value set to false
    ) {
      const result = await client.query(this.text, [
        author_id,
        code,
        audio_file_id,
        expires_at,
        is_redeemed,
      ]);
      return result.rows;
    },
  },
  getAuthorGeneratedCodes: {
    text: "SELECT af.title, pc.code, pc.id, pc.is_redeemed FROM AudioFiles af JOIN PurchaseCodes pc ON af.id = pc.audio_file_id WHERE af.author_id = $1;",
    values: async function (author_id: string) {
      const result = await client.query(this.text, [author_id]);
      return result.rows;
    },
  },
};
