"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Clock, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import FormSelectInput from "../FormInputs/FormSelectInput";
import type { Department, Member, Team } from "@prisma/client";
import { MultiSelect } from "../dashboard/multiple-select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export type FormData = {
  taskName: string;
  slug: string;
  taskDescription: string;
  priority: string;
  department: string;
  startDate: string;
  endDate: string;
  status: string;
  memberIds: string[];
  teamId: string;
};

const TaskCreationForm = ({
  departments,
  teams,
  members,
}: {
  departments: Department[];
  teams: Team[];
  members: Member[];
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [role, setRole] = useState("");
  const form = useForm<FormData>();

  const router = useRouter();

  const statuses = ["Pending", "Inprogress", "Completed"];
  const priorities = ["High", "Medium", "Low"];
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const [selectedPriority, setselectedPriority] = useState<any>("");
  const [selectedStatus, setselectedStatus] = useState<any>("");
  const priorityOptions = priorities.map((type) => ({
    value: type,
    label: type,
  }));

  const statusOptions = statuses.map((type) => ({
    value: type,
    label: type,
  }));

  const [filteredTeams, setFilteredTeams] = useState<any[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>("");
  const selectDepartment = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));
  const [selectedteam, setSelectedteam] = useState<any>("");
  const [selectedMember, setSelectedMember] = useState<any>("");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (selectedteam) {
      // Filter members by the selected team ID
      const membersInTeam = members.filter(
        (member) => member.teamId === selectedteam.value
      );

      // Add "All Members" option at the beginning of the array, but only for team members
      setFilteredMembers([
        // { value: "all", label: `All ${membersInTeam.length} Team Members` },
        ...membersInTeam.map((member) => ({
          value: member.id,
          label: member.fullName,
        })),
      ]);
    } else {
      // When no team is selected, don't show any members
      setFilteredMembers([]);

      // Reset selected member when team changes
      setSelectedMember("");
    }
  }, [selectedteam, members]);

  // Add a function to handle the selection of members
  const handleMemberSelection = (option: any) => {
    setSelectedMember(option);
    // If "All Members" is selected, you can handle it specially
    // if (option.value === "all") {
    //   console.log("All members selected");
    //   // Here you could set a state variable to track that all members are selected
    //   // or handle it in your form submission logic
    // }
  };

  async function onSubmit(data: FormData) {
    data.startDate = selectedDate?.toDateString() as string;
    data.endDate = selectedEndDate?.toDateString() as string;
    data.memberIds = selectedMember;
    data.teamId = selectedteam.value;
    data.priority = selectedPriority.label;
    data.status = selectedStatus.label;
    data.department = selectedDepartment.label;
    data.slug = data.taskName.split(" ").join("-").toLowerCase();
    try {
      setLoading(true);
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        toast.success("Task created successfully.");
        setLoading(false);
        reset();
        router.push("/dashboard/tasks");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create the task.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-0 md:p-6 bg-gray-950 rounded-lg shadow-lg">
      <h1 className="text-3xl p-4 text-slate-300 font-bold mb-6">
        Create New Task
      </h1>
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div>
            <TextInput
              register={register}
              errors={errors}
              label="Task Name"
              name="taskName"
            />
          </div>

          <TextArea
            register={register}
            errors={errors}
            label="Task Description"
            name="taskDescription"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormSelectInput
                label="Priority"
                options={priorityOptions}
                option={selectedPriority}
                setOption={setselectedPriority}
                toolTipText="Select Priority"
              />
            </div>

            <div className="space-y-3 text-sm">
              <p>Start Date</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 bg-gray-950 hover:bg-gray-900 border-gray-900 hover:text-gray-300 text-left font-normal",
                      !selectedDate && "text-slate-200"
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
                  className="w-full pl-3 bg-gray-950 hover:bg-gray-900 border-gray-900 text-gray-300 text-left font-normal"
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

          <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm">
              <p>End Date</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 bg-gray-950 hover:bg-gray-900 border-gray-900 hover:text-gray-300 text-left font-normal",
                      !selectedEndDate && "text-muted-foreground"
                    )}
                  >
                    {selectedEndDate ? (
                      format(selectedEndDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-full pl-3 bg-gray-950 hover:bg-gray-900 border-gray-900 text-gray-300 text-left font-normal"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedEndDate}
                    onSelect={setSelectedEndDate}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <FormSelectInput
                label="Status"
                options={statusOptions}
                option={selectedStatus}
                setOption={setselectedStatus}
                toolTipText="Select Status"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
            <div>
              {/* <FormSelectInput
                label="Members"
                options={filteredMembers}
                option={selectedMember}
                setOption={handleMemberSelection}
                toolTipText="Add Members"
                href="/dashboard/members/new"
              /> */}
              <MultiSelect
                className="bg-gray-950 border hover:bg-transparent"
                options={filteredMembers}
                onChange={handleMemberSelection}
              />
            </div>
          </div>

          {role && (
            <div className="bg-gray-100 p-3 rounded-md">
              <p className="text-sm font-medium">Role of Assignee: {role}</p>
            </div>
          )}

          <div className="flex mt-4 flex-row-reverse justify-between">
            {loading ? (
              <Button
                disabled
                className="flex items-center gap-3"
                type="button"
              >
                <Loader className="w-4 h-4 animate-spin" />
                Submiting...
              </Button>
            ) : (
              <Button type="submit">Submit Task</Button>
            )}
            {/* <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button> */}
            {/* <Button
              type="button"
              variant="secondary"
              onClick={() => console.log("Save as Draft")}
            >
              Save as Draft
            </Button> */}
          </div>
        </form>
      </>
    </div>
  );
};

export default TaskCreationForm;
