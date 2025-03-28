// "use client";

// import {Edit, Lock, LockOpen, Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { useWorkspace } from "@/context/workspace-context";
// import UpdateForm from "./update-workspace";
// import { TeamDialog } from "./dialogs/team-dialog";
// import { Team } from "@prisma/client";
// import { useRouter } from "next/navigation";
// import { WorkspaceInviteDialog } from "./dialogs/invitation-dialog";
// import { DeleteBoardDialog } from "./dialogs/delete-board";
// import { Session } from "next-auth";

// export default function WorkspaceBoards({
//   teams,
//   session,
// }: {
//   teams: Team[];
//   session: Session | null;
// }) {
//   const { selectedWorkspace } = useWorkspace();
//   const router = useRouter();
//   function returnDetailedPage(slug: string) {
//     router.push(`/team/${slug}`);
//   }

//   // If no workspace is selected, show a placeholder or loading state
//   if (!selectedWorkspace) {
//     return (
//       <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
//         <p>Select a workspace to view boards</p>
//       </div>
//     );
//   }

//   // Get the first letter of the workspace name for the avatar
//   const workspaceInitial = selectedWorkspace.name.charAt(0).toUpperCase();

//   const workspaceTeams = teams.filter(
//     (team) => team.workspaceId === selectedWorkspace.id
//   );
//   const permisionToDelete = selectedWorkspace.ownerId === session?.user.id;
//   return (
//     <div className="min-h-screen bg-black text-gray-200">
//       <div className="container mx-auto px-4 py-6">
//         {/* Header */}
//         <div className="flex  md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-6 mb-8">
//           <div className="flex items-center gap-4">
//             <div
//               style={{
//                 background: `radial-gradient(circle at top right, ${selectedWorkspace.themeColor}, transparent 90%)`,
//               }}
//               className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-purple-700 rounded-lg flex items-center justify-center text-white text-3xl font-bold"
//             >
//               {workspaceInitial}
//             </div>
//             <div>
//               <div className="flex items-center gap-2">
//                 <h1 className="text-xl font-semibold text-white">
//                   {selectedWorkspace.name}
//                 </h1>
//                 <UpdateForm initialData={selectedWorkspace} />
//               </div>
//               <div className="flex items-center gap-2 mt-1">
//                 <div className="flex items-center text-sm text-gray-400">
//                   {selectedWorkspace.visibility === "private" && (
//                     <Lock size={14} className="mr-1" />
//                   )}
//                   {selectedWorkspace.visibility === "public" && (
//                     <LockOpen size={14} className="mr-1" />
//                   )}
//                   {selectedWorkspace.visibility}
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Replace the Button with the new WorkspaceInviteDialog */}
//           <WorkspaceInviteDialog
//             trigger={
//               <button className="bg-blue-600 py-2 hidden md:block px-2 rounded-md">
//                 Invite Member To Workspace
//               </button>
//             }
//             workspaceId={selectedWorkspace.id}
//           />
//           <WorkspaceInviteDialog
//             trigger={
//               <button className="bg-blue-600 block text-[1rem] md:hidden py-1 px-2 rounded-md">
//                 Invite
//               </button>
//             }
//             workspaceId={selectedWorkspace.id}
//           />
//         </div>

//         {/* Rest of the component remains the same */}
//         {/* Boards Section */}
//         <div>
//           <h2 className="text-xl font-semibold mb-6 text-white">Boards</h2>

//           {/* Filters and Search */}
//           <div className="flex flex-row justify-end gap-4 mb-6">
//             <div>
//               <p className="text-sm mb-1">Search</p>
//               <div className="relative">
//                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
//                 <Input
//                   placeholder="Search boards"
//                   className="pl-9 bg-gray-900 border-gray-700 text-gray-200 w-full md:w-64"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Boards Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {/* Create new board */}
//             <div>
//               <TeamDialog
//                 workspaceId={selectedWorkspace.id}
//                 trigger={
//                   <div className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg p-6 flex flex-col items-center justify-center h-32 cursor-pointer transition-colors">
//                     <span className="text-gray-400 mb-2">Create new board</span>
//                   </div>
//                 }
//               />
//             </div>

//             {/* Board items would come from selectedWorkspace.boards or similar */}
//             {workspaceTeams.map((team) => {
//               return (
//                 <div
//                   onClick={() => returnDetailedPage(team.slug)}
//                   key={team.id}
//                   className="bg-green-800 rounded-lg cursor-pointer p-4 h-32 flex flex-col justify-between relative group"
//                 >
//                   <h3 className="text-white font-medium">{team.name}</h3>
//                   <div className="absolute bottom-3 left-4">
//                     {permisionToDelete && (
//                       <DeleteBoardDialog
//                         boardSlug={team.slug}
//                         boardName={team.name}
//                       />
//                     )}
//                   </div>
//                   <TeamDialog
//                     workspaceId={selectedWorkspace.id}
//                     initialData={team}
//                     trigger={
//                       <button className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <Edit size={16} className="text-white" />
//                       </button>
//                     }
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { ChevronDown, Edit, Lock, LockOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/context/workspace-context";
import UpdateForm from "./update-workspace";
import { TeamDialog } from "./dialogs/team-dialog";
import { useRouter } from "next/navigation";
import { WorkspaceInviteDialog } from "./dialogs/invitation-dialog";
import { DeleteBoardDialog } from "./dialogs/delete-board";
import { Session } from "next-auth";
import { Board } from "@prisma/client";

export default function WorkspaceBoards({
  boards,
  session,
}: {
  boards: Board[];
  session: Session | null;
}) {
  const { selectedWorkspace } = useWorkspace();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  function returnDetailedPage(slug: string) {
    router.push(`/team/${slug}`);
  }

  // If no workspace is selected, show a placeholder or loading state
  if (!selectedWorkspace) {
    return (
      <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
        <p>Select a workspace to view boards</p>
      </div>
    );
  }

  // Get the first letter of the workspace name for the avatar
  const workspaceInitial = selectedWorkspace.name.charAt(0).toUpperCase();

  // Filter teams for the selected workspace and search query
  const workspaceTeams = boards.filter(
    (board) =>
      board.workspaceId === selectedWorkspace.id &&
      board.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const permisionToDelete = selectedWorkspace.ownerId === session?.user.id;

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex  md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <div
              style={{
                background: `radial-gradient(circle at top right, ${selectedWorkspace.themeColor}, transparent 90%)`,
              }}
              className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-purple-700 rounded-lg flex items-center justify-center text-white text-3xl font-bold"
            >
              {workspaceInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-white">
                  {selectedWorkspace.name}
                </h1>
                <UpdateForm initialData={selectedWorkspace} />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-sm text-gray-400">
                  {selectedWorkspace.visibility === "private" && (
                    <Lock size={14} className="mr-1" />
                  )}
                  {selectedWorkspace.visibility === "public" && (
                    <LockOpen size={14} className="mr-1" />
                  )}
                  {selectedWorkspace.visibility}
                </div>
              </div>
            </div>
          </div>
          {/* Invite buttons remain the same */}
          <WorkspaceInviteDialog
            trigger={
              <button className="bg-blue-600 py-2 hidden md:block px-2 rounded-md">
                Invite Member To Workspace
              </button>
            }
            workspaceId={selectedWorkspace.id}
          />
          <WorkspaceInviteDialog
            trigger={
              <button className="bg-blue-600 block text-[1rem] md:hidden py-1 px-2 rounded-md">
                Invite
              </button>
            }
            workspaceId={selectedWorkspace.id}
          />
        </div>

        {/* Boards Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-white">Boards</h2>

          {/* Filters and Search */}
          <div className="flex flex-row justify-end gap-4 mb-6">
            <div>
              <p className="text-sm mb-1">Search</p>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search boards"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-gray-900 border-gray-700 text-gray-200 w-full md:w-64"
                />
              </div>
            </div>
          </div>

          {/* Boards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Create new board */}
            <div>
              <TeamDialog
                workspaceId={selectedWorkspace.id}
                trigger={
                  <div className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg p-6 flex flex-col items-center justify-center h-32 cursor-pointer transition-colors">
                    <span className="text-gray-400 mb-2">Create new board</span>
                  </div>
                }
              />
            </div>

            {/* Filtered board items */}
            {workspaceTeams.map((team) => {
              return (
                <div
                  onClick={() => returnDetailedPage(team.slug)}
                  key={team.id}
                  className="bg-green-950 rounded-lg cursor-pointer p-4 h-32 flex flex-col justify-between relative group"
                >
                  <h3 className="text-white font-medium">{team.name}</h3>
                  <div className="absolute bottom-3 left-4">
                    {permisionToDelete && (
                      <DeleteBoardDialog
                        boardSlug={team.slug}
                        boardName={team.name}
                      />
                    )}
                  </div>
                  <TeamDialog
                    workspaceId={selectedWorkspace.id}
                    initialData={team}
                    trigger={
                      <button className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit size={16} className="text-white" />
                      </button>
                    }
                  />
                </div>
              );
            })}

            {/* No results message */}
            {workspaceTeams.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-8">
                No boards found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
