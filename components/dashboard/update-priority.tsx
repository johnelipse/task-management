"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { useForm } from "react-hook-form";
import { error } from "console";
import { Task } from "@prisma/client";
import { updateTaskStatus } from "@/actions/tasks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
const priorities = ["High", "Medium", "Low"];

export interface SelectProps {
  priority: string;
  status: string;
}

export default function UpdatePriority({
  priority,
  task,
}: {
  priority: string;
  task: Task;
}) {
  const { handleSubmit } = useForm<SelectProps>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [selectedPriority, setselectedPriority] = useState<any>(
    task
      ? {
          label: task.priority,
        }
      : ""
  );

  const priorityOptions = priorities.map((type) => ({
    value: type,
    label: type,
  }));
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: SelectProps) {
    data.priority = selectedPriority.label;
    try {
      setLoading(true);
      await updateTaskStatus(task.slug, data);
      toast.success("Priority updated successfully.");
      setLoading(false);
      router.push("/dashboard/tasks");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          {priority === "Medium" && (
            <Badge
              className={cn(
                "bg-gradient-to-r border px-3 py-1 text-white shadow-lg from-amber-500 to-amber-700 border-amber-500 shadow-amber-500/20"
              )}
            >
              {priority.toUpperCase()}
            </Badge>
          )}
          {priority === "High" && (
            <Badge
              className={cn(
                "bg-gradient-to-r border px-3 py-1 text-white shadow-lg from-red-500 to-red-700 border-red-500 shadow-red-500/20"
              )}
            >
              {priority.toUpperCase()}
            </Badge>
          )}
          {priority === "Low" && (
            <Badge
              className={cn(
                "bg-gradient-to-r border px-3 py-1 text-white shadow-lg from-green-500 to-green-700 border-green-500 shadow-green-500/20"
              )}
            >
              {priority.toUpperCase()}
            </Badge>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-950 border-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-slate-300">
              Update the task Status
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <FormSelectInput
                label="Status"
                options={priorityOptions}
                option={selectedPriority}
                setOption={setselectedPriority}
                toolTipText="Select Status"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <button
                disabled
                className="py-1 text-white bg-blue-800 flex items-center gap-2 px-4 rounded-md opacity-50 cursor-not-allowed"
                type="button"
              >
                <Loader className="w-4 h-4 animate-spin" />
                Updating..
              </button>
            ) : (
              <button
                className="py-1 text-white bg-blue-800 px-4 rounded-md"
                type="submit"
              >
                Update
              </button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
