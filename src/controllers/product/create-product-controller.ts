import { type Request, type Response, type NextFunction } from "express";
import CreateProductService from "../../services/product/create-product-service.js";
import AppError from "../../errors/app-errors.js";

export default class CreateProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, description, category_id } = req.body;

      if (!req.file) {
        throw new AppError("Banner image is required");
      }

      const parsedPrice = Number(price);

      if (isNaN(parsedPrice)) {
        throw new AppError("Price must be a valid number");
      }

      const createProductService = new CreateProductService();

      const product = await createProductService.execute({
        name,
        price: parsedPrice,
        description,
        category_id,
        bannerBuffer: req.file.buffer,
        bannerName: req.file.originalname,
      });

      return res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
}
