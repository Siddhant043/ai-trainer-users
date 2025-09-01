import express from "express";
import {
  getAllUsers,
  getCurrentUser,
  updateUser,
} from "../controllers/user.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/me", checkAuth, getCurrentUser);
router.get("/", getAllUsers);
router.patch("/", checkAuth, updateUser);

export default router;
