import "dotenv/config";

export const test = {
  PORT: process.env.PORT || 5001,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017",
  MONGO_USER: process.env.MONGO_USER || "root",
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || "password",
  MONGO_DB: process.env.MONGO_DB || "",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  RABBITMQ_HOST: process.env.RABBITMQ_HOST || "localhost",
  RABBITMQ_PORT: process.env.RABBITMQ_PORT || "5672",
  RABBITMQ_DEFAULT_USER: process.env.RABBITMQ_DEFAULT_USER || "user",
  RABBITMQ_DEFAULT_PASS: process.env.RABBITMQ_DEFAULT_PASS || "password",
  OTP_QUEUE: process.env.OTP_QUEUE || "otp_queue",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "90d",
};
