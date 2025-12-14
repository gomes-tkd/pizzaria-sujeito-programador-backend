import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger.config.js";
import CreateUserController from "./controllers/user/create-user-controller.js";
import AuthUserController from "./controllers/user/auth-user-controller.js";
import DetailsUserController from "./controllers/user/details-user-controller.js";
import { validateSchema } from "./middlewares/validate-schema.js";
import { authUserSchema, createUserSchema } from "./schemas/user-schema.js";
import isAuthenticated from "./middlewares/is-authenticated.js";
import isAdmin from "./middlewares/is-admin.js";
import CreateCategoryController from "./controllers/category/create-category-controller.js";

const router = Router();

// Documentação
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criação de um novo Usuário Staff/Admin
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Chef Pizzaiolo
 *               email:
 *                 type: string
 *                 format: email
 *                 example: chef@pizzaria.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *               phone:
 *                 type: string
 *                 example: "5511991234567"
 *               role:
 *                 $ref: '#/components/schemas/Role'
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Dados inválidos ou e-mail já em uso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle
);

/**
 * @swagger
 * /session:
 *   post:
 *     summary: Autenticação de Usuário (Staff/Admin)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthCredentials'
 *     responses:
 *       '200':
 *         description: Login bem-sucedido. Retorna o token de acesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1Ni...
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '401':
 *         description: Credenciais inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle
);

/**
 * @swagger
 * /user_details:
 *   get:
 *     summary: Obter detalhes do usuário autenticado
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Detalhes do usuário obtidos com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Token ausente ou inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  "/user_details",
  isAuthenticated,
  new DetailsUserController().handle
);

/**
 * @swagger
 * /create_category:
 *   post:
 *     summary: Cria uma nova Categoria
 *     tags:
 *       - Categories
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
 *                 example: Pizzas Doces
 *     responses:
 *       '201':
 *         description: Categoria criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '403':
 *         description: Não autorizado (Acesso apenas para ADMIN).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/create_category",
  isAuthenticated,
  isAdmin,
  new CreateCategoryController().handle
);

export { router };
