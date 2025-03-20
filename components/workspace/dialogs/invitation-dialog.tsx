"use client";

import { useState, FormEvent } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
export interface InviteProps {
  workspaceId: string;
  email: string;
}
export function WorkspaceInviteDialog({
  workspaceId,
  trigger,
}: {
  workspaceId: string;
  trigger?: React.ReactNode;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteProps>();
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = async (data: InviteProps) => {
    data.workspaceId = workspaceId;
    setIsLoading(true);
    try {
      const response = await fetch("/api/workspace/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        toast.success("Invitation successfully sent");
        reset();
      } else if (response.status === 401) {
        toast.error("Not authorized to invite, you’re not the owner.");
      } else if (response.status === 409) {
        toast.error("User is already a member of this workspace.");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Bell size={16} className="mr-2" />
            Invite Workspace members
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-gray-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            Invite members to workspace
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <form onSubmit={handleSubmit(handleInvite)} className="flex gap-2">
            <div className="grid gap-2 w-full">
              <Input
                type="email"
                placeholder="Enter email address"
                className="bg-gray-800 border-gray-700 text-gray-200"
                {...register("email", { required: true })}
              />
              {errors["email"] && (
                <span className="text-xs text-red-600">Field required</span>
              )}
            </div>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Inviting..." : "Invite"}
            </Button>
          </form>

          {/* {invitedUsers.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Invited members</h3>
              <div className="space-y-2">
                {invitedUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-md"
                  >
                    <span>{user.email}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInvitedUser(user.email)}
                      className="text-gray-400 hover:text-gray-200"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          <div className="pt-4">
            <p className="text-sm text-gray-400">
              An invitation will be sent to the email address. Once accepted,
              the user will be added to this workspace.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
