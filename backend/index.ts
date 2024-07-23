import express from "express";
import { client } from "./dbinit";
import { createUser, getUser } from "./routes/userRoutes";
import { becomeAuthor, isAuthor } from "./routes/authorRoutes";
import audioRouter from "./routes/uploadAuthorBooks";
import cors from "cors";
const app = express();
const port = 3000;

client.connect();
app.use(cors());
app.use(express.json());

app.post("/register", createUser);
app.post("/user/:firebase_uid", getUser);
app.put("/author", becomeAuthor);
app.get("/author/:firebase_uid", isAuthor);
app.use("/audio", audioRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
