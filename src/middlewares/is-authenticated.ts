import "dotenv/config";
import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Token missing" });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = jwt.verify(
      token!,
      process.env.JWT_SECRET as string
    ) as IPayload;

    req.userId = sub;

    return next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
