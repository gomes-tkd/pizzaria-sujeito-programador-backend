import { hash } from "bcryptjs";
import AppError from "../../errors/app-errors.js";
import prisma from "../../prisma/index.js";

interface ICreateUserProps {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "ADMIN" | "STAFF" | undefined;
}
export class CreateUserService {
  async execute({ name, email, password, phone, role }: ICreateUserProps) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists", 409);
    }

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        phone,
        role: role || "STAFF",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    return user;
  }
}
