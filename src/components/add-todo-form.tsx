"use client";

import { useTransition } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@codemachine/components/ui/button";
import { Input } from "@codemachine/components/ui/input";
import { toast } from "sonner";
import { addTodoAction } from "@codemachine/actions/add-todo";
import { NewTodo, insertTodoSchema } from "@codemachine/db/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@codemachine/components/ui/form";

type FormErrors = {
  title?: string[];
  _form?: string[];
};

type AddTodoResult = {
  success: boolean;
  errors?: {
    title?: string[];
    _form?: string[];
  };
  todo?: {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
  };
};

export function AddTodoForm() {
  const [isPending, startTransition] = useTransition();

  const addForm = useForm<NewTodo>({
    resolver: zodResolver(insertTodoSchema),
    defaultValues: {
      title: "",
    },
  });

  // Client-side handler for add todo action
  const handleSubmit = (values: NewTodo) => {
    startTransition(async () => {
      const result: AddTodoResult = await addTodoAction(values);

      if (!result.success) {
        if (result.errors?.title) {
          toast.error("Validation Error", {
            description: result.errors.title[0],
          });
        } else if (result.errors?._form) {
          toast.error("Error", {
            description: result.errors._form[0],
          });
        }
      } else {
        toast.success("Success", {
          description: "Todo added successfully",
        });

        // Reset the form on success
        addForm.reset();
      }
    });
  };

  return (
    <Form {...addForm}>
      <form
        onSubmit={addForm.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-2"
      >
        <div className="flex space-x-2">
          <div className="flex-1">
            <FormField
              control={addForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Add a new task..."
                      aria-invalid={!!addForm.formState.errors.title}
                      aria-describedby={
                        addForm.formState.errors.title
                          ? "title-error"
                          : undefined
                      }
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isPending}>
            <PlusCircle className="h-4 w-4 mr-2" />
            {isPending ? "Adding..." : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
