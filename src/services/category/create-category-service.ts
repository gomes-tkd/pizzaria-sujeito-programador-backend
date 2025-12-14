import AppError from "../../errors/app-errors.js";
import prisma from "../../prisma/index.js";

interface ICreateCategoryProps {
  name: string;
}

export default class CreateCategoryService {
  async execute({ name }: ICreateCategoryProps) {
    const categoryAlreadyExists = await prisma.category.findUnique({
      where: { name },
    });

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists");
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return category;
  }
}
