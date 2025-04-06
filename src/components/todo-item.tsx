"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Checkbox } from "@codemachine/components/ui/checkbox";
import { Todo } from "@codemachine/db/schema";
import { DeleteTodoForm } from "./delete-todo-form";
import { toggleTodoAction } from "@codemachine/actions/toggle-todo";

export function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();

  // Client-side handler for toggle action
  async function handleToggle() {
    startTransition(async () => {
      // Create FormData manually
      const formData = new FormData();
      formData.append("id", todo.id.toString());

      const result = await toggleTodoAction(formData);

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success(result.message);
      }
    });
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          id={`todo-${todo.id}`}
          disabled={isPending}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
            todo.completed ? "line-through text-muted-foreground" : ""
          }`}
        >
          {todo.title}
        </label>
      </div>
      <DeleteTodoForm id={todo.id} />
    </div>
  );
}
