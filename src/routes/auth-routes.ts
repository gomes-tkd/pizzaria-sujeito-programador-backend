import { Router } from "express";
import AuthUserController from "../controllers/user/auth-user-controller.js";
import { validateSchema } from "../middlewares/validate-schema.js";
import { authUserSchema } from "../schemas/user-schema.js";

const router = Router();
const authUserController = new AuthUserController();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticação de usuário
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AuthCredentials"
 *     responses:
 *       "200":
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: "#/components/schemas/User"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 */
router.post(
  "/login",
  validateSchema(authUserSchema),
  authUserController.handle
);

export default router;
