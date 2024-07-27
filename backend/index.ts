import express from "express";
import { client } from "./dbinit";
import {
  createUser,
  getUser,
  redeemCode,
  getPurchasedAudioFiles,
} from "./routes/userRoutes";
import {
  becomeAuthor,
  isAuthor,
  getAuthorsBooks,
  insertPurchaseCode,
  getAuthorGeneratedCodes,
} from "./routes/authorRoutes";
import { streamAudioBook } from "./routes/stream";
import audioRouter from "./routes/uploadAuthorBooks";
import cors from "cors";
const app = express();
const port = 3000;

client.connect();
app.use(cors());
app.use(express.json());

app.get("/user/:firebase_uid", getUser);
app.get("/author/:firebase_uid", isAuthor);
app.get("/stream/:audio_file", streamAudioBook);
app.get("/author/:author_id/codes", getAuthorGeneratedCodes);
app.get("/author/:author_id/books", getAuthorsBooks);
app.get("/user/:user_id/purchased", getPurchasedAudioFiles);
app.post("/register", createUser);
app.post("/purchase", insertPurchaseCode);
app.post("/user/:user_id/redeem", redeemCode);
app.put("/author", becomeAuthor);
app.use("/audio", audioRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
