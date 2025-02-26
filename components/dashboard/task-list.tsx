// "use client";

// import { useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Clock, MoreHorizontal } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";

// // Sample task data
// const initialTasks = [
//   {
//     id: 1,
//     title: "Redesign dashboard UI components",
//     description: "Update the visual design of dashboard widgets",
//     status: "in-progress",
//     priority: "high",
//     dueDate: "2023-11-28",
//     department: "Design",
//     assignee: {
//       name: "Alex Morgan",
//       avatar: "/placeholder.svg?height=32&width=32",
//       initials: "AM",
//     },
//   },
//   {
//     id: 2,
//     title: "Implement authentication flow",
//     description: "Create login, registration and password reset flows",
//     status: "completed",
//     priority: "high",
//     dueDate: "2023-11-25",
//     department: "Engineering",
//     assignee: {
//       name: "Sarah Chen",
//       avatar: "/placeholder.svg?height=32&width=32",
//       initials: "SC",
//     },
//   },
//   {
//     id: 3,
//     title: "Fix responsive layout issues",
//     description: "Address mobile view problems on the dashboard",
//     status: "in-progress",
//     priority: "medium",
//     dueDate: "2023-11-30",
//     department: "Engineering",
//     assignee: {
//       name: "James Wilson",
//       avatar: "/placeholder.svg?height=32&width=32",
//       initials: "JW",
//     },
//   },
//   {
//     id: 4,
//     title: "Create marketing campaign assets",
//     description: "Design social media graphics for product launch",
//     status: "pending",
//     priority: "medium",
//     dueDate: "2023-12-05",
//     department: "Marketing",
//     assignee: {
//       name: "Emma Davis",
//       avatar: "/placeholder.svg?height=32&width=32",
//       initials: "ED",
//     },
//   },
//   {
//     id: 5,
//     title: "Prepare Q4 analytics report",
//     description: "Compile user engagement metrics for Q4",
//     status: "overdue",
//     priority: "high",
//     dueDate: "2023-11-22",
//     department: "Product",
//     assignee: {
//       name: "Michael Brown",
//       avatar: "/placeholder.svg?height=32&width=32",
//       initials: "MB",
//     },
//   },
// ];

// export default function TaskList() {
//   const [tasks, setTasks] = useState(initialTasks);

//   const getStatusColor = (status: any) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-500/10 text-green-500 border-green-500/20";
//       case "in-progress":
//         return "bg-blue-500/10 text-blue-500 border-blue-500/20";
//       case "pending":
//         return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
//       case "overdue":
//         return "bg-red-500/10 text-red-500 border-red-500/20";
//       default:
//         return "bg-gray-500/10 text-gray-500 border-gray-500/20";
//     }
//   };

//   const getPriorityColor = (priority: any) => {
//     switch (priority) {
//       case "high":
//         return "bg-red-500/10 text-red-500 border-red-500/20";
//       case "medium":
//         return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
//       case "low":
//         return "bg-green-500/10 text-green-500 border-green-500/20";
//       default:
//         return "bg-gray-500/10 text-gray-500 border-gray-500/20";
//     }
//   };

//   const toggleTaskStatus = (id: any) => {
//     setTasks(
//       tasks.map((task) => {
//         if (task.id === id) {
//           const newStatus =
//             task.status === "completed" ? "in-progress" : "completed";
//           return { ...task, status: newStatus };
//         }
//         return task;
//       })
//     );
//   };

//   return (
//     <div className="space-y-3">
//       {tasks.map((task) => (
//         <div
//           key={task.id}
//           className="p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-200 group"
//         >
//           <div className="flex items-start gap-3">
//             <Checkbox
//               id={`task-${task.id}`}
//               checked={task.status === "completed"}
//               onCheckedChange={() => toggleTaskStatus(task.id)}
//               className="mt-1"
//             />

//             <div className="flex-1 min-w-0">
//               <div className="flex items-center justify-between gap-2">
//                 <h3
//                   className={`font-medium truncate ${
//                     task.status === "completed"
//                       ? "line-through text-muted-foreground"
//                       : ""
//                   }`}
//                 >
//                   {task.title}
//                 </h3>
//                 <div className="flex items-center gap-2 shrink-0">
//                   <Badge className={`text-xs ${getStatusColor(task.status)}`}>
//                     {task.status.replace("-", " ")}
//                   </Badge>
//                   <Badge
//                     className={`text-xs ${getPriorityColor(task.priority)}`}
//                   >
//                     {task.priority}
//                   </Badge>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem>Edit</DropdownMenuItem>
//                       <DropdownMenuItem>Assign</DropdownMenuItem>
//                       <DropdownMenuItem>Change Status</DropdownMenuItem>
//                       <DropdownMenuItem className="text-red-500">
//                         Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </div>

//               <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
//                 {task.description}
//               </p>

//               <div className="flex items-center justify-between mt-3">
//                 <div className="flex items-center gap-2">
//                   <Avatar className="h-6 w-6">
//                     <AvatarImage src={task.assignee.avatar} />
//                     <AvatarFallback className="text-xs">
//                       {task.assignee.initials}
//                     </AvatarFallback>
//                   </Avatar>
//                   <span className="text-xs text-muted-foreground">
//                     {task.assignee.name}
//                   </span>
//                   <Badge variant="outline" className="text-xs ml-2">
//                     {task.department}
//                   </Badge>
//                 </div>

//                 <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                   <Clock className="h-3 w-3" />
//                   <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const tasks = [
  {
    id: "1",
    title: "Design landing page",
    description: "Create a visually appealing landing page for the product.",
    assignee: "John Doe",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "2",
    title: "Develop API endpoints",
    description: "Build the necessary API endpoints for data retrieval.",
    assignee: "Jane Smith",
    priority: "Medium",
    status: "Completed",
  },
  {
    id: "3",
    title: "Write unit tests",
    description: "Implement unit tests for all critical components.",
    assignee: "Peter Jones",
    priority: "Low",
    status: "Pending",
  },
];

export default function TaskList() {
  const [expanded, setExpanded] = useState<string | undefined>(undefined);

  return (
    <Accordion
      type="single"
      collapsible
      value={expanded}
      onValueChange={setExpanded}
    >
      {tasks.map((task) => (
        <AccordionItem key={task.id} value={task.id}>
          <AccordionTrigger className="flex items-center justify-between py-2">
            <div className="flex text-slate-200 items-center gap-2">
              <Checkbox id={task.id} />
              <label
                htmlFor={task.id}
                className="text-sm text-slate-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {task.title}
              </label>
            </div>
            <Badge variant="secondary">{task.priority}</Badge>
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <p className="text-sm text-slate-300">{task.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={task.assignee}
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="text-xs text-slate-300">
                  Assigned to: {task.assignee}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
