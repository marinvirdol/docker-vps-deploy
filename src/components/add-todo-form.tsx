"use client";

import { useActionState, useRef, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@codemachine/components/ui/button";
import { Input } from "@codemachine/components/ui/input";
import { toast } from "sonner";
import { addTodoAction } from "@codemachine/actions/add-todo";
import { useFormStatus } from "react-dom";

type FormErrors = {
  title?: string[];
  _form?: string[];
};

export function AddTodoForm() {
  const [addTodoResponse, addTodo, isPending] = useActionState(
    addTodoAction,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  // async function clientAction(formData: FormData) {
  //   setErrors({}); // Clear previous errors
  //   console.log(formData);
  //   const result = await addTodoAction(formData);

  //   if ("success" in result && !result.success) {
  //     const errorFields = result.errors || {};
  //     setErrors({
  //       title: "title" in errorFields ? errorFields.title : undefined,
  //       _form: "_form" in errorFields ? errorFields._form : undefined,
  //     });

  //     // Show toast for the first error
  //     if ("title" in errorFields && errorFields.title?.[0]) {
  //       toast.error(errorFields.title[0]);
  //     } else if ("_form" in errorFields && errorFields._form?.[0]) {
  //       toast.error(errorFields._form[0]);
  //     }
  //     return;
  //   }

  //   // Reset the form on success
  //   formRef.current?.reset();

  //   // Show success toast
  //   toast.success("Todo added successfully");
  // }

  return (
    <form ref={formRef} action={addTodo} className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            name="title"
            placeholder="Add a new task..."
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className="text-sm text-destructive mt-1">
              {errors.title[0]}
            </p>
          )}
        </div>
        <SubmitButton />
      </div>

      {errors._form && (
        <p className="text-sm text-destructive">{errors._form[0]}</p>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      <PlusCircle className="h-4 w-4 mr-2" />
      {pending ? "Adding..." : "Add"}
    </Button>
  );
}
