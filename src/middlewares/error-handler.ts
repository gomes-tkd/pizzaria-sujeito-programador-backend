import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[ERROR] ${err.message}`);
  console.error(err.stack);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
