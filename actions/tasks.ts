"use server";
import { SelectProps } from "@/components/dashboard/update-status";
import { FormData } from "@/components/Forms/create-task";
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
export async function updateTask(slug: string, data: FormData) {
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

export async function deleteTask(slug: string) {
  const api = `${baseUrl}/api/tasks/${slug}`;
  try {
    await fetch(api, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}
