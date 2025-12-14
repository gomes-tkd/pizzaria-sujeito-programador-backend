import prisma from "../../prisma/index.js";
import AppError from "../../errors/app-errors.js";

export default class DetailsUserService {
  async execute({ userId }: { userId: string }) {
    if (!userId) {
      throw new AppError("At least one identifier must be provided");
    }

    try {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      });

      if (!user) {
        throw new AppError("User not found", 404);
      }

      return user;
    } catch (error) {
      console.error("Prisma error in DetailsUserService:", error);
      throw new AppError("Error fetching user details");
    }
  }
}
