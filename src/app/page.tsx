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
  const response = await getTodos();

  console.log("todos", response);

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Todo App NEW NEW
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AddTodoForm />
            {!response.success && (
              <p className="text-center text-muted-foreground py-4">
                {response.error}
              </p>
            )}
            {response.success && (
              <div className="space-y-2">
                {response?.todos?.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No tasks yet. Add one above!
                  </p>
                ) : (
                  response?.todos?.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
