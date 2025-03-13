"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Member, Task, Team } from "@prisma/client";
import { TaskCardProps } from "./task-card";
import { ScrollArea } from "../ui/scroll-area";

interface TaskMember {
  id: string;
  name: string;
  avatar?: string;
}

interface TaskDetails {
  id: string;
  name: string;
  description: string;
  department: string;
  priority: "High" | "Medium" | "Low";
  status: "In Progress" | "Completed" | "On Hold" | "Not Started";
  startDate: string;
  endDate: string;
  teamName: string;
  members: TaskMember[];
}

export function TaskDialog({
  myTask,
  members,
}: {
  myTask: Task & { team: Team };
  members: Member[];
}) {
  const [open, setOpen] = useState(false);
  const [taskMembers, setTaskMembers] = useState<Member[]>([]);
  // Sample task data
  const task: TaskDetails = {
    id: "TASK-1234",
    name: "Redesign User Dashboard",
    description:
      "Create a new responsive dashboard with improved UX/UI elements, dark mode support, and better data visualization components.",
    department: "Design & Development",
    priority: "High",
    status: "In Progress",
    startDate: "2023-10-15",
    endDate: "2023-11-30",
    teamName: "Frontend Squad",
    members: [
      {
        id: "USR-001",
        name: "Alex Morgan",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: "USR-002",
        name: "Jamie Chen",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: "USR-003",
        name: "Sam Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: "USR-004",
        name: "Taylor Reed",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-400";
      case "Medium":
        return "text-amber-400";
      case "Low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  // Helper function to get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Inprogress":
        return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/20";
      case "Completed":
        return "bg-green-500/20 text-green-400 hover:bg-green-500/20";
      case "Pending":
        return "bg-amber-500/20 text-amber-400 hover:bg-amber-500/20";
      default:
        return "bg-slate-500/20 text-slate-400 hover:bg-slate-500/20";
    }
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // useEffect(() => {
  //   if (myTask.memberIds && myTask.memberIds.length > 0 && members.length > 0) {
  //     // Filter members that match the memberIds in the task
  //     const filteredMembers = members.filter((member) =>
  //       myTask.memberIds.includes(member.id)
  //     );
  //     setTaskMembers(filteredMembers);
  //   } else {
  //     setTaskMembers([]);
  //   }
  // }, [myTask.memberIds, members]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs border-gray-700 bg-gray-900 hover:bg-gray-800 hover:text-blue-400"
        >
          Details
        </Button>
      </DialogTrigger>
      <ScrollArea>
        <DialogContent className="sm:max-w-[550px] bg-gradient-to-br scrollbar-hide overflow-y-auto h-[25rem]  from-gray-950 to-gray-900 border-gray-800 text-gray-100 shadow-lg shadow-cyan-900/20">
          <div className="space-y-6 py-2">
            {/* Task Name */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {myTask.taskName}
              </h2>
            </div>

            {/* Status and Priority */}
            <div className="flex flex-wrap gap-3">
              <Badge
                className={`${getStatusVariant(myTask.status)} font-medium`}
              >
                {myTask.status}
              </Badge>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400 text-sm">Priority:</span>
                <span
                  className={`font-medium ${getPriorityColor(myTask.priority)}`}
                >
                  {myTask.priority}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-gray-300">
                Description
              </h3>
              {/* <p className="text-gray-300 text-sm leading-relaxed">
                {myTask.taskDescription}
              </p> */}
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-gray-300">
                Department
              </h3>
              {/* <p className="text-gray-300">{myTask.department}</p> */}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-gray-300">
                  Start Date
                </h3>
                <p className="text-gray-300">{formatDate(myTask.startDate)}</p>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-gray-300">
                  End Date
                </h3>
                <p className="text-gray-300">{formatDate(myTask.endDate)}</p>
              </div>
            </div>

            {/* Team */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-gray-300">Team</h3>
              <p className="text-gray-300">{myTask.team.name}</p>
            </div>

            {/* Team Members */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300">
                Team Members
              </h3>
              <div className="flex flex-wrap gap-2">
                {/* {taskMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-2 bg-gray-800/50 rounded-full pl-1 pr-3 py-1"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={member.image as string}
                      alt={member.fullName}
                    />
                    <AvatarFallback className="bg-gray-700 text-xs">
                      {member.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-300">
                      {member.fullName}
                    </span>
                    <span className="text-sm text-gray-300">
                      {member.email}
                    </span>
                  </div>
                </div>
              ))} */}
                {taskMembers.map((member) => (
                  <div
                    key={member.id}
                    className="group relative flex items-center gap-3 bg-gradient-to-r from-gray-800/80 to-gray-800/40 rounded-lg p-3 border border-gray-800/50 hover:border-cyan-900/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <Avatar className="h-10 w-10 ring-2 ring-gray-700/50 group-hover:ring-cyan-700/30 transition-all duration-300">
                      <AvatarImage
                        src={member.image as string}
                        alt={member.fullName}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-800 text-white">
                        {member.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-white truncate group-hover:text-cyan-300 transition-colors duration-300">
                        {member.fullName}
                      </span>
                      <div className="flex  flex-col gap-1">
                        <span className="text-xs text-gray-400">
                          {member.email}
                        </span>
                        {/* <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-500/50"></span> */}
                        <span className="text-xs text-gray-400">
                          {member.phone}
                        </span>
                      </div>
                    </div>

                    {/* <div className="ml-auto">
                    <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-300">
                      <span className="text-cyan-400 text-xs">+</span>
                    </div>
                  </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  );
}
