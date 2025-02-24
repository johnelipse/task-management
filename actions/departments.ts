"use server";

import { Department } from "@prisma/client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const api = `${baseUrl}/api/departments`;
export async function getAllDepartments() {
  try {
    const res = await fetch(api, { cache: "no-store" });
    const departments = await res.json();
    console.log(departments.data);
    return departments.data as Department[];
  } catch (error) {
    return [];
  }
}
