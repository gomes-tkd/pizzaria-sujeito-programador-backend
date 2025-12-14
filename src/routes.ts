import { Router, type Request, type Response } from "express";
import { CreateUserController } from "./controllers/user/create-user-controller.js";
import { validateSchema } from "./middlewares/validate-schema.js";
import { createUserSchema } from "./schemas/user-schema.js";

const router = Router();

router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle
);

export { router };
