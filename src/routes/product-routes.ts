import multer from "multer";
import uploadConfig from "../config/multer.js";
import { Router } from "express";
import CreateProductController from "../controllers/product/create-product-controller.js";
import ListProductController from "../controllers/product/list-product-controller.js";
import DeleteProductController from "../controllers/product/delete-product-controller.js";
import isAuthenticated from "../middlewares/is-authenticated.js";
import isAdmin from "../middlewares/is-admin.js";
import { validateSchema } from "../middlewares/validate-schema.js";
import {
  createProductSchema,
  listProductsSchema,
  deleteProductSchema,
} from "../schemas/product-schema.js";

const router = Router();
const upload = multer(uploadConfig);

const createProductController = new CreateProductController();
const listProductController = new ListProductController();
const deleteProductController = new DeleteProductController();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Criação de produto
 *     tags: [Products]
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
 *               - description
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: Camiseta Preta
 *               description:
 *                 type: string
 *                 example: Camiseta 100% algodão, tamanho M
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 79.90
 *               stock:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       "201":
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
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
  upload.single("file"),
  validateSchema(createProductSchema),
  createProductController.handle
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: disabled
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Filtrar por produtos desabilitados (true) ou habilitados (false)
 *     responses:
 *       "200":
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 */
router.get(
  "/",
  isAuthenticated,
  validateSchema(listProductsSchema),
  listProductController.handle
);

/**
 * @swagger
 * /products/{product_id}:
 *   delete:
 *     summary: Desabilitar um produto
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto a ser desabilitado
 *     responses:
 *       "200":
 *         description: Produto desabilitado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product disabled successfully
 *       "404":
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       "401":
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       "403":
 *         description: Proibido (apenas Admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.delete(
  "/:product_id",
  isAuthenticated,
  isAdmin,
  validateSchema(deleteProductSchema),
  deleteProductController.handle
);
export default router;
