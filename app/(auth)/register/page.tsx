import { getAllInvitations } from "@/actions/invitations";
import RegisterForm from "@/components/Forms/RegisterForm";
import { GridBackground } from "@/components/reusable-ui/grid-background";
import React from "react";

export default async function Page() {
  const invitations = await getAllInvitations();
  // console.log(invitations, "invitations");

  return (
    <GridBackground>
      <div className="">
        <RegisterForm invitations={invitations} />
      </div>
    </GridBackground>
  );
}
