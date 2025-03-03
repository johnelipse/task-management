// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import type { Member, Task, Team } from "@prisma/client";
// import { motion } from "framer-motion";
// import { Calendar, ChevronDown, ChevronUp, Clock, Users } from "lucide-react";
// import { useState } from "react";
// import UpdateStatus from "./update-status";
// import { TaskDialog } from "./task-dialog";
// import UpdatePriority from "./update-priority";

// export interface TaskCardProps {
//   task: Task & { team: Team };
//   members: Member[];
// }

// export default function TaskCard({
//   task,
//   members,
// }: {
//   task: (Task & { team: Team }) | any;
//   members: Member[];
// }) {
//   const [expanded, setExpanded] = useState(false);
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

//           <UpdatePriority task={task} priority={task.priority} />
//         </div>
//         <div className="mb-4">
//           <p
//             className={cn("text-gray-300 text-sm", !expanded && "line-clamp-2")}
//           >
//             {task.taskDescription}
//           </p>
//           {task.taskDescription && task.taskDescription.length > 100 && (
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
//             <UpdateStatus task={task} status={task?.status} />
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
//             <span>{task.memberIds.length} members</span>
//           </div>
//         </div>

//         <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
//           <div className="flex items-center">
//             <Clock className="h-3 w-3 mr-1" />
//             <span>Created {formatDate(task.createdAt.toString())}</span>
//           </div>
//           <TaskDialog members={members} myTask={task} />
//         </div>
//       </div>

//       <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
//     </motion.div>
//   );
// }

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Member, Task, Team } from "@prisma/client";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  Loader,
  Trash,
  Users,
} from "lucide-react";
import { useState } from "react";
import UpdateStatus from "./update-status";
import { TaskDialog } from "./task-dialog";
import UpdatePriority from "./update-priority";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { deleteTask } from "@/actions/tasks";

export interface TaskCardProps {
  task: Task & { team: Team };
  members: Member[];
}

export default function TaskCard({
  task,
  members,
}: {
  task: (Task & { team: Team }) | any;
  members: Member[];
}) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const [loading, setLoading] = useState(false);

  async function handleDelete(slug: string) {
    try {
      setLoading(true);
      await deleteTask(slug);
      toast.success("Task deleted successfully.");
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

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

          <UpdatePriority task={task} priority={task.priority} />
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
            <UpdateStatus task={task} status={task?.status} />
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

        <div className="mt-4 pt-3 border-t border-gray-800 flex gap-4 items-center w-full  text-xs text-gray-500 justify-center">
          {/* <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Created {formatDate(task.createdAt.toString())}</span>
          </div> */}
          <Button asChild variant="secondary" size="sm" className="h-7 text-xs">
            <Link href={`/dashboard/tasks/${task.slug}`}>
              <Edit className="h-3 w-3" />
            </Link>
          </Button>

          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(task.slug)}
            className="h-7 text-xs"
          >
            {loading ? (
              <Loader className="h-3 w-3 animate-spin" />
            ) : (
              <Trash className="h-3 w-3" />
            )}
          </Button>

          <TaskDialog members={members} myTask={task} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
    </motion.div>
  );
}
