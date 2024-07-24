import { Request, Response } from "express";
import { authorQueries } from "../queries";

export const becomeAuthor = async (req: Request, res: Response) => {
  const { firebase_uid } = req.body;

  if (!firebase_uid) {
    return res.status(400).json({ error: "firebase_uid is required" });
  }

  try {
    const result = await authorQueries.becomeAuthor.values(firebase_uid);

    if (result.length > 0) {
      res.status(200).json({ is_author: result[0].is_author });
    } else {
      res.status(404).json({ message: "Failed to update to Author" });
    }
  } catch (error) {
    console.error("Error updating user to author:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const isAuthor = async (req: Request, res: Response) => {
  const { firebase_uid } = req.params;

  if (!firebase_uid) {
    return res.status(400).json({ error: "firebase_uid is required" });
  }

  try {
    const result = await authorQueries.isAuthor.values(firebase_uid);

    if (result.length > 0) {
      res
        .status(200)
        .json({ is_author: result[0].is_author, id: result[0].id });
    } else {
      res.status(200).json({ message: "User is not an author" });
    }
  } catch (error) {
    console.error("Error fetching author status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const insertPurchaseCode = async (req: Request, res: Response) => {
  const { author_id, code, audio_file_id, expires_at, firebase_uid } = req.body;

  if (!firebase_uid) {
    return res.status(400).json({ error: "firebase_uid is required" });
  }

  try {
    const result = await authorQueries.insertPurchaseCode.values(
      author_id,
      code,
      audio_file_id,
      expires_at
    );

    if (result.length > 0) {
      res.status(200).json({ code: result[0].code });
    } else {
      res.status(404).json({ message: "error creating code" });
    }
  } catch (error) {
    console.error("Error fetching author status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAuthorsBooks = async (req: Request, res: Response) => {
  const { author_id } = req.params;
  console.log(req.params);
  if (!author_id) {
    return res.status(400).json({ error: "author_id is required" });
  }

  try {
    const result = await authorQueries.getAuthorsBooks.values(author_id);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "No books found" });
    }
  } catch (error) {
    console.error("Error fetching author status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
