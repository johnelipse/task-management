import WorkspaceDashboard from "@/components/workspace/dashboard";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  return (
    <div>
      <WorkspaceDashboard />
    </div>
  );
}
