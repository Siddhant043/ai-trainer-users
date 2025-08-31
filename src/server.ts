import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import { createClient } from "redis";
import cors from "cors";
import { connectRabbitMQ } from "./config/rabbitmq.js";
import UserRouter from "./routes/user.js";
import AuthRouter from "./routes/auth.js";
import { config } from "./config/env/index.js";

const PORT = config.PORT;

const app = express();
app.use(express.json());
app.use(cors());

// Connect to Redis
export const redisClient = createClient({
  url: config.REDIS_URL,
});

redisClient
  .connect()
  .then(() => console.log("Connection with Redis"))
  .catch((err) => {
    console.error("Redis connection error:", err);
  });

// Connect to RabbitMQ
connectRabbitMQ()
  .then(() => console.log("RabbitMQ connected successfully"))
  .catch((error) => {
    console.error("Failed to connect to RabbitMQ:", error);
  });

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
