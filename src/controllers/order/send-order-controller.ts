import { type Request, type Response } from "express";
import SendOrderService from "../../services/order/send-order-service.js";
import AppError from "../../errors/app-errors.js";

export default class SendOrderController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, order_id } = req.body;

      const sendOrderService = new SendOrderService();

      const order = await sendOrderService.execute({
        name,
        order_id,
      });

      return res.status(200).json(order);
    } catch (error) {
      throw new AppError(
        "Error in SendOrderController: " + (error as Error).message
      );
    }
  }
}
