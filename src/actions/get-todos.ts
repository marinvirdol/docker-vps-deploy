"use server";

import { db } from "@codemachine/db";
import { todos } from "@codemachine/db/schema";
import { desc } from "drizzle-orm";

export async function getTodos() {
  console.log("getTodos", process.env.DB_URL);
  try {
    const result = await db.select().from(todos).orderBy(desc(todos.createdAt));
    return {
      success: true,
      todos: result,
    };
  } catch (error) {
    console.error("Failed to fetch todos", error);
    return {
      success: false,
      error: "Failed to fetch todos",
    };
  }
}
