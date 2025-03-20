"use client";
import {
  MoreHorizontal,
  ShieldAlert,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@prisma/client";
import { useWorkspace } from "@/context/workspace-context";
import { RemoveMemberDialog } from "./dialogs/remove-member";

// Define the member type
export type WorkspaceMember = {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  avatarUrl?: string;
  status: "active" | "invited" | "inactive";
  joinedAt: string;
};

type MembersTableProps = {
  members: User[];
  isLoading: boolean;
  onRemoveMember?: (memberId: string) => void;
  onChangeRole?: (memberId: string, newRole: WorkspaceMember["role"]) => void;
  currentUserId?: string;
};

export function MembersTable({
  members,
  isLoading,
  currentUserId,
}: MembersTableProps) {
  const { selectedWorkspace } = useWorkspace();

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Filter members that belong to the selected workspace
  const workspaceMembers = members.filter((member) =>
    member.WorkspaceIds?.includes(selectedWorkspace?.id ?? "")
  );

  // Determine if current user is the owner
  const isCurrentUserOwner = currentUserId === selectedWorkspace?.ownerId;

  // Role icon mapping
  const getRoleIcon = (role: WorkspaceMember["role"]) => {
    switch (role) {
      case "owner":
        return <ShieldAlert className="h-4 w-4 text-amber-500" />;
      case "member":
        return <UserCircle2 className="h-4 w-4 text-zinc-400" />;
    }
  };

  // Role label mapping
  const getRoleLabel = (role: WorkspaceMember["role"]) => {
    switch (role) {
      case "owner":
        return "Owner";
      case "member":
        return "Member";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Determine member role based on workspace owner
  const getMemberRole = (memberId: string): WorkspaceMember["role"] => {
    if (selectedWorkspace?.ownerId === memberId) {
      return "owner";
    }
    return "member";
  };

  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-950">
      <Table>
        <TableHeader className="bg-zinc-900">
          <TableRow className="hover:bg-zinc-900/80 border-zinc-800">
            <TableHead className="text-zinc-400 w-[250px]">Member</TableHead>
            <TableHead className="text-zinc-400">Role</TableHead>
            <TableHead className="text-zinc-400">Status</TableHead>
            <TableHead className="text-zinc-400">Joined</TableHead>
            <TableHead className="text-zinc-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Loading state
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow
                key={index}
                className="hover:bg-zinc-900/50 border-zinc-800"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full bg-zinc-800" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32 bg-zinc-800" />
                      <Skeleton className="h-3 w-40 bg-zinc-800" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16 bg-zinc-800" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20 bg-zinc-800" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24 bg-zinc-800" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-8 rounded-md ml-auto bg-zinc-800" />
                </TableCell>
              </TableRow>
            ))
          ) : workspaceMembers.length === 0 ? (
            // Empty state
            <TableRow className="hover:bg-zinc-900/50 border-zinc-800">
              <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
                No members found
              </TableCell>
            </TableRow>
          ) : (
            // Members list - always show all workspace members including the current user
            workspaceMembers.map((member) => {
              // Determine member's role
              const memberRole = getMemberRole(member.id);
              const isMemberOwner = memberRole === "owner";
              const isCurrentUser = member.id === currentUserId;

              return (
                <TableRow
                  key={member.id}
                  className={`hover:bg-zinc-900/50 border-zinc-800 ${
                    isCurrentUser ? "bg-zinc-900/30" : ""
                  }`}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-zinc-800">
                        <AvatarImage src={member.image as string} />
                        <AvatarFallback className="bg-zinc-800 text-zinc-200">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-zinc-200">
                          {member.name}{" "}
                          {isCurrentUser && (
                            <span className="text-xs text-zinc-500">(You)</span>
                          )}
                        </div>
                        <div className="text-sm text-zinc-500">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getRoleIcon(memberRole)}
                      <span className="text-zinc-300">
                        {getRoleLabel(memberRole)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    >
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-400">
                    {member.createdAt
                      ? formatDate(member.createdAt.toString())
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    {isCurrentUserOwner && !isMemberOwner && !isCurrentUser ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-zinc-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-56 bg-zinc-900 border-zinc-800 text-zinc-200"
                        >
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer">
                            <RemoveMemberDialog
                              userId={member.id}
                              workspaceId={selectedWorkspace?.id as string}
                              memberName={member.name}
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <span className="text-xs text-zinc-600 italic px-2">
                        {isMemberOwner ? "Owner" : ""}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
