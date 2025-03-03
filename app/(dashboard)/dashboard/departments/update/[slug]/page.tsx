import { getSingleDepartment } from "@/actions/departments";
import { DepartmentCreationForm } from "@/components/Forms/department-form";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = await getSingleDepartment(slug);
  return (
    <div>
      <DepartmentCreationForm initialData={department} />
    </div>
  );
}
