"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateTaskStatus } from "@/actions/tasks";
import { useRouter } from "next/navigation";
import { ToggleLeft } from "lucide-react";
import { Task } from "@prisma/client";
export interface SelectProps {
  status: string;
}
const statuses = ["Pending", "Inprogress", "Completed"];

export function StatusDialog({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);
  const { handleSubmit } = useForm<SelectProps>();
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
    console.log(data);
    try {
      setLoading(true);
      await updateTaskStatus(task.id, data);
      toast.success("Status updated successfully.");
      setLoading(false);
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
        <div className="hover:bg-gray-800 cursor-pointer flex items-center gap-2 ml-3">
          <ToggleLeft className="h-4 w-4" />
          <span>Status</span>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-black text-white border border-gray-800 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white">Update Status</DialogTitle>
          <DialogDescription className="text-gray-400">
            Change the current status of this item.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button
              type={loading ? "button" : "submit"}
              className="bg-gray-800 hover:bg-gray-700 text-white"
              disabled={loading}
            >
              {loading ? " Saving..." : " Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
