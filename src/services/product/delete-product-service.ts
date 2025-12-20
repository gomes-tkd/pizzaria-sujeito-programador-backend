import prisma from "../../prisma/index.js";
import AppError from "../../errors/app-errors.js";

interface DeleteProductServiceProps {
  product_id: string;
}

export default class DeleteProductService {
  async execute({ product_id }: DeleteProductServiceProps) {
    try {
      await prisma.product.update({
        where: {
          id: product_id,
        },
        data: {
          disabled: true,
        },
      });

      return {
        message: "Product disabled successfully",
      };
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new AppError("Product not found", 404);
      }
      throw error;
    }
  }
}
