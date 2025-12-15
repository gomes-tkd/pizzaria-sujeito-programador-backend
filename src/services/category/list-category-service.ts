import prisma from "../../prisma/index.js";

export default class ListCategoryService {
  async execute() {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  }
}
