import { Router } from "express";
import userRoutes from "./user-routes.js";
import authRoutes from "./auth-routes.js";
import categoryRoutes from "./category-routes.js";
import productRoutes from "./product-routes.js";
import orderRoutes from "./order-routes.js";
import swaggerRoutes from "./swagger-routes.js";

const router = Router();

router.use(swaggerRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/order", orderRoutes);

export { router };
