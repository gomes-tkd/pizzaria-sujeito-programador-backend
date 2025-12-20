import { type Request, type Response, type NextFunction } from "express";
import DeleteProductService from "../../services/product/delete-product-service.js";

export default class DeleteProductController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const product_id = req.params.product_id as string;

    console.log("Deleting product with ID:", product_id);

    try {
      const deleteProductService = new DeleteProductService();

      const result = await deleteProductService.execute({ product_id });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}
