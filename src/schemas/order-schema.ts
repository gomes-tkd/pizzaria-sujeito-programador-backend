import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z.number({ message: "Table is required" }).int().positive(),
    name: z.string().optional(),
  }),
});

export const removeOrderItemSchema = z.object({
  query: z.object({
    itemId: z
      .string({ message: "Item ID is required" })
      .trim()
      .uuid("Invalid Item ID format"),
  }),
});

export const detailOrderSchema = z.object({
  query: z.object({
    order_id: z
      .string({ message: "Order ID is required" })
      .trim()
      .uuid("Invalid Order ID format"),
  }),
});

export const sendOrderSchema = z.object({
  body: z.object({
    name: z.string({ message: "Name is required" }).trim(),
    order_id: z
      .string({ message: "Order ID is required" })
      .trim()
      .uuid("Invalid Order ID format"),
  }),
});
