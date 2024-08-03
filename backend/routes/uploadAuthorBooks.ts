import { authorQueries } from "../queries";
import { Request, Response } from "express";

export const uploadBook = (req: Request, res: Response) => {
  if (!req.body.audio) return;
  const { author_id, title, description, audio } = req.body;

  authorQueries.saveAudioFile.values(author_id, title, description, audio);
  res.json({ message: "Audio file uploaded successfully" });
};
