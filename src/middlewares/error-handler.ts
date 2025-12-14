import { type Request, type Response, type NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "../errors/app-errors.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    console.warn(`[DOMAIN ERROR] ${err.message}`);
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      issues: err.format(),
    });
  }

  console.error(`[INTERNAL ERROR] ${err.message}`);
  console.error(err.stack);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
