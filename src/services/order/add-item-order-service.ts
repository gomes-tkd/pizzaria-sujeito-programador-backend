import { ca } from "zod/v4/locales";
import prisma from "../../prisma/index.js";
import AppError from "../../errors/app-errors.js";

interface OrderItemProps {
  orderId: string;
  productId: string;
  quantity: number;
}

export default class AddItemOrderController {
  async execute({ orderId, productId, quantity }: OrderItemProps) {
    try {
      const isOrderExists = await prisma.order.findFirst({
        where: {
          id: orderId,
        },
      });

      if (!isOrderExists) {
        throw new AppError("Order not found");
      }

      const isProductExists = await prisma.product.findFirst({
        where: {
          id: productId,
          disabled: false,
        },
      });

      if (!isProductExists) {
        throw new AppError("Product not found");
      }

      const orderItem = await prisma.orderItem.create({
        data: {
          orderId,
          productId,
          quantity,
        },
        select: {
          id: true,
          quantity: true,
          orderId: true,
          productId: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              description: true,
              banner: true,
            },
          },
        },
      });

      return orderItem;
    } catch (error) {
      throw new AppError(
        "Error adding item to order: " + (error as Error).message
      );
    }
  }
}
