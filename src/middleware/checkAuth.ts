import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { config } from "../config/env/index.js";
import { IUser } from "../types/index.js";

export interface AuthenticatedRequest extends Request {
  user?: IUser | null; // The user object will be populated after authentication
}

export const checkAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization?.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
      return;
    }

    const decoded = jwt.verify(token, config.JWT_SECRET as string) as {
      userId: string;
    };

    if (!decoded) {
      res.status(401).json({
        status: "fail",
        message: "Invalid token. Please log in again.",
      });
      return;
    }

    const currentUser = decoded && (await User.findById(decoded.userId));
    req.user = currentUser || null;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      status: "fail",
      message: "Unauthorized access",
    });
  }
};
