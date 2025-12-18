import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Product name is required" })
      .min(2, "Product name must be at least 2 characters long"),

    description: z
      .string({ message: "Product description is required" })
      .min(5, "Product description must be at least 5 characters long"),

    price: z.string({
      message: "Product price is required",
    }),

    category_id: z
      .string({ message: "Category ID is required" })
      .uuid("Invalid category ID"),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().min(5).optional(),

    price: z.number().int("Product price must be an integer").optional(),

    banner: z.string().url().optional(),

    disabled: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().uuid("ID inválido"),
  }),
});

export const deleteProductSchema = z.object({
  params: z.object({
    id: z.string().uuid("ID inválido"),
  }),
});

export const getProductSchema = z.object({
  params: z.object({
    id: z.string().uuid("ID inválido"),
  }),
});

export const listProductsSchema = z.object({
  query: z.object({
    disabled: z
      .enum(["true", "false"])
      .optional()
      .transform((val) => val === "true"),
  }),
});
