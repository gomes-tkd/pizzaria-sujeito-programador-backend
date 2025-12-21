import prismaClient from "../../prisma/index.js";
import AppError from "../../errors/app-errors.js";

interface AddItemRequest {
  orderId: string;
  productId: string;
  amount: number;
}

export default class AddItemService {
  async execute({ orderId, productId, amount }: AddItemRequest) {
    const product = await prismaClient.product.findFirst({
      where: {
        id: productId,
        disabled: false,
      },
    });

    if (!product) {
      throw new AppError("Produto não encontrado ou indisponível.");
    }

    const orderExists = await prismaClient.order.findUnique({
      where: { id: orderId },
    });

    if (!orderExists) {
      throw new AppError("Pedido não encontrado.");
    }

    try {
      const item = await prismaClient.item.create({
        data: {
          orderId: orderId,
          productId: productId,
          amount: amount, 
        },
        select: {
          id: true,
          amount: true,
          orderId: true,
          productId: true,
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

      return item;
    } catch (err) {
      console.error(err);
      throw new AppError("Erro ao adicionar item ao pedido.");
    }
  }
}
