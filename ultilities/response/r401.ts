import { Response } from "express";

export default (res: Response, message: string = "Unauthorized") => {
  return res.status(401).json({ message });
};
