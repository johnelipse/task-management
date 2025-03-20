// import { Suspense } from "react";
// import { Shield } from "lucide-react";
// import { MembersTable } from "@/components/workspace/workspace-table";
// import { getAllUsers } from "@/actions/users";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/config/auth";

// // This would be your actual data fetching function
// async function WorkspaceMembersContent() {
//   const members = await getAllUsers();
//   const session = await getServerSession(authOptions);
//   const userId = session?.user.id;
//   return (
//     <MembersTable members={members} isLoading={false} currentUserId={userId} />
//   );
// }

// export default function WorkspaceMembersPage() {
//   return (
//     <div className="space-y-6 px-4 md:px-8 pt-4">
//       <div className="flex items-center justify-between">
//         <div className="space-y-1">
//           <h2 className="text-2xl font-semibold text-zinc-100">
//             Workspace Members
//           </h2>
//           <p className="text-sm text-zinc-400">
//             Manage members and their permissions in this workspace.
//           </p>
//         </div>
//         {/* <MembersTableActions workspaceId={params.workspaceId} /> */}
//       </div>

//       <div className="rounded-md bg-zinc-900/50 border border-zinc-800 p-4">
//         <div className="flex items-start gap-3">
//           <div className="p-2 rounded-md bg-amber-500/10 text-amber-500">
//             <Shield className="h-5 w-5" />
//           </div>
//           <div>
//             <h3 className="font-medium text-zinc-200">Permissions</h3>
//             <p className="text-sm text-zinc-400 mt-1">
//               <strong className="text-amber-500">Owners</strong> have full
//               control over the workspace.
//               <br />
//               <strong className="text-zinc-400">Members</strong> can view and
//               collaborate on workspace content.
//             </p>
//           </div>
//         </div>
//       </div>

//       <Suspense fallback={<MembersTable members={[]} isLoading={true} />}>
//         <WorkspaceMembersContent />
//       </Suspense>
//     </div>
//   );
// }

import { Suspense } from "react";
import { Shield } from "lucide-react";
import { MembersTable } from "@/components/workspace/workspace-table";
import { getAllUsers } from "@/actions/users";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

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
    // Update the main container to be more responsive
    <div className="space-y-6 px-4 sm:px-6 md:px-8 pt-4 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100">
            Workspace Members
          </h2>
          <p className="text-sm text-zinc-400">
            Manage members and their permissions in this workspace.
          </p>
        </div>
        {/* <MembersTableActions workspaceId={params.workspaceId} /> */}
      </div>

      <div className="rounded-md bg-zinc-900/50 border border-zinc-800 p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-amber-500/10 text-amber-500 shrink-0">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h3 className="font-medium text-zinc-200">Permissions</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              <strong className="text-amber-500">Owners</strong> have full
              control over the workspace.
              <br />
              <strong className="text-zinc-400">Members</strong> can view and
              collaborate on workspace content.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-full px-4 sm:px-0">
          <Suspense fallback={<MembersTable members={[]} isLoading={true} />}>
            <WorkspaceMembersContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
