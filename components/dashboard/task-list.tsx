// "use client";

// import { useState } from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";

// const tasks = [
//   {
//     id: "1",
//     title: "Design landing page",
//     description: "Create a visually appealing landing page for the product.",
//     assignee: "John Doe",
//     priority: "High",
//     status: "In Progress",
//   },
//   {
//     id: "2",
//     title: "Develop API endpoints",
//     description: "Build the necessary API endpoints for data retrieval.",
//     assignee: "Jane Smith",
//     priority: "Medium",
//     status: "Completed",
//   },
//   {
//     id: "3",
//     title: "Write unit tests",
//     description: "Implement unit tests for all critical components.",
//     assignee: "Peter Jones",
//     priority: "Low",
//     status: "Pending",
//   },
// ];

// export default function TaskList() {
//   const [expanded, setExpanded] = useState<string | undefined>(undefined);

//   return (
//     <Accordion
//       type="single"
//       collapsible
//       value={expanded}
//       onValueChange={setExpanded}
//     >
//       {tasks.map((task) => (
//         <AccordionItem key={task.id} value={task.id}>
//           <AccordionTrigger className="flex items-center justify-between py-2">
//             <div className="flex text-slate-200 items-center gap-2">
//               <Checkbox id={task.id} />
//               <label
//                 htmlFor={task.id}
//                 className="text-sm text-slate-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 {task.title}
//               </label>
//             </div>
//             <Badge variant="secondary">{task.priority}</Badge>
//           </AccordionTrigger>
//           <AccordionContent>
//             <div className="py-2">
//               <p className="text-sm text-slate-300">{task.description}</p>
//               <div className="flex items-center gap-2 mt-2">
//                 <Avatar className="w-6 h-6">
//                   <AvatarImage
//                     src="https://github.com/shadcn.png"
//                     alt={task.assignee}
//                   />
//                   <AvatarFallback>JD</AvatarFallback>
//                 </Avatar>
//                 <span className="text-xs text-slate-300">
//                   Assigned to: {task.assignee}
//                 </span>
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       ))}
//     </Accordion>
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
import type { Task } from "@prisma/client";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [expanded, setExpanded] = useState<string | undefined>(undefined);

  return (
    <Accordion
      type="single"
      collapsible
      value={expanded}
      onValueChange={setExpanded}
    >
      {tasks.map((task) => (
        <AccordionItem key={task.id} value={task.id.toString()}>
          <AccordionTrigger className="flex items-center justify-between py-2">
            <div className="flex text-slate-200 items-center gap-2">
              <Checkbox id={task.id.toString()} />
              <label
                htmlFor={task.id.toString()}
                className="text-sm text-slate-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {task.taskName}
              </label>
            </div>
            <Badge variant="secondary">{task.priority}</Badge>
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <p className="text-sm text-slate-300">{task.taskDescription}</p>
              {/* <div className="flex items-center gap-2 mt-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={task.assignee || "Assignee"} />
                  <AvatarFallback>{task.assignee ? task.assignee.charAt(0) : "U"}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-slate-300">Assigned to: {task.assignee || "Unassigned"}</span>
              </div> */}
              <div className="mt-2">
                <span className="text-xs text-slate-400">Status: </span>
                <Badge
                  className={
                    task.status === "Completed"
                      ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                      : task.status === "Pending"
                      ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                      : "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                  }
                >
                  {task.status}
                </Badge>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
