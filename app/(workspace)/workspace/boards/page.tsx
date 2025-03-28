import { getAllBoards } from "@/actions/boards";
import WorkspaceBoards from "@/components/workspace/boards";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const boards = await getAllBoards();
  const session = await getServerSession(authOptions);
  return (
    <div>
      <WorkspaceBoards boards={boards} session={session} />
    </div>
  );
}
