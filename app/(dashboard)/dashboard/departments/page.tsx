import React from "react";
import { Category } from "@prisma/client";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getAllCategories } from "@/actions/categories";
import { columns } from "./columns";
import { getAllDepartments } from "@/actions/departments";

export default async function page() {
  const departments = (await getAllDepartments()) || [];
  // console.log(departments);
  return (
    <div className="p-8">
      <TableHeader
        title="Departments"
        linkTitle="Add Department"
        href="/dashboard/departments/new"
        data={departments}
        model="category"
      />
      <div className="py-8">
        <DataTable data={departments} columns={columns} />
      </div>
    </div>
  );
}
