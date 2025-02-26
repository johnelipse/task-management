import React from "react";
import { getAllTeams } from "@/actions/teams";
import TaskDashboard from "@/components/dashboard/task-dashboard";
import { getAllTasks } from "@/actions/tasks";
import { getAllDepartments } from "@/actions/departments";
import { getAllMembers } from "@/actions/members";
import TaskHeader from "@/components/dashboard/task-header";

export default async function page() {
  const teams = (await getAllTeams()) || [];
  const departments = (await getAllDepartments()) || [];
  const tasks = (await getAllTasks()) || [];
  const members = (await getAllMembers()) || [];
  return (
    <div className="">
      <TaskHeader
        title="Tasks"
        linkTitle="Add Task"
        href="/dashboard/tasks/new"
        data={tasks}
      />
      <TaskDashboard
        teams={teams}
        departments={departments}
        allTasks={tasks}
        members={members}
      />
    </div>
  );
}
