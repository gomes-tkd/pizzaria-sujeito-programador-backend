import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/users", (req: Request, res: Response) => {
  res.json({ message: "User created" });
});

export { router };
