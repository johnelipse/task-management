"use client";

import type { Workspace } from "@prisma/client";
import { createContext, useContext, useState, type ReactNode } from "react";

type WorkspaceContextType = {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;
  setSelectedWorkspace: (workspace: Workspace) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export function WorkspaceProvider({
  children,
  initialWorkspaces,
}: {
  children: ReactNode;
  initialWorkspaces: Workspace[];
}) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    initialWorkspaces.length > 0 ? initialWorkspaces[0] : null
  );

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        selectedWorkspace,
        setSelectedWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
