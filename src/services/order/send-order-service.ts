import prisma from "../../prisma/index.js";
import AppError from "../../errors/app-errors.js";

interface SendOrderProps {
  name: string;
  order_id: string;
}

export default class SendOrderService {
  async execute({ name, order_id }: SendOrderProps) {
    try {
      const isOrder = await prisma.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!isOrder) {
        throw new AppError("Order not found");
      }

      const order = await prisma.order.update({
        where: {
          id: order_id,
        },
        data: {
          draft: false,
          name: name,
          status: "IN_PRODUCTION",
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
      throw new AppError("Error sending order: " + (error as Error).message);
    }
  }
}
