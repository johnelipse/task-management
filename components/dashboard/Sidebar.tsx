// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   Bell,
//   ChevronDown,
//   ChevronRight,
//   ExternalLink,
//   Plus,
//   Power,
// } from "lucide-react";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { Button } from "@/components/ui/button";
// import { usePathname, useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import Logo from "../global/Logo";
// import { ISidebarLink, sidebarLinks } from "@/config/sidebar";
// import { Session } from "next-auth";
// import { signOut } from "next-auth/react";
// import { NotificationMenu } from "../NotificationMenu";
// import { UserDropdownMenu } from "../UserDropdownMenu";
// import Image from "next/image";
// import { Notification } from "@prisma/client";
// // import { NotificationMenu } from "../frontend/NotificationMenu";
// // import { Notification } from "@prisma/client";

// interface SidebarProps {
//   session: Session;
//   // notifications?: Notification[];
//   allNotifications: Notification[];
// }

// export default function Sidebar({
//   session,
//   allNotifications,
// }: // notifications = [],
// SidebarProps) {
//   const router = useRouter();
//   const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
//     null
//   );
//   const pathname = usePathname();
//   const user = session.user;

//   // Helper function to check if user has permission
//   // const hasPermission = (permission: string): boolean => {
//   //   return user.permissions?.includes(permission) ?? false;
//   // };

//   // Filter sidebar links based on permissions
//   // const filterSidebarLinks = (links: ISidebarLink[]): ISidebarLink[] => {
//   //   return links
//   //     .filter((link) => hasPermission(link.permission))
//   //     .map((link) => ({
//   //       ...link,
//   //       dropdownMenu: link.dropdownMenu?.filter((item) =>
//   //         hasPermission(item.permission)
//   //       ),
//   //     }))
//   //     .filter(
//   //       (link) =>
//   //         !link.dropdown || (link.dropdownMenu && link.dropdownMenu.length > 0)
//   //     );
//   // };

//   const filteredLinks = sidebarLinks;

//   async function handleLogout() {
//     try {
//       await signOut();
//       router.push("/");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="fixed top-0 left-0 h-full w-[220px] lg:w-[260px] border-r border-gray-900 bg-black/40 hidden backdrop-blur-md md:block overflow-y-auto">
//       <div className="flex h-full max-h-screen flex-col gap-2">
//         <div className="flex flex-shrink-0 h-14 items-center border-b border-gray-900 px-4 lg:h-[60px] lg:px-6">
//           {/* <Logo href="/dashboard" /> */}
//           <Link href="/dashboard">
//             <Image
//               width={149}
//               height={48}
//               src="/logo.png"
//               className="w-13 h-13"
//               alt="logo"
//             />
//           </Link>
//           <NotificationMenu allNotifications={allNotifications} />
//         </div>
//         <div className="flex-1">
//           <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
//             {filteredLinks.map((item, i) => {
//               const Icon = item.icon;
//               const isHrefIncluded =
//                 item.dropdownMenu &&
//                 item.dropdownMenu.some((link) => link.href === pathname);

//               const isOpen = openDropdownIndex === i;

//               return (
//                 <div key={i}>
//                   {item.dropdown ? (
//                     <Collapsible open={isOpen}>
//                       <CollapsibleTrigger
//                         onClick={() => setOpenDropdownIndex(isOpen ? null : i)}
//                         className={cn(
//                           "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-primary w-full",
//                           isHrefIncluded && "bg-muted text-primary"
//                         )}
//                       >
//                         <Icon className="h-4 w-4" />
//                         {item.title}
//                         {isOpen ? (
//                           <ChevronDown className="h-5 w-5 ml-auto flex shrink-0 items-center justify-center rounded-full" />
//                         ) : (
//                           <ChevronRight className="h-5 w-5 ml-auto flex shrink-0 items-center justify-center rounded-full" />
//                         )}
//                       </CollapsibleTrigger>
//                       <CollapsibleContent className="dark:bg-slate-950 rounded mt-1">
//                         {item.dropdownMenu?.map((menuItem, i) => (
//                           <Link
//                             key={i}
//                             href={
//                               menuItem.title === "settings"
//                                 ? `${menuItem.href}/${user.id}`
//                                 : `${menuItem.href}`
//                             }
//                             className={cn(
//                               "mx-4 flex items-center gap-3 rounded-lg px-3 py-1 text-slate-300 transition-all hover:text-primary justify-between text-xs ml-6",
//                               pathname === menuItem.href &&
//                                 "bg-muted text-primary"
//                             )}
//                           >
//                             {menuItem.title}
//                             <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
//                               <Plus className="w-4 h-4" />
//                             </span>
//                           </Link>
//                         ))}
//                       </CollapsibleContent>
//                     </Collapsible>
//                   ) : (
//                     <Link
//                       href={
//                         item.title === "settings"
//                           ? `${item.href}/${user.id}`
//                           : `${item.href ?? "#"}`
//                       }
//                       className={cn(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-primary",
//                         pathname === item.href && "bg-muted text-primary"
//                       )}
//                     >
//                       <Icon className="h-4 w-4" />
//                       {item.title}
//                     </Link>
//                   )}
//                 </div>
//               );
//             })}
//             <Link
//               href="/"
//               className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-primary"
//               target="_blank"
//             >
//               <ExternalLink className="h-4 w-4" />
//               Live Website
//             </Link>
//           </nav>
//         </div>

//         {/* <div className="mt-auto p-4">
//           <Button onClick={handleLogout} size="sm" className="w-full">
//             <Power className="h-4 w-4 mr-2" />
//             Logout
//           </Button>
//         </div> */}
//         <div className="p-4">
//           <UserDropdownMenu
//             username={session?.user?.name ?? ""}
//             email={session?.user?.email ?? ""}
//             avatarUrl={
//               session?.user?.image ??
//               "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(54)-NX3G1KANQ2p4Gupgnvn94OQKsGYzyU.png"
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Plus,
  Power,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "../global/Logo";
import { ISidebarLink, sidebarLinks } from "@/config/sidebar";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { NotificationMenu } from "../NotificationMenu";
import { UserDropdownMenu } from "../UserDropdownMenu";
import Image from "next/image";
import { Notification } from "@prisma/client";

interface SidebarProps {
  session: Session;
  allNotifications: Notification[];
}

export default function Sidebar({ session, allNotifications }: SidebarProps) {
  const router = useRouter();
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const pathname = usePathname();
  const user = session.user;

  // Helper function to generate dynamic routes
  const getDynamicRoute = (href: string, title: string) => {
    if (title.toLowerCase() === "settings") {
      return `/dashboard/settings/${user.id}`;
    }
    return href;
  };

  const filteredLinks = sidebarLinks;

  async function handleLogout() {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fixed top-0 left-0 h-full w-[220px] lg:w-[260px] border-r border-gray-900 bg-black/40 hidden backdrop-blur-md md:block overflow-y-auto">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex flex-shrink-0 h-14 items-center border-b border-gray-900 px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard">
            <Image
              width={149}
              height={48}
              src="/logo.png"
              className="w-13 h-13"
              alt="logo"
            />
          </Link>
          <NotificationMenu allNotifications={allNotifications} />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {filteredLinks.map((item, i) => {
              const Icon = item.icon;
              const dynamicHref = getDynamicRoute(item.href ?? "#", item.title);

              const isHrefIncluded =
                item.dropdownMenu &&
                item.dropdownMenu.some((link) => link.href === pathname);

              const isOpen = openDropdownIndex === i;

              return (
                <div key={i}>
                  {item.dropdown ? (
                    <Collapsible open={isOpen}>
                      <CollapsibleTrigger
                        onClick={() => setOpenDropdownIndex(isOpen ? null : i)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-primary w-full",
                          isHrefIncluded && "bg-muted text-primary"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                        {isOpen ? (
                          <ChevronDown className="h-5 w-5 ml-auto flex shrink-0 items-center justify-center rounded-full" />
                        ) : (
                          <ChevronRight className="h-5 w-5 ml-auto flex shrink-0 items-center justify-center rounded-full" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="dark:bg-slate-950 rounded mt-1">
                        {item.dropdownMenu?.map((menuItem, i) => (
                          <Link
                            key={i}
                            href={
                              menuItem.title.toLowerCase() === "settings"
                                ? `/dashboard/settings/${user.id}`
                                : menuItem.href
                            }
                            className={cn(
                              "mx-4 flex items-center gap-3 rounded-lg px-3 py-1 text-slate-300 transition-all hover:text-primary justify-between text-xs ml-6",
                              pathname === menuItem.href &&
                                "bg-muted text-primary"
                            )}
                          >
                            {menuItem.title}
                            <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                              <Plus className="w-4 h-4" />
                            </span>
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      href={dynamicHref}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-primary",
                        pathname === dynamicHref && "bg-muted text-primary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-primary"
              target="_blank"
            >
              <ExternalLink className="h-4 w-4" />
              Live Website
            </Link>
          </nav>
        </div>

        <div className="p-4">
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
    </div>
  );
}
