import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@codemachine/components/ui/card";
import { getTodos } from "@codemachine/actions/get-todos";
import { AddTodoForm } from "@codemachine/components/add-todo-form";
import { TodoItem } from "@codemachine/components/todo-item";

export default async function TodoApp() {
  const todos = await getTodos();

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AddTodoForm />

            <div className="space-y-2">
              {todos.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No tasks yet. Add one above!
                </p>
              ) : (
                todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
