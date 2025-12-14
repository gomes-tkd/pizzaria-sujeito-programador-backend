import { type Request, type Response } from "express";
import { authUserSchema } from "../../schemas/user-schema.js";
import AuthUserService from "../../services/user/auth-user-service.js";

export default class AuthUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = authUserSchema.parse(req).body;

    const authUserService = new AuthUserService();

    const authData = await authUserService.execute({ email, password });

    return res.status(200).json(authData);
  }
}
