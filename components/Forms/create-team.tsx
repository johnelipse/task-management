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
import { Department } from "@prisma/client";
import { useState } from "react";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

// const formSchema = z.object({
//   name: z.string().min(1, "Team name is required"),
//   description: z.string().min(1, "Description is required"),
//   department: z.string().min(1, "Department is required"),
// });

export function TeamCreationForm({
  departments,
}: {
  departments: Department[];
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamProps>();
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState<any>("");
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
                Creating...
              </Button>
            ) : (
              <Button type="submit">Create Team</Button>
            )}
          </CardFooter>
        </form>
      </div>
    </Card>
  );
}
