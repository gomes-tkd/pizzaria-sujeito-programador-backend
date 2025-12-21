import { Router } from "express";
import CreateOrderController from "../controllers/order/create-order-controller.js";
import AddItemOrderController from "../controllers/order/add-item-order-controller.js";
import RemoveItemController from "../controllers/order/remove-order-item-controller.js";
import ListOrdersController from "../controllers/order/list-order-controller.js";
import DetailOrderController from "../controllers/order/detail-order-controller.js";
import SendOrderController from "../controllers/order/send-order-controller.js";
import isAuthenticated from "../middlewares/is-authenticated.js";
import { validateSchema } from "../middlewares/validate-schema.js";
import {
  createOrderSchema,
  removeOrderItemSchema,
  detailOrderSchema,
  sendOrderSchema,
} from "../schemas/order-schema.js";

const orderRoutes = Router();

const createOrderController = new CreateOrderController();
const listOrdersController = new ListOrdersController();
const addItemToOrderController = new AddItemOrderController();
const removeItemController = new RemoveItemController();
const detailOrderController = new DetailOrderController();
const sendOrderController = new SendOrderController();

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
orderRoutes.get("/", isAuthenticated, listOrdersController.handle);

orderRoutes.post("/add-item", isAuthenticated, addItemToOrderController.handle);

/**
 * @swagger
 * /order/remove:
 *   delete:
 *     summary: Remove um item do pedido
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do item a ser removido
 *     responses:
 *       "200":
 *         description: Item removido com sucesso
 *       "400":
 *         description: Item não encontrado
 */
orderRoutes.delete(
  "/remove",
  isAuthenticated,
  validateSchema(removeOrderItemSchema),
  removeItemController.handle
);

/**
 * @swagger
 * /order/detail:
 *   get:
 *     summary: Detalhes do pedido
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       "200":
 *         description: Detalhes do pedido
 */
orderRoutes.get(
  "/detail",
  isAuthenticated,
  validateSchema(detailOrderSchema),
  detailOrderController.handle
);

orderRoutes.put(
  "/send",
  isAuthenticated,
  validateSchema(sendOrderSchema),
  sendOrderController.handle
);

export default orderRoutes;
