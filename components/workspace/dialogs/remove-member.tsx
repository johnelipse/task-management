"use client";

import { removeMemberFromWorkspace } from "@/actions/users";
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
  memberName: string;
  userId: string;
}

export function RemoveMemberDialog({
  workspaceId,
  memberName,
  userId,
}: DeleteWorkspaceDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const removeMember = async () => {
    try {
      setIsDeleting(true);
      await removeMemberFromWorkspace(userId, workspaceId);
      setIsDeleting(false);
      toast.success(`Member removed from ${memberName}`);
      router.prefetch("/workspace/members");
      window.location.reload();
      router.refresh();
    } catch (err) {
      console.error("Error removing member from workspace:", err);
      setIsDeleting(false);
      toast.error("Error removing member from workspace");
      return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          Remove Member
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
        <DialogHeader>
          <DialogTitle>Delete Workspace</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Are you sure you want to remove "{memberName}"? from this workspace,
            this action cannot be undone.
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
            onClick={removeMember}
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
