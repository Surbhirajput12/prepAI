import { Router } from "express";
import { interviewController } from "../controllers/interviewController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const interviewRoutes = Router();

interviewRoutes.post("/start", requireAuth, asyncHandler(interviewController.start));
interviewRoutes.post("/:id/answer", requireAuth, asyncHandler(interviewController.answer));
interviewRoutes.post("/:id/end", requireAuth, asyncHandler(interviewController.end));
interviewRoutes.get("/:id/report", requireAuth, asyncHandler(interviewController.report));
