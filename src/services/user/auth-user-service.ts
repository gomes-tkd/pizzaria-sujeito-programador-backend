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
  role: string;
  token: string;
}

export default class AuthUserService {
  async execute({
    email,
    password,
  }: IAuthUserServiceProps): Promise<IAuthResponse> {
    console.log("--- DEBUG LOGIN ---");
    console.log("Input:", { email, password });

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log("Database User:", user);

    if (!user) {
      throw new AppError("DEBUG ERROR: User NOT FOUND in database", 401);
    }

    const passwordMatch = await compare(password, user.password);

    console.log("Password Comparison:", {
      inputPassword: password,
      dbHash: user.password,
      match: passwordMatch,
    });

    if (!passwordMatch) {
      throw new AppError("DEBUG ERROR: Password HASH MISMATCH", 401);
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
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
      role: user.role,
      token,
    };
  }
}
