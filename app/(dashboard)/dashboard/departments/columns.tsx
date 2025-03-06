"use client";

import { Checkbox } from "@/components/ui/checkbox";

import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Department } from "@prisma/client";
export const columns: ColumnDef<Department>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: "location",
    header: ({ column }) => <SortableColumn column={column} title="Location" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const department = row.original;
      return (
        <ActionColumn
          row={row}
          model="department"
          editEndpoint={`departments/update/${department.slug}`}
          slug={department.slug}
        />
      );
    },
  },
];
