import { getAllWorkspaces } from "@/actions/workspace";
import HeaderComponent from "@/components/workspace/header-comp";
import Sidebar from "@/components/workspace/side-bar";
import { authOptions } from "@/config/auth";
import { WorkspaceProvider } from "@/context/workspace-context";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  const workspaces = await getAllWorkspaces();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <WorkspaceProvider initialWorkspaces={workspaces}>
      <div className={`min-h-screen bg-black text-white `}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar session={session} />

          <div className="flex-1 flex flex-col md:ml-64">
            <HeaderComponent session={session} />
            <main className="flex-1 overflow-auto bg-gradient-to-br from-black to-zinc-900 pt-14">
              {children}
            </main>
          </div>
        </div>
      </div>
    </WorkspaceProvider>
  );
}
