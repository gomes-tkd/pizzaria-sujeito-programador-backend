import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        message: "Category name is required",
      })
      .min(2, {
        message: "Category name must be at least 2 characters long",
      }),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, "O nome da categoria deve ter no mínimo 3 caracteres")
      .optional(),
  }),
  params: z.object({
    id: z.string().uuid("ID inválido"),
  }),
});

export const deleteCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid("ID inválido"),
  }),
});

export const getCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid("ID inválido"),
  }),
});

export const listCategoriesSchema = z.object({});
