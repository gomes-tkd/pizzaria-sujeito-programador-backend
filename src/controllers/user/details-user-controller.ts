import { type Request, type Response } from "express";
import DetailsUserService from "../../services/user/details-user-service.js";
import AppError from "../../errors/app-errors.js";

export default class DetailsUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userId = (req as any).userId;

    if (!userId) {
      throw new AppError("User ID is required", 401);
    }

    const detailsUserService = new DetailsUserService();

    const userDetails = await detailsUserService.execute({ userId });

    return res.status(200).json(userDetails);
  }
}
