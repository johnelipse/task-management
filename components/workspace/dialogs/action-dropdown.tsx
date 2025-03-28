"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { StatusDialog } from "./status-dialog";
import type { Task } from "@prisma/client";
import { deleteTask } from "@/actions/tasks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function ActionDropdown({ task }: { task: Task }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    try {
      setLoading(true);
      await deleteTask(task.id);
      toast.success("Task deleted successfully.");
      setLoading(false);
      router.refresh();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
      setLoading(false);
    }
  }

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
          <DropdownMenuItem
            onClick={() => setDeleteDialogOpen(true)}
            className="hover:bg-gray-800 text-red-500 cursor-pointer flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-black border border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Task
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
