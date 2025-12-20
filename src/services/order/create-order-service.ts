import { ca } from "zod/v4/locales";
import prismaClient from "../../prisma/index.js";
import AppError from "../../errors/app-errors.js";

interface CreateOrderRequest {
  table: number;
  name?: string;
}

export default class CreateOrderService {
  async execute({ table, name }: CreateOrderRequest) {
    try {
      const order = await prismaClient.order.create({
        data: {
          table: String(table),
          name: name ?? "",
        },
        select: {
          id: true,
          table: true,
          name: true,
          status: true,
          draft: true,
          createdAt: true,
        },
      });

      return order;
    } catch (error) {
      throw new AppError("Error creating order: " + (error as Error).message);
    }
  }
}
