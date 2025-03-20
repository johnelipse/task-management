import { getAllDepartments } from "@/actions/departments";
import { getAllTasks } from "@/actions/tasks";
import { getAllTeams } from "@/actions/teams";
import ReportsDashboard from "@/components/dashboard/reports/reports-dashboard";
import React from "react";

export default async function page() {
  const tasks = await getAllTasks();
  const departments = await getAllDepartments();
  const teams = (await getAllTeams()) || [];
  return (
    <div>
      <ReportsDashboard
        departments={departments}
        tasks={tasks}
        teamData={teams}
      />
    </div>
  );
}
