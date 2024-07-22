import { Request, Response } from "express";
import { userQueries } from "../queries";

export const createUser = (req: Request, res: Response) => {
  const { firebase_uid, username, email, isAuthor } = req.body;
  console.log(firebase_uid, username, email, isAuthor);
  userQueries.createUser.values(firebase_uid, username, email, isAuthor);
  res.status(201).json({ message: "User created" });
};

export const getUser = async (req: Request, res: Response) => {
  const { firebase_uid } = req.params;
  try {
    const userRows = await userQueries.getUser.values(firebase_uid);
    if (userRows.length > 0) {
      res.status(200).json({ user: userRows[0] });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
