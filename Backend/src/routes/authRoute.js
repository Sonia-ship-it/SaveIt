import express from "express";
import { register, login, verifyEmail, withdraw } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { deposit } from "../controllers/authController.js";
import { getDashboard } from "../controllers/authController.js";
const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/verify-email", verifyEmail)
authRoutes.post("/deposit",verifyToken,deposit)
authRoutes.post("/withdraw",verifyToken,withdraw)
authRoutes.get("/dashboard", verifyToken,getDashboard)

export default authRoutes;
