"use server";

import { TeamProps } from "@/types/types";
import { Board } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const api = `${baseUrl}/api/boards`;

export async function getAllBoards() {
  try {
    const res = await fetch(api, { cache: "no-store" });
    const boards = await res.json();
    return boards.data as Board[];
  } catch (error) {
    return [];
  }
}

export async function getSingleBoard(slug: string) {
  const api = `${baseUrl}/api/boards/${slug}`;
  try {
    const res = await fetch(api, { cache: "no-store" });
    const board = await res.json();
    return board.data as Board;
  } catch (error) {
    return null;
  }
}
export async function updateBoard(slug: string, data: TeamProps) {
  const api = `${baseUrl}/api/boards/${slug}`;
  try {
    await fetch(api, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
}
export async function deleteBoard(slug: string) {
  const api = `${baseUrl}/api/boards/${slug}`;
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
