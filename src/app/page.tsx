import TodoItems from "@/components/TodoItems";
import { prisma } from "@/db";
import { link } from "fs";
import Link from "next/link";
import React from "react";

function getTodos() {
  return prisma.todo.findMany();
} // This function will be executed on the server and the client

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({
    where: { id: id },
    data: { complete: complete },
  });

  // we cannot do any redirect in this function as it is being used as a callback for an event handler unlike the one the function that is triggered by the form submission
}

// If there is no usage of sideeffect or state, all the code will be exxecuted on the server
export default async function Home() {
  // Create a todo for testing
  // await prisma.todo.create({ data: { title: "test", complete: false } });
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          Go to new
        </Link>
      </header>

      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItems key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
