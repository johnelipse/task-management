import { getSingleBoard } from "@/actions/boards";
import { getAllTasks } from "@/actions/tasks";
import TeamBoard from "@/components/workspace/team-dashboard";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const board = await getSingleBoard(slug);
  const allTasks = await getAllTasks();

  return (
    <div>
      <TeamBoard board={board} allTasks={allTasks} />
    </div>
  );
}
