import { getAllDepartments } from "@/actions/departments";
import { getAllTeams } from "@/actions/teams";
import TeamMemberForm from "@/components/Forms/create-Member";
import React from "react";

export default async function page() {
  const departments = await getAllDepartments();
  const teams = await getAllTeams();
  return (
    <div>
      <TeamMemberForm departments={departments} teams={teams} />
    </div>
  );
}
