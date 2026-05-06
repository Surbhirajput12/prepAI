import express from "express";
import cors from "cors";
import path from "node:path";
import { authRoutes } from "./routes/authRoutes.js";
import { dashboardRoutes } from "./routes/dashboardRoutes.js";
import { resumeRoutes } from "./routes/resumeRoutes.js";
import { prepRoutes } from "./routes/prepRoutes.js";
import { interviewRoutes } from "./routes/interviewRoutes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware.js";
import { env } from "./config/env.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.clientUrl,
      credentials: true,
    })
  );
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static(path.resolve("uploads")));

  app.get("/health", (_req, res) => {
    res.json({
      success: true,
      message: "Server is running.",
      time: new Date().toISOString(),
    });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/dashboard", dashboardRoutes);
  app.use("/api/resume", resumeRoutes);
  app.use("/api/prep", prepRoutes);
  app.use("/api/interview", interviewRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
