"use server";

import { TeamProps } from "@/types/types";
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

export async function getSingleTeam(slug: string) {
  const api = `${baseUrl}/api/teams/${slug}`;
  try {
    const res = await fetch(api, { cache: "no-store" });
    const team = await res.json();
    return team.data as Team;
  } catch (error) {
    return null;
  }
}
export async function updateTeam(slug: string, data: TeamProps) {
  const api = `${baseUrl}/api/teams/${slug}`;
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
export async function deleteTeam(slug: string) {
  const api = `${baseUrl}/api/teams/${slug}`;
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
