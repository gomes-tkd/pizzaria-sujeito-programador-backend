import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../../errors/app-errors.js";
import prisma from "../../prisma/index.js";

interface IAuthUserServiceProps {
  email: string;
  password: string;
}

interface IAuthResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

export default class AuthUserService {
  async execute({
    email,
    password,
  }: IAuthUserServiceProps): Promise<IAuthResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}
