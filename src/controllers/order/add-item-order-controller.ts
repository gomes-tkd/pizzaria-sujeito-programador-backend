import { type Request, type Response } from "express";
import AddItemService from "../../services/order/add-item-order-service.js";
import AppError from "../../errors/app-errors.js";

export default class AddItemOrderController {
  async handle(req: Request, res: Response) {
    const { orderId, productId, amount } = req.body;

    const addItemService = new AddItemService();

    if (!amount) {
      throw new AppError("Quantidade (amount) é obrigatória.");
    }

    const orderItem = await addItemService.execute({
      orderId,
      productId,
      amount: Number(amount),
    });

    return res.status(201).json(orderItem);
  }
}
