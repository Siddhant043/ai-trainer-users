import amqp from "amqplib";
import { config } from "./env/index.js";

let channel: amqp.Channel | null = null;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: config.RABBITMQ_HOST || "localhost",
      port: parseInt(config.RABBITMQ_PORT || "5672", 10),
      username: config.RABBITMQ_DEFAULT_USER || "guest",
      password: config.RABBITMQ_DEFAULT_PASS || "guest",
    });

    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
};

export const publishToQueue = async (queue: string, message: any) => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized");
  }

  try {
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    console.log(`Message sent to queue ${queue}:`, message);
  } catch (error) {
    console.error("Error publishing to RabbitMQ queue:", error);
  }
};
