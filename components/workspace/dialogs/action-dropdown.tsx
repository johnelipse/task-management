"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2, ToggleLeft } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { StatusDialog } from "./status-dialog";
import { Task } from "@prisma/client";

export function ActionDropdown({ task }: { task: Task }) {
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-black text-white border-gray-800"
        >
          <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <StatusDialog task={task} />
          <DropdownMenuSeparator className="bg-gray-800" />
          <DropdownMenuItem className="hover:bg-gray-800 text-red-500 cursor-pointer flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
