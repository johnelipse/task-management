import { getAllTeams } from "@/actions/teams";
import WorkspaceBoards from "@/components/workspace/boards";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const teams = await getAllTeams();
  const session = await getServerSession(authOptions);
  return (
    <div>
      <WorkspaceBoards teams={teams} session={session} />
    </div>
  );
}
