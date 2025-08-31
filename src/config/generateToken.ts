import "dotenv/config";
import jwt from "jsonwebtoken";
import { config } from "./env/index.js";

const JWT_SECRET = config.JWT_SECRET;

export const generateToken = (userId: string): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const expiresIn = config.JWT_EXPIRES_IN as string;
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "90d",
  });
  return token;
};
