import "dotenv/config";
import { development } from "./development.js";
import { production } from "./production.js";
import { test } from "./test.js";

const env = process.env.NODE_ENV || "development";

export const config =
  env === "development"
    ? development
    : env === "production"
    ? production
    : test;
