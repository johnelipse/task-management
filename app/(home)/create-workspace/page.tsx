import WorkspaceForm from "@/components/workspace/workspace-form";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return null;
  }
  return (
    <div className="pt-20 bg-[#0b111e]">
      <WorkspaceForm user={user} />
    </div>
  );
}
