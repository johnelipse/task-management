import React from "react";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getAllTeams } from "@/actions/teams";
import TaskDashboard from "@/components/dashboard/task-dashboard";
import { getAllTasks } from "@/actions/tasks";
import { getAllDepartments } from "@/actions/departments";
import { getAllMembers } from "@/actions/members";

export default async function page() {
  const teams = (await getAllTeams()) || [];
  const departments = (await getAllDepartments()) || [];
  const tasks = (await getAllTasks()) || [];
  const members = (await getAllMembers()) || [];

  // console.log(departments);
  return (
    <div className="">
      <TableHeader
        title="Tasks"
        linkTitle="Add Task"
        href="/dashboard/tasks/new"
        data={tasks}
        model="category"
      />
      {/* <div className="py-8">
        <DataTable data={teams} columns={columns} />
      </div> */}
      <TaskDashboard
        teams={teams}
        departments={departments}
        allTasks={tasks}
        members={members}
      />
    </div>
  );
}
