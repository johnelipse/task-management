import { getAllDepartments } from "@/actions/departments";
import { TeamCreationForm } from "@/components/Forms/create-team";
import React from "react";

export default async function page() {
  const departments = (await getAllDepartments()) || [];

  return (
    <div className="p-8 ">
      <TeamCreationForm departments={departments} />
    </div>
  );
}
