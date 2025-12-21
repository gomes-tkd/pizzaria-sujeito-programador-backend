import { type Request, type Response } from "express";
import DeleteOrderService from "../../services/order/delete-order-service.js";

export default class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query?.order_id as string;

    const deleteOrderService = new DeleteOrderService();

    const result = await deleteOrderService.execute({ order_id });

    return res.json(result);
  }
}
