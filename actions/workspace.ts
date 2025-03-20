"use server";

import { db } from "@/prisma/db";
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

export async function getUserWorkspaces(userId: string) {
  try {
    // First get the user with their workspace IDs
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        WorkspaceIds: true,
      },
    });

    if (!user) return [];

    // Then fetch the actual workspace objects based on those IDs
    const workspaces = await db.workspace.findMany({
      where: {
        id: {
          in: user.WorkspaceIds,
        },
      },
    });

    return workspaces;
  } catch (error) {
    console.error("Error fetching user workspaces:", error);
    return [];
  }
}

export async function DeleteWorkspaceById(id: string) {
  const api = `${baseUrl}/api/workspace/${id}`;
  try {
    await fetch(api, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/app",
      },
      cache: "no-store",
    });
  } catch (error) {
    console.log(error);
  }
}
