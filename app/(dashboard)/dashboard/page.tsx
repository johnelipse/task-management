import { getDashboardOverview } from "@/actions/analytics";
import { getAllSavings } from "@/actions/savings";
import { getAllTasks } from "@/actions/tasks";
import DashboardPage from "@/components/dashboard/dashboard-page";
import DashboardMain from "@/components/dashboard/DashboardMain";
import OverViewCard from "@/components/OverViewCard";
import { DashboardWelcome } from "@/components/WelcomeBanner";
import { getAuthenticatedUser } from "@/config/useAuth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const analytics = (await getDashboardOverview()) || [];
  const user = await getAuthenticatedUser();
  const tasks = await getAllTasks();
  return (
    <main>
      <DashboardPage tasks={tasks} />
      {/* <DashboardMain /> */}
    </main>
  );
}
