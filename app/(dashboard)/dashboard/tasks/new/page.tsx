import { getAllDepartments } from "@/actions/departments";
import { getAllMembers } from "@/actions/members";
import { getAllTeams } from "@/actions/teams";
import TaskCreationForm from "@/components/Forms/create-task";
import React from "react";

export default async function page() {
  const departments = await getAllDepartments();
  const teams = await getAllTeams();
  const members = await getAllMembers();

  return (
    <div className="">
      <TaskCreationForm
        departments={departments}
        teams={teams}
        members={members}
      />
    </div>
  );
}
