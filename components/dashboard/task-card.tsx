// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Calendar, Clock, ChevronDown, ChevronUp, Users } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Task, Team } from "@prisma/client";

// interface TaskCardProps {
//   task: (Task & { team: Team }) | any;
// }

// export default function TaskCard({ task }: TaskCardProps) {
//   const [expanded, setExpanded] = useState(false);

//   const priorityColors = {
//     high: "from-red-500 to-red-700 border-red-500 shadow-red-500/20",
//     medium: "from-amber-500 to-amber-700 border-amber-500 shadow-amber-500/20",
//     low: "from-green-500 to-green-700 border-green-500 shadow-green-500/20",
//   };

//   const statusColors = {
//     "in-progress": "from-blue-500 to-blue-700 border-blue-500",
//     pending: "from-purple-500 to-purple-700 border-purple-500",
//     completed: "from-emerald-500 to-emerald-700 border-emerald-500",
//   };

//   const statusLabels = {
//     "in-progress": "In Progress",
//     pending: "Pending",
//     completed: "Completed",
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   return (
//     <motion.div
//       className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-lg"
//       whileHover={{
//         scale: 1.02,
//         boxShadow: "0 0 20px rgba(80, 70, 230, 0.3)",
//       }}
//       transition={{ duration: 0.2 }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30" />

//       <div className="relative p-6">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h3 className="text-xl font-bold font-mono tracking-tight mb-1 text-white">
//               {task.taskName}
//             </h3>
//             <p className="text-xs text-gray-400 font-mono">/{task.slug}</p>
//           </div>

//           <Badge
//             className={cn(
//               "bg-gradient-to-r border px-3 py-1 text-white shadow-lg"
//               // priorityColors[task.priority]
//             )}
//           >
//             {task.priority.toUpperCase()}
//           </Badge>
//         </div>

//         <div className="mb-4">
//           <p
//             className={cn("text-gray-300 text-sm", !expanded && "line-clamp-2")}
//           >
//             {task.taskDescription ?? ""}
//           </p>
//           {(task.taskDescription ?? "").length > 100 && (
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-xs text-blue-400 hover:text-blue-300 p-0 h-auto mt-1"
//               onClick={() => setExpanded(!expanded)}
//             >
//               {expanded ? (
//                 <span className="flex items-center">
//                   Show Less <ChevronUp className="ml-1 h-3 w-3" />
//                 </span>
//               ) : (
//                 <span className="flex items-center">
//                   Read More <ChevronDown className="ml-1 h-3 w-3" />
//                 </span>
//               )}
//             </Button>
//           )}
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="flex items-center">
//             <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700">
//               {task.department}
//             </Badge>
//           </div>

//           <div className="flex items-center justify-end">
//             <Badge
//               className={cn(
//                 "bg-gradient-to-r border px-3 py-1 text-white"
//                 // statusColors[task.status]
//               )}
//             >
//               {task.status}
//             </Badge>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
//           <div className="flex items-center">
//             <Calendar className="h-3 w-3 mr-1 text-blue-400" />
//             <span>
//               {formatDate(task.startDate)} - {formatDate(task.endDate)}
//             </span>
//           </div>

//           <div className="flex items-center justify-end">
//             <Users className="h-3 w-3 mr-1 text-purple-400" />
//             <span>{task.team.name}</span>
//           </div>
//         </div>

//         <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
//           <div className="flex items-center">
//             <Clock className="h-3 w-3 mr-1" />
//             <span>Created {formatDate(task.createdAt)}</span>
//           </div>

//           <Button
//             variant="outline"
//             size="sm"
//             className="h-7 text-xs border-gray-700 bg-gray-900 hover:bg-gray-800 hover:text-blue-400"
//           >
//             Details
//           </Button>
//         </div>
//       </div>

//       <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
//     </motion.div>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronDown, ChevronUp, Users } from "lucide-react";
import type { Task } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);

  const priorityColors = {
    high: "from-red-500 to-red-700 border-red-500 shadow-red-500/20",
    medium: "from-amber-500 to-amber-700 border-amber-500 shadow-amber-500/20",
    low: "from-green-500 to-green-700 border-green-500 shadow-green-500/20",
  };

  const statusColors = {
    "in-progress": "from-blue-500 to-blue-700 border-blue-500",
    pending: "from-purple-500 to-purple-700 border-purple-500",
    completed: "from-emerald-500 to-emerald-700 border-emerald-500",
  };

  const statusLabels = {
    "in-progress": "In Progress",
    pending: "Pending",
    completed: "Completed",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-lg"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 20px rgba(80, 70, 230, 0.3)",
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30" />

      <div className="relative p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold font-mono tracking-tight mb-1 text-white">
              {task.taskName}
            </h3>
            <p className="text-xs text-gray-400 font-mono">/{task.slug}</p>
          </div>
          {task.priority === "Medium" && (
            <Badge
              className={cn(
                "bg-gradient-to-r border px-3 py-1 text-white shadow-lg from-amber-500 to-amber-700 border-amber-500 shadow-amber-500/20"
              )}
            >
              {task.priority.toUpperCase()}
            </Badge>
          )}
          {task.priority === "High" && (
            <Badge
              className={cn(
                "bg-gradient-to-r border px-3 py-1 text-white shadow-lg from-red-500 to-red-700 border-red-500 shadow-red-500/20"
              )}
            >
              {task.priority.toUpperCase()}
            </Badge>
          )}
          {task.priority === "Low" && (
            <Badge
              className={cn(
                "bg-gradient-to-r border px-3 py-1 text-white shadow-lg from-green-500 to-green-700 border-green-500 shadow-green-500/20"
              )}
            >
              {task.priority.toUpperCase()}
            </Badge>
          )}
        </div>
        <div className="mb-4">
          <p
            className={cn("text-gray-300 text-sm", !expanded && "line-clamp-2")}
          >
            {task.taskDescription}
          </p>
          {task.taskDescription && task.taskDescription.length > 100 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-blue-400 hover:text-blue-300 p-0 h-auto mt-1"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <span className="flex items-center">
                  Show Less <ChevronUp className="ml-1 h-3 w-3" />
                </span>
              ) : (
                <span className="flex items-center">
                  Read More <ChevronDown className="ml-1 h-3 w-3" />
                </span>
              )}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700">
              {task.department}
            </Badge>
          </div>

          <div className="flex items-center justify-end">
            {task.status === "Inprogress" && (
              <Badge
                className={cn(
                  "bg-gradient-to-r border px-3 py-1 text-white from-blue-500 to-blue-700 border-blue-500"
                )}
              >
                {task.status}
              </Badge>
            )}
            {task.status === "Pending" && (
              <Badge
                className={cn(
                  "bg-gradient-to-r border px-3 py-1 text-white from-purple-500 to-purple-700 border-purple-500"
                )}
              >
                {task.status}
              </Badge>
            )}
            {task.status === "Completed" && (
              <Badge
                className={cn(
                  "bg-gradient-to-r border px-3 py-1 text-white from-emerald-500 to-emerald-700 border-emerald-500"
                )}
              >
                {task.status}
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1 text-blue-400" />
            <span>
              {formatDate(task.startDate)} - {formatDate(task.endDate)}
            </span>
          </div>

          <div className="flex items-center justify-end">
            <Users className="h-3 w-3 mr-1 text-purple-400" />
            <span>{task.memberIds.length} members</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Created {formatDate(task.createdAt.toString())}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs border-gray-700 bg-gray-900 hover:bg-gray-800 hover:text-blue-400"
          >
            Details
          </Button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
    </motion.div>
  );
}
