"use server";

import { db } from "@codemachine/db";
import { deleteTodoSchema, todos, DeletedTodo } from "@codemachine/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteTodoAction(values: DeletedTodo) {
  const id = values.id;

  const validationResult = deleteTodoSchema.safeParse({ id });

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    await db.delete(todos).where(eq(todos.id, validationResult.data.id));
    revalidatePath("/");
    return { success: true, message: "Todo deleted successfully" };
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return { success: false, error: "Failed to delete todo" };
  }
}
