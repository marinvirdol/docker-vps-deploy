"use client";
import { deleteTodoAction } from "@codemachine/actions/delete-todo";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { DeletedTodo } from "@codemachine/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteTodoSchema } from "@codemachine/db/schema";

interface DeleteTodoFormProps {
  id: number;
}

export function DeleteTodoForm({ id }: DeleteTodoFormProps) {
  const [isPending, startTransition] = useTransition();

  const deleteForm = useForm<DeletedTodo>({
    resolver: zodResolver(deleteTodoSchema),
    defaultValues: {
      id: id,
    },
  });

  const handleSubmit = (values: DeletedTodo) => {
    startTransition(async () => {
      const result = await deleteTodoAction(values);
      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.message);
      }
    });
  };

  return (
    <form onSubmit={deleteForm.handleSubmit(handleSubmit)}>
      <input type="hidden" name="id" value={id} />
      <Button variant="ghost" size="sm" type="submit" disabled={isPending}>
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}
