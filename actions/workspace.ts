"use server";

import { Workspace } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const api = `${baseUrl}/api/workspace`;
export async function getAllWorkspaces() {
  try {
    const res = await fetch(api, { cache: "no-store" });
    const workspaces = await res.json();
    return workspaces.data as Workspace[];
  } catch (error) {
    return [];
  }
}

export async function updateWorkspace(id: string, data: any) {
  const api = `${baseUrl}/api/workspace/${id}`;
  try {
    await fetch(api, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
