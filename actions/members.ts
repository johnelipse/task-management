"use server";

import { MemberProps } from "@/types/types";
import { Member, Team } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const api = `${baseUrl}/api/members`;

export async function getAllMembers() {
  try {
    const res = await fetch(api, { cache: "no-store" });
    const teams = await res.json();
    return teams.data as Member[] & {
      Team: Team;
    };
  } catch (error) {
    return [];
  }
}

export async function getSingleMember(id: string) {
  const api = `${baseUrl}/api/members/${id}`;
  try {
    const res = await fetch(api, { cache: "no-store" });
    const member = await res.json();
    return member.data as Member;
  } catch (error) {
    return null;
  }
}
export async function updateMember(id: string, data: MemberProps) {
  const api = `${baseUrl}/api/members/${id}`;
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
export async function deleteMember(id: string) {
  const api = `${baseUrl}/api/members/${id}`;
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
