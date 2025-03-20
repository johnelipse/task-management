import { getAllTasks } from "@/actions/tasks";
import { getSingleTeam } from "@/actions/teams";
import TeamBoard from "@/components/workspace/team-dashboard";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = await getSingleTeam(slug);
  const allTasks = await getAllTasks();

  return (
    <div>
      <TeamBoard team={team} allTasks={allTasks} />
    </div>
  );
}
