"use client";
import { Checkbox } from "@/components/ui/checkbox";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Member, Team } from "@prisma/client";

export const columns: ColumnDef<(Member & { Team: Team }) | any>[] = [
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
    accessorKey: "image",
    header: "Profile Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="image" />,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <SortableColumn column={column} title="Email Address" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <SortableColumn column={column} title="Phone Number" />
    ),
  },
  {
    id: "teamName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Team Name" />
    ),
    cell: ({ row }) => {
      const teamName = row.original;
      return <p>{teamName.Team.name}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <ActionColumn
          row={row}
          model="member"
          editEndpoint={`members/update/${member.id}`}
          id={member.id}
        />
      );
    },
  },
];
