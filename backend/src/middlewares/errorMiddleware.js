import { ApiError } from "../utils/apiError.js";

export const notFoundHandler = (_req, _res, next) => {
  next(new ApiError(404, "Route not found."));
};

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error.";
  const details = error.details || null;

  res.status(statusCode).json({
    success: false,
    message,
    details,
  });
};
