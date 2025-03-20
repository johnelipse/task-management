import { getAllInvitations } from "@/actions/invitations";
import { getAllUsers } from "@/actions/users";
import LoginForm from "@/components/Forms/LoginForm";
import { GridBackground } from "@/components/reusable-ui/grid-background";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  // if (session) {
  //   redirect("/dashboard");
  // }
  const allUsers = await getAllUsers();
  const invitations = await getAllInvitations();
  // console.log(Array.isArray(allUsers) ? allUsers.length : 0);
  return (
    <GridBackground>
      <div className="px-4">
        <LoginForm allUsers={allUsers} invitations={invitations} />
      </div>
    </GridBackground>
  );
}
