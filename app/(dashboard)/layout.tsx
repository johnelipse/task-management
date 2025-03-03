import { getAllNotifications } from "@/actions/notifications";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const allNotifications = await getAllNotifications();
  return (
    <div className="min-h-screen bg-black w-full ">
      <Sidebar allNotifications={allNotifications} session={session} />
      <div className="md:ml-[220px] bg-black lg:ml-[260px]">
        <Navbar session={session} />
        <div className="p-2 md:p-4">{children}</div>
      </div>
    </div>
  );
}
