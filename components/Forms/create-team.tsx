"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import { TeamProps } from "@/types/types";
import { Department, Team } from "@prisma/client";
import { useState } from "react";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { updateTeam } from "@/actions/teams";

export function TeamCreationForm({
  departments,
  initialData,
}: {
  departments: Department[];
  initialData?: (Team & { Department: Department }) | null | any;
}) {
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
      departmentId: initialData?.departmentId as string,
    },
  });
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState<any>(
    initialData
      ? { value: initialData.departmentId, label: initialData.Department.name }
      : ""
  );
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const selectDepartment = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  function handleCancel() {
    router.push("/dashboard/teams");
  }

  async function onSubmit(data: TeamProps) {
    data.departmentId = selectedDepartment.value;
    data.slug = data.name.split(" ").join("-").toLowerCase();
    if (initialData) {
      try {
        setLoading(true);
        await updateTeam(initialData.slug, data);
        setLoading(false);
        toast.success("Team updated successfully.");
        router.push("/dashboard/teams");
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
          router.push("/dashboard/teams");
          toast.success("Team created successfully.");
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
    <Card className="w-full max-w-lg bg-gray-950/35 backdrop-blur-md border-gray-800 text-slate-300 mx-auto">
      <CardHeader>
        <CardTitle>Create Team</CardTitle>
        <CardDescription>Set up a new team and add members</CardDescription>
      </CardHeader>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
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

            <div>
              <FormSelectInput
                label="All Departments"
                options={selectDepartment}
                option={selectedDepartment}
                setOption={setSelectedDepartment}
                toolTipText="Add Departments"
                href="/dashboard/departments/new"
              />
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
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
                {" "}
                {initialData ? "Update Team" : "Create Team"}
              </Button>
            )}
          </CardFooter>
        </form>
      </div>
    </Card>
  );
}
