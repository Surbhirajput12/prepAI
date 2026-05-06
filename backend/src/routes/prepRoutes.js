import { Router } from "express";
import { prepController } from "../controllers/prepController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const prepRoutes = Router();

prepRoutes.get("/plan", requireAuth, asyncHandler(prepController.getPlan));
