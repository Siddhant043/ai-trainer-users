import { NextFunction, Request, Response } from "express";
import catchAsync from "../config/catchAsync";
import { redisClient } from "../server";
import { config } from "../config/env/index";
import { publishToQueue } from "../config/rabbitmq";
import User from "../model/user";
import { generateToken } from "../config/generateToken";

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const rateLimitKey = `otp:ratelimit:${email}`;
    const rateLimit = await redisClient.get(rateLimitKey);
    if (rateLimit) {
      res.status(429).json({
        status: "fail",
        message: "Rate limit exceeded. Please try again later.",
      });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpKey = `otp:${email}`;
    await redisClient.set(otpKey, otp, {
      EX: 300, // Store OTP for 5 minutes
    });
    await redisClient.set(rateLimitKey, "1", {
      EX: 60, // Rate limit for 1 minute
    });

    const message = {
      to: email,
      subject: "Your OTP Code",
      body: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    const queueName = config.OTP_QUEUE;

    await publishToQueue(queueName, JSON.stringify(message));
    res.status(200).json({
      message: "OTP sent successfully",
    });
  }
);

export const verifyUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res.status(400).json({
        status: "fail",
        message: "Email and OTP are required",
      });
      return;
    }
    // Check if the OTP exists in Redis
    const otpKey = `otp:${email}`;
    const storedOtp = await redisClient.get(otpKey);

    if (!storedOtp || storedOtp !== otp) {
      res.status(400).json({
        status: "fail",
        message: "Invalid or expired OTP",
      });
      return;
    }

    let user: any = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }
    const token = generateToken(user._id.toString());
    // OTP is valid, proceed with user verification logic
    await redisClient.del(otpKey); // Remove OTP after successful verification

    res.status(200).json({
      user,
      token,
    });
  }
);
