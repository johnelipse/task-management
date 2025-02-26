import React from "react";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { columns } from "./columns";
import { getAllMembers } from "@/actions/members";

export default async function page() {
  const members = (await getAllMembers()) || [];
  return (
    <div className="">
      <TableHeader
        title="Members"
        linkTitle="Add Member"
        href="/dashboard/members/new"
        data={members}
        model="category"
      />
      <div className="py-8">
        <DataTable data={members} columns={columns} />
      </div>
    </div>
  );
}
