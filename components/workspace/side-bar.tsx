// "use client";
// import {
//   Calendar,
//   ChevronDown,
//   Home,
//   Layers,
//   MessageSquare,
//   Settings,
//   Users,
// } from "lucide-react";
// import Link from "next/link";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useWorkspace } from "@/context/workspace-context";
// import { Session } from "next-auth";
// import { UserDropdownMenu } from "../UserDropdownMenu";

// export default function Sidebar({ session }: { session: Session }) {
//   const { workspaces, selectedWorkspace, setSelectedWorkspace } =
//     useWorkspace();

//   return (
//     <div className="hidden md:flex w-64 flex-col bg-zinc-900 border-r border-zinc-800 fixed h-full z-30">
//       <div className="flex h-14 items-center px-4 border-b border-zinc-800">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent w-full">
//               <div
//                 style={{
//                   background: `radial-gradient(circle at top right, ${selectedWorkspace?.themeColor}, transparent 90%)`,
//                 }}
//                 className="w-8 h-8 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center"
//               >
//                 <Layers className="h-5 w-5 text-white" />
//               </div>
//               <span className="flex-1 text-left">
//                 {selectedWorkspace?.name || "Nexus"}
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
//                 onClick={() => setSelectedWorkspace(workspace)}
//               >
//                 <div className="flex items-center gap-2">
//                   <div
//                     style={{
//                       background: `radial-gradient(circle at top right, ${workspace.themeColor}, transparent 90%)`,
//                     }}
//                     className="w-6 h-6 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center"
//                   >
//                     <Layers className="h-3 w-3 text-white" />
//                   </div>
//                   <span>{workspace.name}</span>
//                 </div>
//               </DropdownMenuItem>
//             ))}
//             <DropdownMenuSeparator className="bg-zinc-800" />
//             <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
//               <Link
//                 href="/create-workspace"
//                 className="flex items-center gap-2 w-full"
//               >
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
//         <UserDropdownMenu
//           username={session?.user?.name ?? ""}
//           email={session?.user?.email ?? ""}
//           avatarUrl={
//             session?.user?.image ??
//             "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(54)-NX3G1KANQ2p4Gupgnvn94OQKsGYzyU.png"
//           }
//         />
//       </div>
//     </div>
//   );
// }

"use client";
import {
  Calendar,
  ChevronDown,
  Ghost,
  Home,
  Layers,
  Loader2,
  MessageSquare,
  Settings,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspace } from "@/context/workspace-context";
import type { Session } from "next-auth";
import { UserDropdownMenu } from "../UserDropdownMenu";
import { Button } from "../ui/button";
import { DeleteWorkspaceById } from "@/actions/workspace";
import toast from "react-hot-toast";
import { useState } from "react";
import { DeleteWorkspaceDialog } from "./dialogs/delete-dialog";

// Define the navigation item type
type NavItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  // Function to determine if this is a dynamic route that needs modification
  getDynamicPath?: (id: string) => string;
};

export default function Sidebar({ session }: { session: Session }) {
  const { workspaces, selectedWorkspace, setSelectedWorkspace } =
    useWorkspace();
  const pathname = usePathname();

  // Navigation items array
  const navItems: NavItem[] = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/workspace/boards",
    },
    {
      icon: Layers,
      label: "Workspaces Members",
      href: "/workspace/members",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/workspace/settings",
      // Dynamic path function for settings
      getDynamicPath: (id) => `/workspace/settings/${session.user.id}`,
    },
  ];

  // Function to check if a nav item is active
  const isActive = (item: NavItem) => {
    // For the settings page with dynamic ID
    if (item.getDynamicPath && session.user.id) {
      const dynamicPath = item.getDynamicPath(session.user.id);
      return pathname === dynamicPath || pathname.startsWith(dynamicPath + "/");
    }

    // For regular routes
    return pathname === item.href || pathname.startsWith(item.href + "/");
  };

  // Function to get the correct href for a nav item
  const getHref = (item: NavItem) => {
    if (item.getDynamicPath && session.user.id) {
      return item.getDynamicPath(session.user.id);
    }
    return item.href;
  };
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleDelete(id: string) {
    try {
      setLoading(true);
      await DeleteWorkspaceById(id);
      toast.success("Workspace deleted successfully.");
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Workspace");
      setLoading(false);
    }
  }

  const permisionToDelete = selectedWorkspace?.ownerId === session.user.id;
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
                className="focus:bg-zinc-800 flex justify-between items-center focus:text-white cursor-pointer"
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
                {permisionToDelete && (
                  <DeleteWorkspaceDialog
                    workspaceId={workspace.id}
                    workspaceName={workspace.name}
                  />
                  // <Button
                  //   variant="ghost"
                  //   size="icon"
                  //   disabled={loading}
                  //   onClick={() => handleDelete(workspace.id)}
                  //   className="hover:bg-transparent"
                  // >
                  //   {loading ? (
                  //     <Loader2 className="w-4 h-4 animate-spin" />
                  //   ) : (
                  //     <Trash2 className="w-4 h-4 animate-pulse" />
                  //   )}
                  // </Button>
                )}
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
          {navItems.map((item) => {
            const active = isActive(item);
            const href = getHref(item);
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white ${
                  active ? "bg-zinc-800/60 text-zinc-200" : "text-zinc-400"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-zinc-800">
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
