import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { authorQueries } from "../queries";
import path from "path";

const audioRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.resolve(__dirname, "../audioBooks");
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage });

audioRouter.post("/upload", upload.single("audio"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "No audio file uploaded" });

  const { author_id, title, description } = req.body;

  authorQueries.saveAudioFile.values(
    author_id,
    title,
    description,
    req.file?.filename
  );
  res.json({ message: "Audio file uploaded successfully" });
});

export default audioRouter;
