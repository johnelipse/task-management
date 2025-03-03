import { getAllDepartments } from "@/actions/departments";
import { getSingleMember } from "@/actions/members";
import { getAllTeams } from "@/actions/teams";
import TeamMemberForm from "@/components/Forms/create-Member";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const departments = await getAllDepartments();
  const teams = await getAllTeams();
  const member = await getSingleMember(id);
  return (
    <div>
      <TeamMemberForm
        departments={departments}
        teams={teams}
        initialData={member}
      />
    </div>
  );
}
