import prisma from "../../prisma/index.js";
import AppError from "../../errors/app-errors.js";
import { iso } from "zod";

interface FinishOrderProps {
  name: string;
  order_id: string;
}

export default class FinishOrderService {
  async execute({ name, order_id }: FinishOrderProps) {
    try {
      const isOrder = await prisma.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!isOrder) {
        throw new AppError("Order not found");
      }

      if (name !== isOrder.name) {
        throw new AppError("Name does not match the order");
      }

      const order = await prisma.order.update({
        where: {
          id: order_id,
        },
        data: {
          draft: false,
          name: name,
          status: "DONE",
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
      throw new AppError("Error finishing order: " + (error as Error).message);
    }
  }
}
