import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

// Todos table
export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Create Zod schemas from the Drizzle schema
export const insertTodoSchema = createInsertSchema(todos, {
  // Add refinements to the auto-generated schema
  title: (schema) =>
    schema
      .min(1, { message: "Todo text cannot be empty" })
      .max(100, { message: "Todo text is too long (max 100 characters)" })
      .trim(),
});

export const updateTodoSchema = createUpdateSchema(todos, {
  id: z.number().int().positive(),
  title: (schema) =>
    schema
      .min(1, { message: "Todo text cannot be empty" })
      .max(100, { message: "Todo text is too long (max 100 characters)" })
      .trim(),
});

export const toggleTodoSchema = createUpdateSchema(todos, {
  id: z.number().int().positive(),
});

export const deleteTodoSchema = createUpdateSchema(todos, {
  id: z.number().int().positive(),
});

export const selectTodoSchema = createSelectSchema(todos);

export type Todo = z.infer<typeof selectTodoSchema>;
export type NewTodo = z.infer<typeof insertTodoSchema>;
export type UpdatedTodo = z.infer<typeof updateTodoSchema>;
export type ToggledTodo = z.infer<typeof toggleTodoSchema>;
export type DeletedTodo = z.infer<typeof deleteTodoSchema>;
