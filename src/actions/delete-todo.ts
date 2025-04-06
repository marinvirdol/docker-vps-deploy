"use server";

import { db } from "@codemachine/db";
import { deleteTodoSchema, todos } from "@codemachine/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteTodoAction(_: unknown, formData: FormData) {
  const id = formData.get("id");
  const idNumber = id ? Number(id) : null;

  console.log("id", idNumber);

  const validationResult = deleteTodoSchema.safeParse({ id: idNumber });

  if (!validationResult.success) {
    console.log(
      "validationResult",
      validationResult.error.flatten().fieldErrors
    );
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  console.log("remove todo", id, validationResult.data.id);

  try {
    await db.delete(todos).where(eq(todos.id, validationResult.data.id));
    revalidatePath("/");
    return { success: true, message: "Todo deleted successfully" };
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return { success: false, error: "Failed to delete todo" };
  }
}
