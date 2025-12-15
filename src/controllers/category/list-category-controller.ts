import { type Request, type Response } from "express";
import ListCategoryService from "../../services/category/list-category-service.js";

export default class ListCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoryService = new ListCategoryService();

    const categories = await listCategoryService.execute();

    return res.json(categories);
  }
}
