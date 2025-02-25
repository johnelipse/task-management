"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Loader } from "lucide-react";
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
  FormDescription,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import TextInput from "../FormInputs/TextInput";
import RadioInput from "../FormInputs/RadioInput";
import { DepartmentProps } from "@/types/types";
import TextArea from "../FormInputs/TextAreaInput";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

// const formSchema = z.object({
//   name: z.string().min(2, "Department name must be at least 2 characters"),
//   code: z.string().min(2, "Department code must be at least 2 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   location: z.string().min(1, "Location is required"),
//   budget: z.string().regex(/^\d+$/, "Budget must be a valid number"),
//   employeeCapacity: z
//     .string()
//     .regex(/^\d+$/, "Employee capacity must be a valid number"),
//   isActive: z.boolean().default(true),
// });

export function DepartmentCreationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentProps>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  function handleCancel() {
    router.push("/dashboard/departments");
  }

  async function onSubmit(data: DepartmentProps) {
    data.budget = Number(data.budget);
    data.employeeCapacity = Number(data.employeeCapacity);
    data.slug = data.name.split(" ").join("-").toLowerCase();
    try {
      setLoading(true);
      const res = await fetch("/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        setLoading(false);
        reset();
        toast.success("Department created successfully.");
        router.push("/dashboard/departments");
      } else if (res.status === 409) {
        setLoading(false);
        setErr("Department already exists.");
        toast.error("Department already exists.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong.");
    }
  }

  return (
    <Card className="w-full mx-auto max-w-2xl">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Building2 className="h-8 w-8" />
          <div>
            <CardTitle>Create Department</CardTitle>
            <CardDescription>
              Add a new department to your organization
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="text-lg font-semibold">Basic Information</div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-3 pt-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Department Name"
                    name="name"
                  />
                  {err && <span className="text-xs text-red-500">{err}</span>}
                </div>
                <div className="grid gap-3 pt-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Department Code"
                    name="code"
                  />
                </div>
              </div>
              <div className="grid gap-3 pt-3">
                <TextArea
                  register={register}
                  errors={errors}
                  label="Description"
                  name="description"
                />
              </div>
            </div>

            {/* Department Details */}
            <div className="space-y-4">
              <div className="text-lg font-semibold">Department Details</div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-3 pt-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="location/Office"
                    name="location"
                  />
                </div>
                <div className="grid gap-3 pt-3">
                  <TextInput
                    type="number"
                    register={register}
                    errors={errors}
                    label="Annual Budget"
                    name="budget"
                  />
                </div>
                <div className="grid gap-3">
                  <TextInput
                    type="number"
                    register={register}
                    errors={errors}
                    label="Employee Capacity"
                    name="employeeCapacity"
                  />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <p className="text-xs">Working State</p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      {...register("isActive")}
                    />
                    <label
                      htmlFor="isActive"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Is Active
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button onClick={handleCancel} type="button" variant="outline">
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
              <Button type="submit">Create Department</Button>
            )}
          </CardFooter>
        </form>
      </div>
    </Card>
  );
}
