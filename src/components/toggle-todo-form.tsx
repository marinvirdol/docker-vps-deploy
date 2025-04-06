import { Checkbox } from "@codemachine/components/ui/checkbox";
import { toggleTodoAction } from "@codemachine/actions/toggle-todo";
import { useActionState } from "react";
import { Todo } from "@codemachine/db/schema";
interface ToggleTodoFormProps {
  todo: Todo;
}
export function ToggleTodoForm({ todo }: ToggleTodoFormProps) {
  const [response, toggle, isPending] = useActionState(toggleTodoAction, null);

  return (
    <form action={toggle}>
      <input type="hidden" name="id" value={todo.id} />
      <Checkbox
        checked={todo.completed}
        // onCheckedChange={() => {
        //   document.getElementById(`toggle-form-${todo.id}`)?.requestSubmit();
        // }}
        id={`todo-${todo.id}`}
      />
      <button
        type="submit"
        id={`toggle-form-${todo.id}`}
        className="hidden"
      ></button>
    </form>
  );
}
