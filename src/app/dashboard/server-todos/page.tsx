export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodoGrid } from "@/todos";
import { Todo } from "@prisma/client";

export const metadata = {
  title: 'Lista de Todos',
  description: 'Lista de Todos',
};

export default async function RestTodosPage() {
  // Realiza la llamada a la base de datos directamente en el componente
  let todos: Todo[] = [];
  try {
    todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });
  } catch (error) {
    console.error("Error fetching todos:", error);
  }

  return (
    <div>
        <span className="text-3xl mb-14">Server actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodoGrid todos={todos} />
    </div>
  );
}
