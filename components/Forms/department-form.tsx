"use client";

import { Building2, Loader } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TextInput from "../FormInputs/TextInput";
import { DepartmentProps } from "@/types/types";
import TextArea from "../FormInputs/TextAreaInput";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { Department } from "@prisma/client";
import { updateDepartment } from "@/actions/departments";

export function DepartmentCreationForm({
  initialData,
}: {
  initialData?: Department | null;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentProps>({
    defaultValues: {
      budget: initialData?.budget,
      code: initialData?.code,
      description: initialData?.description,
      employeeCapacity: initialData?.employeeCapacity,
      isActive: initialData?.isActive,
      location: initialData?.location,
      name: initialData?.name,
      slug: initialData?.slug,
    },
  });
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
    if (initialData) {
      try {
        setLoading(true);
        await updateDepartment(initialData.slug, data);
        setLoading(false);
        toast.success("Department updated successfully.");
        router.push("/dashboard/departments");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Something went wrong.");
      }
    } else {
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
  }

  return (
    <Card className="w-full mx-auto bg-gray-950 border-gray-800 max-w-2xl">
      <CardHeader>
        <div className="flex text-slate-300 items-center space-x-4">
          <Building2 className="h-8 w-8" />
          <div>
            <CardTitle>
              {initialData ? "Update Department" : "Create Department"}
            </CardTitle>
            <CardDescription>
              {initialData
                ? "Update your department in your organization"
                : "Add a new department to your organization"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="text-lg text-slate-300 font-semibold">
                Basic Information
              </div>
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
              <div className="text-lg font-semibold text-slate-300">
                Department Details
              </div>
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
                  <p className="text-xs text-slate-300">Working State</p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      {...register("isActive")}
                    />
                    <label
                      htmlFor="isActive"
                      className="text-sm text-slate-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                {initialData ? "  Updating..." : "  Creating..."}
              </Button>
            ) : (
              <Button type="submit">
                {initialData ? "Update Department" : "Create Department"}
              </Button>
            )}
          </CardFooter>
        </form>
      </div>
    </Card>
  );
}
