import { getAllTeams } from "@/actions/teams";
import { getAllWorkspaces } from "@/actions/workspace";
import WorkspaceBoards from "@/components/workspace/boards";
import React from "react";

export default async function page() {
  const teams = await getAllTeams();
  return (
    <div>
      <WorkspaceBoards teams={teams} />
    </div>
  );
}
