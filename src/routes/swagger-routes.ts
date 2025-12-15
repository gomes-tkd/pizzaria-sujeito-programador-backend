import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../docs/swagger-config.js";

const router = Router();

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
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default router;
