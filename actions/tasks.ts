"use server";

import { SelectProps } from "@/components/dashboard/update-status";
import { Task, Team } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const api = `${baseUrl}/api/tasks`;

export async function getAllTasks() {
  try {
    const res = await fetch(api, { cache: "no-store" });
    const tasks = await res.json();
    return tasks.data as Task[] & { team: Team };
  } catch (error) {
    return [];
  }
}
export async function getSingleTask(slug: string) {
  const api = `${baseUrl}/api/tasks/${slug}`;
  try {
    const res = await fetch(api, { cache: "no-store" });
    const tasks = await res.json();
    return tasks.data as Task & { team: Team };
  } catch (error) {
    return null;
  }
}
export async function updateTaskStatus(slug: string, data: SelectProps) {
  const api = `${baseUrl}/api/tasks/${slug}`;
  try {
    const res = await fetch(api, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const tasks = await res.json();
    return tasks.data as Task;
  } catch (error) {
    return null;
  }
}
