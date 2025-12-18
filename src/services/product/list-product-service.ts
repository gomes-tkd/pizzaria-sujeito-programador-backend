import prisma from "../../prisma/index.js";

interface ListProductServiceProps {
  disabled: boolean;
}

export default class ListProductService {
  async execute({ disabled }: ListProductServiceProps) {
    const products = await prisma.product.findMany({
      where: {
        disabled: disabled,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        banner: true,
        disabled: true,
        categoryId: true,
      },
    });

    return products;
  }
}
