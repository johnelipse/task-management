import { getAllWorkspaces } from "@/actions/workspace";
import HeaderComponent from "@/components/workspace/header-comp";
import Sidebar from "@/components/workspace/side-bar";
import { WorkspaceProvider } from "@/context/workspace-context";
import React, { ReactNode } from "react";

export default async function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  const workspaces = await getAllWorkspaces();
  return (
    <WorkspaceProvider initialWorkspaces={workspaces}>
      <div className={`min-h-screen bg-black text-white `}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />

          <div className="flex-1 flex flex-col md:ml-64">
            <HeaderComponent />
            <main className="flex-1 overflow-auto bg-gradient-to-br from-black to-zinc-900 pt-14">
              {children}
            </main>
          </div>
        </div>
      </div>
    </WorkspaceProvider>
  );
}
