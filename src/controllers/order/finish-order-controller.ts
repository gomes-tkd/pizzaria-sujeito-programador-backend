import { type Request, type Response } from "express";
import FinishOrderService from "../../services/order/finish-order-service.js";
import AppError from "../../errors/app-errors.js";

export default class FinishOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { order_id, name } = req.body;

      const finishOrderService = new FinishOrderService();

      const order = await finishOrderService.execute({
        name,
        order_id,
      });

      return res.status(200).json(order);
    } catch (error) {
      throw new AppError("Error finishing order: " + (error as Error).message);
    }
  }
}
