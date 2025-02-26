"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import ImageInput from "../FormInputs/ImageInput";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import { MemberProps } from "@/types/types";
import { Department, Team } from "@prisma/client";
import FormSelectInput from "../FormInputs/FormSelectInput";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// const skills = [
//   "JavaScript",
//   "React",
//   "Node.js",
//   "Python",
//   "Java",
//   "SQL",
//   "Project Management",
//   "Communication",
//   "Leadership",
//   "Problem Solving",
//   "Agile",
//   "DevOps",
// ];

const employmentTypes = ["Full-time", "Part-time", "Contract"];

export default function TeamMemberForm({
  departments,
  teams,
}: {
  departments: Department[];
  teams: Team[];
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const initialImage = "/placeholder.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [filteredTeams, setFilteredTeams] = useState<any[]>([]);
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberProps>();
  const [selectedDepartment, setSelectedDepartment] = useState<any>("");
  const selectDepartment = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<any>("");
  const employmentTypeOptions = employmentTypes.map((type) => ({
    value: type,
    label: type,
  }));

  const [selectedteam, setSelectedteam] = useState<any>("");
  const [err, setErr] = useState("");
  const selecteteam = teams.map((team) => ({
    value: team.id,
    label: team.name,
  }));

  useEffect(() => {
    if (selectedDepartment) {
      // Filter teams by the selected department ID
      const teamsInDepartment = teams.filter(
        (team) => team.departmentId === selectedDepartment.value
      );
      setFilteredTeams(
        teamsInDepartment.map((team) => ({
          value: team.id,
          label: team.name,
        }))
      );

      // Reset selected team when department changes
      setSelectedteam("");
    } else {
      setFilteredTeams([]);
    }
  }, [selectedDepartment, teams]);
  function handleCancel() {
    router.push("/dashboard/members");
  }
  async function onSubmit(data: MemberProps) {
    data.employeeId = `EMP-${Math.floor(100000 + Math.random() * 900000)}`;
    data.department = selectedDepartment.label;
    data.teamId = selectedteam.value;
    data.dateJoined = selectedDate?.toDateString() as string;
    data.employmentType = selectedEmploymentType.value;
    data.image = imageUrl;
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        setIsSubmitting(false);
        toast.success("Member created successfully.");
        setImageUrl(initialImage);
        reset();
        router.push("/dashboard/members");
      } else if (res.status === 409) {
        setIsSubmitting(false);
        setErr("Member Member already exists in this team.");
        toast.error("Member Member already exists in this team.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-10 shadow-xl bg-gray-950 max-w-4xl mx-auto px-4 py-4"
      >
        {/* Personal Details Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-200">
            Personal Details
          </h2>
          <div className="flex flex-col-reverse gap-6">
            <div className="grid gap-3  md:grid-cols-3">
              <TextInput
                register={register}
                errors={errors}
                label="Full Name"
                name="fullName"
              />
              <div>
                <TextInput
                  register={register}
                  errors={errors}
                  label="Email Address"
                  name="email"
                />
                {err && <span className="text-xs text-red-500">{err}</span>}
              </div>
              <div>
                <TextInput
                  register={register}
                  errors={errors}
                  label="Phone Number"
                  name="phone"
                />
                {err && <span className="text-xs text-red-500">{err}</span>}
              </div>
            </div>

            <div className="px-0 flex justify-between">
              <div className="mb-4 p-3 text-slate-300 rounded-md text-sm">
                <h1 className="font-bold text-slate-300 text-xl">
                  Instructions for Uploading an Image:
                </h1>
                <ul className="list-disc mt-4 space-y-3 list-inside text-slate-300">
                  <li>Accepted formats: JPG, PNG, WEBP.</li>
                  <li>Recommended dimensions: 500x500px (or higher).</li>
                  <li>File size should not exceed 2MB.</li>
                  <li>Ensure clarity and centered focus.</li>
                  <li>Avoid watermarks or unnecessary text.</li>
                </ul>
              </div>
              <div className="w-[50%]">
                <ImageInput
                  title="Member Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="categoryImage"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Details Section */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-slate-300">
            Professional Details
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <TextInput
              register={register}
              errors={errors}
              label="Job Title"
              name="jobTitle"
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

            <div>
              <FormSelectInput
                label="Teams in Department"
                options={filteredTeams}
                option={selectedteam}
                setOption={setSelectedteam}
                toolTipText="Add Teams"
                href="/dashboard/teams/new"
              />
              {err && <span className="text-xs text-red-500">{err}</span>}
            </div>
            <div>
              <FormSelectInput
                label="Employment Type"
                options={employmentTypeOptions}
                option={selectedEmploymentType}
                setOption={setSelectedEmploymentType}
                toolTipText="Select employment type"
              />
            </div>

            <div className="space-y-3 text-sm">
              <p className="text-slate-300">Date Joined</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 bg-gray-950 hover:bg-transparent hover:text-slate-300 border-gray-800 text-slate-300 text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto border-gray-800 bg-gray-950 text-slate-300 p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-slate-300">
            Additional Information
          </h2>
          <div className="grid gap-6">
            {/* <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value?.length > 0
                              ? `${field.value.length} selected`
                              : "Select skills"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command className="w-full">
                          <CommandInput placeholder="Search skills..." />
                          <CommandList>
                            <CommandEmpty>No skill found.</CommandEmpty>
                            <CommandGroup>
                              <ScrollArea className="h-64">
                                {skills.map((skill) => (
                                  <CommandItem
                                    value={skill}
                                    key={skill}
                                    onSelect={() => {
                                      const values = new Set(field.value);
                                      if (values.has(skill)) {
                                        values.delete(skill);
                                      } else {
                                        values.add(skill);
                                      }
                                      field.onChange(Array.from(values));
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value?.includes(skill)
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {skill}
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <div className="mt-2">
                    {field.value?.map((skill) => (
                      <Badge key={skill} className="mr-2 mb-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <TextArea
              register={register}
              errors={errors}
              label="Short Bio"
              name="description"
            />

            {/* <FormField
              control={form.control}
              name="linkedinProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
        </div>

        <div className="flex flex-row-reverse justify-between gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </Button>
          <Button
            onClick={handleCancel}
            type="button"
            variant="outline"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
