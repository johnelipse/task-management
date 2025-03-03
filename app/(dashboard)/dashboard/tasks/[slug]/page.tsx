import { getAllDepartments } from "@/actions/departments";
import { getAllMembers } from "@/actions/members";
import { getSingleTask } from "@/actions/tasks";
import { getAllTeams } from "@/actions/teams";
import TaskCreationForm from "@/components/Forms/create-task";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const departments = await getAllDepartments();
  const teams = await getAllTeams();
  const members = await getAllMembers();
  const task = await getSingleTask(slug);
  return (
    <div className="">
      <TaskCreationForm
        departments={departments}
        teams={teams}
        members={members}
        initialData={task}
      />
    </div>
  );
}
