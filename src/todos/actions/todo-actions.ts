"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  })
}
export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(3);
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) throw new Error("Todo not found");

  const updatedTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      complete,
    },
  });

  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({
      data: {
        description,
      },
    });
    revalidatePath('/dashboard/server-todos');

    return todo;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const deleteCompletedTodos = async () => {
  await prisma.todo.deleteMany({
    where: {complete: true}
  })
  revalidatePath('/dashboard/server-todos');
}