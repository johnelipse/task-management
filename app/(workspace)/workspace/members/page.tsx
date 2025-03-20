import { Suspense } from "react";
import { Shield } from "lucide-react";
import { MembersTable } from "@/components/workspace/workspace-table";
import { getAllUsers } from "@/actions/users";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

// This would be your actual data fetching function
async function getWorkspaceMembers() {
  // In a real app, you would fetch this data from your API
  // For example:
  // const response = await fetch(`/api/workspaces/${workspaceId}/members`)
  // return response.json()

  // For demo purposes, we'll return mock data
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

  return [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "owner",
      avatarUrl: "https://ui.shadcn.com/avatars/01.png",
      status: "active",
      joinedAt: "2023-01-15T00:00:00Z",
    },
    {
      id: "2",
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "admin",
      avatarUrl: "https://ui.shadcn.com/avatars/02.png",
      status: "active",
      joinedAt: "2023-02-20T00:00:00Z",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      role: "member",
      avatarUrl: "https://ui.shadcn.com/avatars/03.png",
      status: "active",
      joinedAt: "2023-03-10T00:00:00Z",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      role: "member",
      status: "invited",
      joinedAt: "2023-04-05T00:00:00Z",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david@example.com",
      role: "member",
      avatarUrl: "https://ui.shadcn.com/avatars/05.png",
      status: "inactive",
      joinedAt: "2023-02-01T00:00:00Z",
    },
  ];
}

async function WorkspaceMembersContent() {
  const members = await getAllUsers();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  return (
    <MembersTable members={members} isLoading={false} currentUserId={userId} />
  );
}

export default function WorkspaceMembersPage() {
  return (
    <div className="space-y-6 px-8 pt-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-zinc-100">
            Workspace Members
          </h2>
          <p className="text-sm text-zinc-400">
            Manage members and their permissions in this workspace.
          </p>
        </div>
        {/* <MembersTableActions workspaceId={params.workspaceId} /> */}
      </div>

      <div className="rounded-md bg-zinc-900/50 border border-zinc-800 p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-amber-500/10 text-amber-500">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-zinc-200">Permissions</h3>
            <p className="text-sm text-zinc-400 mt-1">
              <strong className="text-amber-500">Owners</strong> have full
              control over the workspace.
              <br />
              <strong className="text-zinc-400">Members</strong> can view and
              collaborate on workspace content.
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<MembersTable members={[]} isLoading={true} />}>
        <WorkspaceMembersContent />
      </Suspense>
    </div>
  );
}
