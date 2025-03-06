import React from "react";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { columns } from "./columns";
import { getAllTeams } from "@/actions/teams";

export default async function page() {
  const teams = (await getAllTeams()) || [];
  return (
    <div className="">
      <TableHeader
        title="Teams"
        linkTitle="Add Team"
        href="/dashboard/teams/new"
        data={teams}
        model="category"
      />
      <div className="py-8">
        <DataTable data={teams} columns={columns} />
      </div>
    </div>
  );
}
