import { NextFunction, Response } from "express";
import catchAsync from "../config/catchAsync.js";
import User from "../model/user.js";
import { AuthenticatedRequest } from "../middleware/checkAuth.js";

export const getUserProfile = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      user,
    });
  }
);

export const updateUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
      return;
    }
    const {
      name,
      email,
      phoneNumber,
      dob,
      physicalDetials,
      dietaryPreferences,
      exercisePreferences,
      timezone,
      language,
      currency,
      equipments,
    } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (dob) user.dob = dob;
    if (physicalDetials) user.physicalDetials = physicalDetials;
    if (dietaryPreferences) user.dietaryPreferences = dietaryPreferences;
    if (exercisePreferences) user.exercisePreferences = exercisePreferences;
    if (timezone) user.timezone = timezone;
    if (language) user.language = language;
    if (currency) user.currency = currency;
    if (equipments) user.equipments = equipments;
    user.updatedAt = new Date();
    await user.save();

    res.status(200).json({
      user,
    });
  }
);

export const getAllUsers = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const users = await User.find();
    res.status(200).json({ users });
  }
);
