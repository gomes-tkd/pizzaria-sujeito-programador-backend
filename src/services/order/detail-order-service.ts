import prismaClient from "../../prisma/index.js";

interface DetailOrderRequest {
  order_id: string;
}

export class DetailOrderService {
  async execute({ order_id }: DetailOrderRequest) {
    const items = await prismaClient.item.findMany({
      where: {
        orderId: order_id,
      },
      include: {
        product: true,
        order: true,
      },
    });

    return items;
  }
}
