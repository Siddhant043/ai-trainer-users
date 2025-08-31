import mongoose, { Error } from "mongoose";
import { config } from "./env/index.js";

const connectDB = async () => {
  try {
    const dbURI = config.MONGO_URI;
    if (!dbURI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    const mongoOptions = {
      user: config.MONGO_USER || "root",
      pass: config.MONGO_PASSWORD || "password",
      dbName: config.MONGO_DB || "ai_trainer_app",
    };
    const conn = await mongoose.connect(dbURI as string, mongoOptions);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: Error | any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
