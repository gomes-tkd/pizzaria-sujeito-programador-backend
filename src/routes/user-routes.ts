import { Router } from "express";
import CreateUserController from "../controllers/user/create-user-controller.js";
import DetailsUserController from "../controllers/user/details-user-controller.js";
import { validateSchema } from "../middlewares/validate-schema.js";
import { createUserSchema } from "../schemas/user-schema.js";
import isAuthenticated from "../middlewares/is-authenticated.js";

const router = Router();

const createUserController = new CreateUserController();
const detailsUserController = new DetailsUserController();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criação de usuário Staff/Admin
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 $ref: "#/components/schemas/Role"
 *     responses:
 *       "201":
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       "400":
 *         $ref: "#/components/responses/ValidationError"
 */
router.post("/", validateSchema(createUserSchema), createUserController.handle);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Detalhes do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       "200":
 *         description: Dados do usuário autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 */
router.get("/me", isAuthenticated, detailsUserController.handle);

export default router;
