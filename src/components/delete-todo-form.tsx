"use client";
import { deleteTodoAction } from "@codemachine/actions/delete-todo";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useTransition } from "react";

interface DeleteTodoFormProps {
  id: number;
}

export function DeleteTodoForm({ id }: DeleteTodoFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id.toString());

    startTransition(async () => {
      const result = await deleteTodoAction(null, formData);
      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <Button variant="ghost" size="sm" type="submit" disabled={isPending}>
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}
