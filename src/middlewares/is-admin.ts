import { type Request, type Response, type NextFunction } from "express";
import AppError from "../errors/app-errors.js";

export default function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const userRole = req.role;

  if (!userRole || userRole !== "ADMIN") {
    throw new AppError(
      "Access denied. Only Administrators can perform this action.",
      403
    );
  }

  return next();
}
