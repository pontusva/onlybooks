import express from "express";
import { client } from "./dbinit";
import { createUser, getUser } from "./routes/userRoutes";
import {
  becomeAuthor,
  isAuthor,
  getAuthorsBooks,
  insertPurchaseCode,
} from "./routes/authorRoutes";
import { streamAudioBook } from "./routes/stream";
import audioRouter from "./routes/uploadAuthorBooks";
import cors from "cors";
const app = express();
const port = 3000;

client.connect();
app.use(cors());
app.use(express.json());

app.post("/register", createUser);
app.put("/author", becomeAuthor);
app.get("/user/:firebase_uid", getUser);
app.get("/author/:firebase_uid", isAuthor);
app.use("/audio", audioRouter);
app.get("/stream", streamAudioBook);
app.get("/author/:author_id/books", getAuthorsBooks);
app.post("/purchase", insertPurchaseCode);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
