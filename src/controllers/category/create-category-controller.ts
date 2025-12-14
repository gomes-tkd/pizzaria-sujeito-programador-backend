import { type Request, type Response } from "express";
import CreateCategoryService from "../../services/category/create-category-service.js";

export default class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({ name });

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  }
}
