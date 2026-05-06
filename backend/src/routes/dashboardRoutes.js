import { Router } from "express";
import { dashboardController } from "../controllers/dashboardController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const dashboardRoutes = Router();

dashboardRoutes.get("/", requireAuth, asyncHandler(dashboardController.summary));
