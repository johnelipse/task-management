// "use client";

// import type { Workspace } from "@prisma/client";
// import { createContext, useContext, useState, type ReactNode } from "react";

// type WorkspaceContextType = {
//   workspaces: Workspace[];
//   selectedWorkspace: Workspace | null;
//   setSelectedWorkspace: (workspace: Workspace) => void;
// };

// const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
//   undefined
// );

// export function WorkspaceProvider({
//   children,
//   initialWorkspaces,
// }: {
//   children: ReactNode;
//   initialWorkspaces: Workspace[];
// }) {
//   const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
//   const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
//     initialWorkspaces.length > 0 ? initialWorkspaces[0] : null
//   );

//   return (
//     <WorkspaceContext.Provider
//       value={{
//         workspaces,
//         selectedWorkspace,
//         setSelectedWorkspace,
//       }}
//     >
//       {children}
//     </WorkspaceContext.Provider>
//   );
// }

// export function useWorkspace() {
//   const context = useContext(WorkspaceContext);
//   if (context === undefined) {
//     throw new Error("useWorkspace must be used within a WorkspaceProvider");
//   }
//   return context;
// }

"use client";

import type { Workspace } from "@prisma/client";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

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

  // Find the most recently created workspace
  const getLatestWorkspace = (): Workspace | null => {
    if (workspaces.length === 0) return null;

    // Sort workspaces by createdAt date in descending order (newest first)
    const sortedWorkspaces = [...workspaces].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    return sortedWorkspaces[0];
  };

  // Initialize selectedWorkspace with the latest workspace
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    getLatestWorkspace()
  );

  // Update selectedWorkspace if initialWorkspaces changes
  useEffect(() => {
    setWorkspaces(initialWorkspaces);

    // Only update the selected workspace if none is currently selected
    if (!selectedWorkspace) {
      setSelectedWorkspace(getLatestWorkspace());
    }
  }, [initialWorkspaces]);

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
