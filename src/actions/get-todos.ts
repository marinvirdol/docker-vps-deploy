"use server";

import { db } from "@codemachine/db";
import { todos } from "@codemachine/db/schema";
import { desc } from "drizzle-orm";

export async function getTodos() {
  try {
    return await db.select().from(todos).orderBy(desc(todos.createdAt));
  } catch (error) {
    console.error("Failed to fetch todos", error);
    return [];
  }
}
