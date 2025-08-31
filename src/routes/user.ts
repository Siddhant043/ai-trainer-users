import express from "express";
import { getAllUsers } from "../controllers/user.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", getAllUsers);

export default router;
