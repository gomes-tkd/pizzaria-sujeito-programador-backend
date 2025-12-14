import { z } from "zod";

const PHONE_REGEX = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(3, "Name must be at least 3 characters long"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address"),

    phone: z
      .string()
      .min(1, "Phone is required")
      .regex(PHONE_REGEX, "Invalid phone number format"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),

    role: z.enum(["ADMIN", "STAFF"]).optional(),
  }),
});

export const authUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z.string().min(1, "Password is required"),
  }),
});
