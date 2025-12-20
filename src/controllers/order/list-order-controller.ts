import { type Request, type Response } from "express";
import ListOrderService from "../../services/order/list-order-service.js";

export default class ListOrderController {
  async handle(req: Request, res: Response) {
    const draft = req.query?.draft as string | undefined;
    const listOrders = new ListOrderService();

    const orders = await listOrders.execute({ draft });
    return res.json(orders);
  }
}
