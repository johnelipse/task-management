import { getUserById } from "@/actions/users";
import SettingsPage from "@/components/dashboard/settings-page";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);
  return (
    <div>
      <SettingsPage userData={user} />
    </div>
  );
}
