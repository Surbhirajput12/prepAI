import { Router } from "express";
import { resumeController } from "../controllers/resumeController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { uploadResume } from "../middlewares/uploadMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const resumeRoutes = Router();

resumeRoutes.post("/upload", requireAuth, uploadResume, asyncHandler(resumeController.upload));
resumeRoutes.get("/me", requireAuth, asyncHandler(resumeController.getMine));
resumeRoutes.post("/suggest", requireAuth, asyncHandler(resumeController.suggest));
