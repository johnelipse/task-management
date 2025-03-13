// "use client";

// import type { Workspace } from "@prisma/client";
// import {
//   Calendar,
//   ChevronDown,
//   Home,
//   Layers,
//   MessageSquare,
//   Settings,
//   Users,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export default function Sidebar({ workspaces }: { workspaces: Workspace[] }) {
//   const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0] || null);

//   return (
//     <div className="hidden md:flex w-64 flex-col bg-zinc-900 border-r border-zinc-800 fixed h-full z-30">
//       <div className="flex h-14 items-center px-4 border-b border-zinc-800">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent w-full">
//               <div className="w-8 h-8 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
//                 <Layers className="h-5 w-5 text-white" />
//               </div>
//               <span className="flex-1 text-left">
//                 {activeWorkspace?.name || "Nexus"}
//               </span>
//               <ChevronDown className="h-4 w-4 text-zinc-400" />
//             </button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             align="start"
//             className="w-56 bg-zinc-900 border-zinc-800 text-zinc-200"
//           >
//             <DropdownMenuLabel className="text-zinc-400">
//               Workspaces
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator className="bg-zinc-800" />
//             {workspaces.map((workspace) => (
//               <DropdownMenuItem
//                 key={workspace.id}
//                 className="focus:bg-zinc-800 focus:text-white cursor-pointer"
//                 onClick={() => setActiveWorkspace(workspace)}
//               >
//                 <div className="flex items-center gap-2">
//                   <div className="w-6 h-6 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
//                     <Layers className="h-3 w-3 text-white" />
//                   </div>
//                   <span>{workspace.name}</span>
//                 </div>
//               </DropdownMenuItem>
//             ))}
//             <DropdownMenuSeparator className="bg-zinc-800" />
//             <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
//               <Link href="#" className="flex items-center gap-2 w-full">
//                 Create New Workspace
//               </Link>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="flex-1 overflow-auto py-2">
//         <nav className="grid gap-1 px-2">
//           <Link
//             href="#"
//             className="flex items-center gap-3 rounded-lg bg-zinc-800/60 px-3 py-2 text-zinc-200 transition-all hover:text-white"
//           >
//             <Home className="h-4 w-4" />
//             Dashboard
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white"
//           >
//             <Layers className="h-4 w-4" />
//             Workspaces
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white"
//           >
//             <Calendar className="h-4 w-4" />
//             Calendar
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white"
//           >
//             <MessageSquare className="h-4 w-4" />
//             Messages
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white"
//           >
//             <Users className="h-4 w-4" />
//             Team
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white"
//           >
//             <Settings className="h-4 w-4" />
//             Settings
//           </Link>
//         </nav>
//       </div>
//       <div className="p-4 border-t border-zinc-800">
//         <div className="flex items-center gap-3">
//           <Image
//             src="/placeholder.svg?height=40&width=40"
//             width={40}
//             height={40}
//             alt="User avatar"
//             className="rounded-full border border-zinc-700"
//           />
//           <div>
//             <p className="text-sm font-medium">Alex Morgan</p>
//             <p className="text-xs text-zinc-400">Product Designer</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import {
  Calendar,
  ChevronDown,
  Home,
  Layers,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspace } from "@/context/workspace-context";
import { Session } from "next-auth";
import { UserDropdownMenu } from "../UserDropdownMenu";

export default function Sidebar({ session }: { session: Session }) {
  const { workspaces, selectedWorkspace, setSelectedWorkspace } =
    useWorkspace();

  return (
    <div className="hidden md:flex w-64 flex-col bg-zinc-900 border-r border-zinc-800 fixed h-full z-30">
      <div className="flex h-14 items-center px-4 border-b border-zinc-800">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent w-full">
              <div
                style={{
                  background: `radial-gradient(circle at top right, ${selectedWorkspace?.themeColor}, transparent 90%)`,
                }}
                className="w-8 h-8 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center"
              >
                <Layers className="h-5 w-5 text-white" />
              </div>
              <span className="flex-1 text-left">
                {selectedWorkspace?.name || "Nexus"}
              </span>
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-56 bg-zinc-900 border-zinc-800 text-zinc-200"
          >
            <DropdownMenuLabel className="text-zinc-400">
              Workspaces
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                className="focus:bg-zinc-800 focus:text-white cursor-pointer"
                onClick={() => setSelectedWorkspace(workspace)}
              >
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      background: `radial-gradient(circle at top right, ${workspace.themeColor}, transparent 90%)`,
                    }}
                    className="w-6 h-6 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center"
                  >
                    <Layers className="h-3 w-3 text-white" />
                  </div>
                  <span>{workspace.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
              <Link
                href="/create-workspace"
                className="flex items-center gap-2 w-full"
              >
                Create New Workspace
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg bg-zinc-800/60 px-3 py-2 text-zinc-200 transition-all hover:text-white"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white"
          >
            <Layers className="h-4 w-4" />
            Workspaces
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white"
          >
            <Calendar className="h-4 w-4" />
            Calendar
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white"
          >
            <MessageSquare className="h-4 w-4" />
            Messages
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white"
          >
            <Users className="h-4 w-4" />
            Team
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
      <div className="p-4 border-t border-zinc-800">
        {/* <div className="flex items-center gap-3">
          <Image
            src="/placeholder.svg?height=40&width=40"
            width={40}
            height={40}
            alt="User avatar"
            className="rounded-full border border-zinc-700"
          />
          <div>
            <p className="text-sm font-medium">Alex Morgan</p>
            <p className="text-xs text-zinc-400">Product Designer</p>
          </div>
        </div> */}
        <UserDropdownMenu
          username={session?.user?.name ?? ""}
          email={session?.user?.email ?? ""}
          avatarUrl={
            session?.user?.image ??
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(54)-NX3G1KANQ2p4Gupgnvn94OQKsGYzyU.png"
          }
        />
      </div>
    </div>
  );
}
