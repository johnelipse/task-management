import { getAllDepartments } from "@/actions/departments";
import { getAllMembers } from "@/actions/members";
import { getAllTasks } from "@/actions/tasks";
import { getAllTeams } from "@/actions/teams";
import DashboardPage from "@/components/dashboard/dashboard-page";

export default async function Dashboard() {
  const tasks = await getAllTasks();
  const departments = await getAllDepartments();
  const teams = (await getAllTeams()) || [];
  const members = (await getAllMembers()) || [];
  return (
    <main>
      <DashboardPage
        departments={departments}
        tasks={tasks}
        teamData={teams}
        members={members}
      />
      {/* <DashboardMain /> */}
    </main>
  );
}
