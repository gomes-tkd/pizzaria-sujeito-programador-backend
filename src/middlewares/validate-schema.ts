import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodType } from "zod";

export const validateSchema =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation Error",
          details: error.issues.map((issue) => ({
            field: issue.path.slice(1).join(".") || issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      throw error;
    }
  };
