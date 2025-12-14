import { type Request, type Response } from "express";
import { CreateUserService } from "../../services/create-user-service.js";
import { createUserSchema } from "../../schemas/user-schema.js";

export default class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, phone } = createUserSchema.parse(req).body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      phone,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
}
