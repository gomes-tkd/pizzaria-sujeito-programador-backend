import AppError from "../../errors/app-errors.js";
import prisma from "../../prisma/index.js";

interface DeleteOrderProps {
  order_id: string;
}

export default class DeleteOrderService {
  async execute({ order_id }: DeleteOrderProps) {
    try {
      const isOrder = await prisma.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!isOrder) {
        throw new AppError("Order not found");
      }

      await prisma.order.delete({
        where: {
          id: order_id,
        },
      });

      return {
        message: "Order deleted successfully",
      };
    } catch (error) {
      throw new AppError("Error deleting order: " + (error as Error).message);
    }
  }
}
