"use client"
import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem";
import { toggleTodo } from "../actions/todo-actions";

interface Props {
    todos?: Todo[]
}
export const TodoGrid = ({todos = []}: Props) => {
    // const toggleTodo = async (id: string, complete: boolean) => {
    //     const updatedTodo = await todosApi.updateTodo(id, complete);
    //     router.refresh();
    //     return updatedTodo;
    // }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
