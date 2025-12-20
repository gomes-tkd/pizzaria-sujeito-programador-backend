import { type Request, type Response } from "express";
import AddItemOrderService from "../../services/order/add-item-order-service.js";

export default class AddItemOrderController {
  async handle(req: Request, res: Response) {
    const { orderId, productId, quantity } = req.body;

    const addItemOrderService = new AddItemOrderService();

    const orderItem = await addItemOrderService.execute({
      orderId,
      productId,
      quantity,
    });

    return res.status(201).json(orderItem);
  }
}
