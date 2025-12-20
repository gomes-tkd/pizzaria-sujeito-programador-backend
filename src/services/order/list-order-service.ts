import prisma from "../../prisma/index.js";

interface ListOrderServiceProps {
  draft?: string | undefined;
}

export default class ListOrderService {
  async execute({ draft }: ListOrderServiceProps) {
    const orders = await prisma.order.findMany({
      where: {
        draft: draft === "true" ? true : false,
      },
      select: {
        id: true,
        table: true,
        name: true,
        status: true,
        draft: true,
        createdAt: true,
        orderItems: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                banner: true,
              },
            },
          },
        },
      },
    });

    return orders;
  }
}
