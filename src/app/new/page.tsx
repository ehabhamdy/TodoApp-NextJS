import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

async function createTodo(data: FormData) {
  "use server";
  const title = data.get("title");

  await prisma.todo.create({
    data: { title: title as string, complete: false },
  });

  redirect("/");
}

const page = () => {
  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col mb-4">
        <input
          type="text"
          name="title"
          id=""
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-late-100"
        />

        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-non"
          >
            Cancel{" "}
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-non"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default page;
