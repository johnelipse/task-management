"use server";
import { Invitation, Workspace } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const api = `${baseUrl}/api/workspace/invite`;
export async function getAllInvitations() {
  try {
    const res = await fetch(api, { cache: "no-store" });
    const invitations = await res.json();
    return invitations.data as Invitation[];
  } catch (error) {
    return [];
  }
}

export async function DeleteInvitationByToken(token: string) {
  const api = `${baseUrl}/api/workspace/invite/${token}`;
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
