import { Router } from "express";
import CreateOrderController from "../controllers/order/create-order-controller.js";
import AddItemOrderController from "../controllers/order/add-item-order-controller.js";
import ListOrdersController from "../controllers/order/list-order-controller.js";
import isAuthenticated from "../middlewares/is-authenticated.js";
import { validateSchema } from "../middlewares/validate-schema.js";
import { createOrderSchema } from "../schemas/order-schema.js";
import isAdmin from "../middlewares/is-admin.js";

const orderRoutes = Router();

const createOrderController = new CreateOrderController();
const listOrdersController = new ListOrdersController();
const addItemToOrderController = new AddItemOrderController();

/**
 * @swagger
 * /orders:
 * post:
 * summary: Criação de um novo pedido
 * tags: [Order]
 * security:
 *   - bearerAuth: []
 * requestBody:
 *   required: true
 *   content:
 *     application/json:
 *       schema:
 *         type: object
 *         required:
 *           - table
 *         properties:
 *           table:
 *             type: integer
 *             description: Número da mesa
 *           name:
 *             type: string
 *             description: Nome do cliente (opcional)
 * responses:
 *   "201":
 *     description: Pedido criado com sucesso
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/Order"
 */
orderRoutes.post(
  "/",
  isAuthenticated,
  validateSchema(createOrderSchema),
  createOrderController.handle
);

/**
 * @swagger
 * /orders:
 * get:
 * summary: Listar todos os pedidos (Requer ADMIN)
 * tags: [Order]
 * security:
 *   - bearerAuth: []
 * responses:
 *   "200":
 *     description: Lista de pedidos
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Order"
 *   "401":
 *     $ref: "#/components/responses/Unauthorized"
 *   "403":
 *     $ref: "#/components/responses/Forbidden"
 */
orderRoutes.get("/orders", isAuthenticated, listOrdersController.handle);

orderRoutes.post("/add-item", isAuthenticated, addItemToOrderController.handle);

export default orderRoutes;
