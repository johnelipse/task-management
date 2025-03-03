import { getAllDepartments } from "@/actions/departments";
import { getAllMembers } from "@/actions/members";
import { getAllTasks } from "@/actions/tasks";
import { getAllTeams } from "@/actions/teams";
import ReportsDashboard from "@/components/dashboard/reports/reports-dashboard";
import React from "react";

export default async function page() {
  const tasks = await getAllTasks();
  const departments = await getAllDepartments();
  const teams = (await getAllTeams()) || [];
  const members = await getAllMembers();
  return (
    <div>
      <ReportsDashboard
        departments={departments}
        tasks={tasks}
        teamData={teams}
        members={members}
      />
    </div>
  );
}
