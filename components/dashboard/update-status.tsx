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
const statuses = ["Pending", "Inprogress", "Completed"];

export interface SelectProps {
  status: string;
}

export default function UpdateStatus({
  status,
  task,
}: {
  status: string;
  task: Task;
}) {
  const { handleSubmit } = useForm<SelectProps>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [selectedStatus, setselectedStatus] = useState<any>(
    task
      ? {
          label: task.status,
        }
      : ""
  );

  const statusOptions = statuses.map((type) => ({
    value: type,
    label: type,
  }));
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: SelectProps) {
    data.status = selectedStatus.label;
    try {
      setLoading(true);
      // await updateTaskStatus(task.slug, data);
      toast.success("Status updated successfully.");
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
          {status === "Inprogress" && (
            <Badge
              className={cn(
                "bg-gradient-to-r border px-3 py-1 text-white from-blue-500 to-blue-700 border-blue-500"
              )}
            >
              {status}
            </Badge>
          )}
          {status === "Pending" && (
            <Badge
              className={cn(
                "bg-gradient-to-r border px-3 py-1 text-white from-purple-500 to-purple-700 border-purple-500"
              )}
            >
              {status}
            </Badge>
          )}
          {status === "Completed" && (
            <Badge
              className={cn(
                "bg-gradient-to-r border px-3 py-1 text-white from-emerald-500 to-emerald-700 border-emerald-500"
              )}
            >
              {status}
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
                options={statusOptions}
                option={selectedStatus}
                setOption={setselectedStatus}
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
