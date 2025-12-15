import { Router } from "express";
import CreateCategoryController from "../controllers/category/create-category-controller.js";
import { validateSchema } from "../middlewares/validate-schema.js";
import { createCategorySchema } from "../schemas/category-schema.js";
import isAuthenticated from "../middlewares/is-authenticated.js";
import isAdmin from "../middlewares/is-admin.js";

const router = Router();
const createCategoryController = new CreateCategoryController();

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Criação de categoria (Requer ADMIN)
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 *       "400":
 *         $ref: "#/components/responses/ValidationError"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 */
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  createCategoryController.handle
);

export default router;
