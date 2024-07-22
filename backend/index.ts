import express from "express";
import { client } from "./dbinit";
import { createUser, getUser } from "./routes/userRoutes";
import cors from "cors";
const app = express();
const port = 3000;

client.connect();
app.use(cors());
app.use(express.json());

app.post("/register", createUser);
app.post("/user/:firebase_uid", getUser);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
