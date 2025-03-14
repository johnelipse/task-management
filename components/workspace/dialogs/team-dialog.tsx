"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

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
import type { TeamProps } from "@/types/types";
import type { Department, Team } from "@prisma/client";
import { updateTeam } from "@/actions/teams";
import TextInput from "@/components/FormInputs/TextInput";
import TextArea from "@/components/FormInputs/TextAreaInput";

interface TeamDialogProps {
  workspaceId: string;
  initialData?: Team;
  trigger: React.ReactNode;
}

export function TeamDialog({
  workspaceId,
  initialData,
  trigger,
}: TeamDialogProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamProps>({
    defaultValues: {
      name: initialData?.name,
      slug: initialData?.slug,
      description: initialData?.description,
      workspaceId: initialData?.workspaceId as string,
    },
  });
  const router = useRouter();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  function handleCancel() {
    setOpen(false);
  }

  async function onSubmit(data: TeamProps) {
    data.workspaceId = workspaceId;
    data.slug = data.name.split(" ").join("-").toLowerCase();
    if (initialData) {
      try {
        setLoading(true);
        await updateTeam(initialData.slug, data);
        setLoading(false);
        toast.success("Team updated successfully.");
        router.refresh();
        // window.location.reload();
        setOpen(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Something went wrong.");
      }
    } else {
      try {
        setLoading(true);
        const res = await fetch("/api/teams", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.status === 201) {
          setLoading(false);
          reset();
          toast.success("Team created successfully.");
          router.refresh();
          //   window.location.reload();
          setOpen(false);
        } else if (res.status === 409) {
          setLoading(false);
          setErr("Team already exists.");
          toast.error("Team already exists.");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gray-950/35 backdrop-blur-md border-gray-800 text-slate-300">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Update Board" : "Create Board"}
          </DialogTitle>
          <DialogDescription>
            Set up a new board and add tasks
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <TextInput
              register={register}
              errors={errors}
              label="Team Name"
              name="name"
            />
            <TextArea
              register={register}
              errors={errors}
              label="Description"
              name="description"
            />

            {/* <div>
              <FormSelectInput
                label="All Departments"
                options={selectDepartment}
                option={selectedDepartment}
                setOption={setSelectedDepartment}
                toolTipText="Add Departments"
                href="/dashboard/departments/new"
              />
            </div> */}
          </div>
          <DialogFooter className="justify-between space-x-2">
            <Button
              className="text-black bg-white hover:bg-white"
              onClick={handleCancel}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            {loading ? (
              <Button
                disabled
                type="button"
                className="flex gap-2 items-center"
              >
                <Loader className="w-4 h-4 animate-spin" />
                {initialData ? "  Updating..." : "  Creating..."}
              </Button>
            ) : (
              <Button type="submit">
                {initialData ? "Update Team" : "Create Team"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
