import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

export const authRoutes = Router();

authRoutes.post("/signup", asyncHandler(authController.signup));
authRoutes.post("/login", asyncHandler(authController.login));
authRoutes.post("/oauth/google", asyncHandler(authController.googleOauth));
authRoutes.get("/me", requireAuth, asyncHandler(authController.me));
