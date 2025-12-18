import { type Request, type Response } from "express";
import ListProductService from "../../services/product/list-product-service.js";

export default class ListProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const disabledQuery = req.query.disabled as string | undefined;
    const disabled = disabledQuery === "true";

    const listProductService = new ListProductService();

    const products = await listProductService.execute({ disabled });

    return res.json(products);
  }
}
