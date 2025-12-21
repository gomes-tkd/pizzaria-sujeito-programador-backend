import { type Request, type Response } from "express";
import { DetailOrderService } from "../../services/order/detail-order-service.js";

export default class DetailOrderController {
  async handle(req: Request, res: Response): Promise<Response> {
    const order_id = req.query.order_id as string;

    const detailOrderService = new DetailOrderService();

    const orders = await detailOrderService.execute({
      order_id,
    });

    return res.json(orders);
  }
}
