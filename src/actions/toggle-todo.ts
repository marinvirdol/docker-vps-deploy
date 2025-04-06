"use server";

import { db } from "@codemachine/db";
import { todos, toggleTodoSchema } from "@codemachine/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleTodoAction(formData: FormData) {
  const id = formData.get("id");
  const idNumber = id ? Number(id) : null;
  const validationResult = toggleTodoSchema.safeParse({ id: idNumber });

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    // First, get the current todo to toggle its state
    const currentTodo = await db
      .select()
      .from(todos)
      .where(eq(todos.id, validationResult.data.id))
      .limit(1);

    if (currentTodo.length === 0) {
      return { success: false, error: "Todo not found" };
    }

    // Toggle the completed status
    await db
      .update(todos)
      .set({ completed: !currentTodo[0].completed })
      .where(eq(todos.id, validationResult.data.id));

    revalidatePath("/");

    return { success: true, message: "Todo updated" };
  } catch (error) {
    console.error("Failed to toggle todo:", error);
    return { success: false, error: "Failed to update todo" };
  }
}
