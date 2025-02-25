"use server";

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
