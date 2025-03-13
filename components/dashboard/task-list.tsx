"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
              {/* <p className="text-sm text-slate-300">{task.taskDescription}</p> */}
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
