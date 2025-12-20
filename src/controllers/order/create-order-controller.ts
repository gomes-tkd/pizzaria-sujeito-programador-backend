import { type Request, type Response } from "express";
import CreateOrderService from "../../services/order/create-order-service.js";

export default class CreateOrderController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { table, name } = req.body;

    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute({
      table: Number(table),
      name,
    });

    return res.json(order);
  }
}
