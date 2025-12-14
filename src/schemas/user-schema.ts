import { z } from "zod";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\(?\d{2}\)?[\s-]?[\d]{4,5}-?[\d]{4}$/;

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Name must be a text" })
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z
      .email({ message: "Invalid email address" })
      .regex(EMAIL_REGEX, { message: "Invalid email format" }),
    phone: z
      .string({ message: "Phone must be a text" })
      .regex(PHONE_REGEX, { message: "Invalid phone number format" }),
    password: z
      .string({ message: "Password must be a text" })
      .min(6, { message: "Password must be at least 6 characters long" }),
  }),
});
