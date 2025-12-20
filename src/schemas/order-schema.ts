import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z.number({ message: "Table is required" }).int().positive(),
    name: z.string().optional(),
  }),
  // query: z.object({
  //   category_id: z.string({ message: "Category ID is required" }),
  // }),
});
