"use server";

import { Task, Team } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const api = `${baseUrl}/api/tasks`;

export async function getAllTasks() {
  try {
    const res = await fetch(api, { cache: "no-store" });
    const tasks = await res.json();
    return tasks.data as Task[];
  } catch (error) {
    return [];
  }
}
