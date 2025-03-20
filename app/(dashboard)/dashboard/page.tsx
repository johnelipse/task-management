import { getAllDepartments } from "@/actions/departments";
import { getAllTasks } from "@/actions/tasks";
import { getAllTeams } from "@/actions/teams";
import DashboardPage from "@/components/dashboard/dashboard-page";

export default async function Dashboard() {
  const tasks = await getAllTasks();
  const departments = await getAllDepartments();
  const teams = (await getAllTeams()) || [];
  return (
    <main>
      <DashboardPage departments={departments} tasks={tasks} teamData={teams} />
      {/* <DashboardMain /> */}
    </main>
  );
}
