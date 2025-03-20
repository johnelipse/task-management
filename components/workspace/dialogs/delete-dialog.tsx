"use client";

import { DeleteWorkspaceById } from "@/actions/workspace";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeleteWorkspaceDialogProps {
  workspaceId: string;
  workspaceName: string;
}

export function DeleteWorkspaceDialog({
  workspaceId,
  workspaceName,
}: DeleteWorkspaceDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    try {
      setIsDeleting(true);
      await DeleteWorkspaceById(workspaceId);
      toast.success("Workspace deleted successfully.");
      router.refresh();
      window.location.reload();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete workspace");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <Trash2 className="w-4 h-4 text-zinc-400 hover:text-red-500 transition-colors" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
        <DialogHeader>
          <DialogTitle>Delete Workspace</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Are you sure you want to delete the workspace "{workspaceName}"?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            disabled={isDeleting}
            onClick={() => setIsOpen(false)}
            className="border-none hover:bg-gray-950 bg-gray-950 text-white hover:text-white"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Workspace"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
