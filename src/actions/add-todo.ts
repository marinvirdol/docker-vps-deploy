"use server";

import { db } from "@codemachine/db";
import { insertTodoSchema, todos } from "@codemachine/db/schema";
import { revalidatePath } from "next/cache";

export async function addTodoAction(_: unknown, formData: FormData) {
  const title = formData.get("title");

  console.log({ title });

  const validationResult = insertTodoSchema.safeParse({ title });

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  console.log({ validationResult });

  try {
    const todo = await db
      .insert(todos)
      .values({ title: validationResult.data.title })
      .returning();

    revalidatePath("/");

    return {
      success: true,
      todo: {
        id: todo[0].id,
        title: todo[0].title,
        completed: todo[0].completed,
        createdAt: todo[0].createdAt,
      },
    };
  } catch (error) {
    console.error("Failed to add todo", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to add todo. Please try again."],
      },
    };
  }
}
