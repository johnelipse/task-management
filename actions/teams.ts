"use server";

import { Team } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const api = `${baseUrl}/api/teams`;

export async function getAllTeams() {
  try {
    const res = await fetch(api, { cache: "no-store" });
    const teams = await res.json();
    return teams.data as Team[];
  } catch (error) {
    return [];
  }
}
