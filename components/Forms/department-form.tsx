"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2 } from "lucide-react";
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

const formSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters"),
  code: z.string().min(2, "Department code must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Location is required"),
  budget: z.string().regex(/^\d+$/, "Budget must be a valid number"),
  employeeCapacity: z
    .string()
    .regex(/^\d+$/, "Employee capacity must be a valid number"),
  isActive: z.boolean().default(true),
});

export function DepartmentCreationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentProps>();
  const radioOptions = [
    {
      label: "Is Active",
      id: "1",
    },
    // {
    //   label: "Half",
    //   id: "HALF",
    // },
    // {
    //   label: "Quarter",
    //   id: "QUARTER",
    // },
  ];
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     description: "",
  //     isActive: true,
  //   },
  // });

  function onSubmit(data: DepartmentProps) {
    data.budget = Number(data.budget);
    data.employeeCapacity = Number(data.employeeCapacity);
    console.log(data);
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
                {/* <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Human Resources" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <div className="grid gap-3 pt-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Department Name"
                    name="name"
                  />
                </div>
                <div className="grid gap-3 pt-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Department Code"
                    name="code"
                  />
                </div>
                {/* <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department Code</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. HR-001" {...field} />
                      </FormControl>
                      <FormDescription>
                        Unique identifier for the department
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
              {/* <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter department description..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <div className="grid gap-3 pt-3">
                <TextInput
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
                {/* <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>location/Office</FormLabel>
                      <FormControl>
                        <Input placeholder="2-floor" {...field} />
                      </FormControl>
                      <FormDescription>
                        Unique identifier for the department
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
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
                {/* <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Budget</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter budget amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                {/* <FormField
                  control={form.control}
                  name="employeeCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee Capacity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Maximum number of employees"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <div className="grid gap-3">
                  <TextInput
                    type="number"
                    register={register}
                    errors={errors}
                    label="Employee Capacity"
                    name="employeeCapacity"
                  />
                </div>
                {/* <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Department Status
                        </FormLabel>
                        <FormDescription>
                          Activate or deactivate department
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                /> */}

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
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create Department</Button>
          </CardFooter>
        </form>
      </div>
    </Card>
  );
}
