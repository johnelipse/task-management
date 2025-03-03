"use server";
type AllDepartmentProps = {
  newData: Department & { team: Team[] };
};
import { DepartmentProps } from "@/types/types";
import { Department, Team } from "@prisma/client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const api = `${baseUrl}/api/departments`;
export async function getAllDepartments() {
  try {
    const res = await fetch(api, { cache: "no-store" });
    const departments = await res.json();
    return departments.data as Department[];
  } catch (error) {
    return [];
  }
}

export async function getSingleDepartment(slug: string) {
  const api = `${baseUrl}/api/departments/${slug}`;
  try {
    const res = await fetch(api, { cache: "no-store" });
    const department = await res.json();
    return department.data as Department;
  } catch (error) {
    return null;
  }
}
export async function updateDepartment(slug: string, data: DepartmentProps) {
  const api = `${baseUrl}/api/departments/${slug}`;
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
export async function deleteDepartment(slug: string) {
  const api = `${baseUrl}/api/departments/${slug}`;
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
