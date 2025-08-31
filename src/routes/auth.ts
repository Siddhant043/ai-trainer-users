import { Router } from "express";
import { loginUser, verifyUser } from "../controllers/auth.js";

const router = Router();

router.post("/login", loginUser);
router.post("/verify", verifyUser);

export default router;
