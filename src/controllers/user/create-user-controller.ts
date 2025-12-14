import { type Request, type Response } from "express";
import { CreateUserService } from "../../services/create-user-service.js";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    console.log(name, email, password);

    const createUserService = new CreateUserService();
    const user = await createUserService.execute();

    return res.json({ message: "User createddd", user });
  }
}
