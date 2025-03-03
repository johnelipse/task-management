import { getAllDepartments } from "@/actions/departments";
import { getSingleTeam } from "@/actions/teams";
import { TeamCreationForm } from "@/components/Forms/create-team";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const departments = (await getAllDepartments()) || [];
  const team = await getSingleTeam(slug);
  return (
    <div className="p-8 ">
      <TeamCreationForm departments={departments} initialData={team} />
    </div>
  );
}
