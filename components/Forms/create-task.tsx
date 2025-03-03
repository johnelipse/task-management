// "use client";

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { format } from "date-fns";
// import { CalendarIcon, Clock, Loader } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import TextInput from "../FormInputs/TextInput";
// import TextArea from "../FormInputs/TextAreaInput";
// import FormSelectInput from "../FormInputs/FormSelectInput";
// import type { Department, Member, Task, Team } from "@prisma/client";
// import { MultiSelect } from "../dashboard/multiple-select";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { updateTask } from "@/actions/tasks";

// export type FormData = {
//   taskName: string;
//   slug: string;
//   taskDescription: string;
//   priority: string;
//   department: string;
//   startDate: string;
//   endDate: string;
//   status: string;
//   memberIds: string[];
//   teamId: string;
// };

// const TaskCreationForm = ({
//   departments,
//   teams,
//   members,
//   initialData,
// }: {
//   departments: Department[];
//   teams: Team[];
//   members: Member[];
//   initialData?: (Task & { team: Team }) | null | any;
// }) => {
//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     defaultValues: {
//       taskName: initialData?.taskName || "",
//       slug: initialData?.slug || "",
//       taskDescription: (initialData?.taskDescription as string) || "",
//       priority: initialData?.priority || "",
//       department: initialData?.department || "",
//       startDate: initialData?.startDate || "",
//       endDate: initialData?.endDate || "",
//       status: initialData?.status || "",
//       memberIds: initialData?.memberIds || [],
//       teamId: initialData?.teamId || "",
//     },
//   });
//   // const [role, setRole] = useState("");
//   const form = useForm<FormData>();

//   const router = useRouter();

//   const statuses = ["Pending", "Inprogress", "Completed"];
//   const priorities = ["High", "Medium", "Low"];
//   const [selectedDate, setSelectedDate] = useState<any>(
//     initialData?.startDate ? new Date(initialData.startDate) : undefined
//   );
//   const [selectedEndDate, setSelectedEndDate] = useState<any>(
//     initialData?.endDate ? new Date(initialData.endDate) : undefined
//   );
//   const [selectedPriority, setselectedPriority] = useState<any>(
//     initialData?.priority
//       ? { value: initialData.priority, label: initialData.priority }
//       : ""
//   );
//   const [selectedStatus, setselectedStatus] = useState<any>(
//     initialData?.status
//       ? { value: initialData.status, label: initialData.status }
//       : ""
//   );
//   const priorityOptions = priorities.map((type) => ({
//     value: type,
//     label: type,
//   }));

//   const statusOptions = statuses.map((type) => ({
//     value: type,
//     label: type,
//   }));

//   const [filteredTeams, setFilteredTeams] = useState<any[]>([]);
//   const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
//   const [selectedDepartment, setSelectedDepartment] = useState<any>(
//     initialData?.department
//       ? { value: initialData.department, label: initialData.department }
//       : ""
//   );
//   const selectDepartment = departments.map((department) => ({
//     value: department.name,
//     label: department.name,
//   }));
//   const [selectedteam, setSelectedteam] = useState<any>(
//     initialData?.teamId
//       ? { value: initialData.teamId, label: initialData.team?.name }
//       : ""
//   );

//   // Convert the array of memberIds from initialData to the format expected by MultiSelect
//   const [selectedMember, setSelectedMember] = useState<any>(
//     initialData?.memberIds && initialData.memberIds.length > 0
//       ? initialData.memberIds.map((id: string) => {
//           const member = members.find((m) => m.id === id);
//           return {
//             value: id,
//             label: member?.fullName || id,
//           };
//         })
//       : []
//   );

//   const [loading, setLoading] = useState(false);

//   // Filter teams based on selected department
//   useEffect(() => {
//     if (selectedDepartment && selectedDepartment.value) {
//       // Get department ID based on department name
//       const departmentId = departments.find(
//         (d) => d.name === selectedDepartment.value
//       )?.id;

//       if (departmentId) {
//         // Filter teams by the selected department ID
//         const teamsInDepartment = teams.filter(
//           (team) => team.departmentId === departmentId
//         );

//         setFilteredTeams(
//           teamsInDepartment.map((team) => ({
//             value: team.id,
//             label: team.name,
//           }))
//         );
//       }
//     } else {
//       setFilteredTeams([]);
//     }
//   }, [selectedDepartment, teams, departments]);

//   // Filter members based on selected team
//   useEffect(() => {
//     if (selectedteam && selectedteam.value) {
//       // Filter members by the selected team ID
//       const membersInTeam = members.filter(
//         (member) => member.teamId === selectedteam.value
//       );

//       setFilteredMembers(
//         membersInTeam.map((member) => ({
//           value: member.id,
//           label: member.fullName,
//         }))
//       );
//     } else {
//       setFilteredMembers([]);
//     }
//   }, [selectedteam, members]);

//   // Add a function to handle the selection of members
//   const handleMemberSelection = (option: any) => {
//     setSelectedMember(option);
//   };

//   async function onSubmit(data: FormData) {
//     data.startDate = selectedDate?.toDateString() as string;
//     data.endDate = selectedEndDate?.toDateString() as string;
//     // Extract just the member IDs from the selected members objects
//     data.memberIds = selectedMember.map((member: any) => member.value);
//     data.teamId = selectedteam.value;
//     data.priority = selectedPriority.label;
//     data.status = selectedStatus.label;
//     data.department = selectedDepartment.label;
//     data.slug = data.taskName.split(" ").join("-").toLowerCase();

//     if (initialData) {
//       setLoading(true);
//       await updateTask(initialData.slug, data);
//       setLoading(false);
//       toast.success("Task updated successfully.");
//       router.push("/dashboard/tasks");
//     } else {
//       try {
//         setLoading(true);
//         const res = await fetch("/api/tasks", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
//         if (res.status === 201) {
//           toast.success("Task created successfully.");
//           setLoading(false);
//           reset();
//           router.push("/dashboard/tasks");
//           router.refresh();
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error("Failed to create the task.");
//         setLoading(false);
//       }
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-0 md:p-6 bg-gray-950 rounded-lg shadow-lg">
//       <h1 className="text-3xl p-4 text-slate-300 font-bold mb-6">
//         {initialData ? "Update Task" : "Create New Task"}
//       </h1>
//       <>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
//           <div>
//             <TextInput
//               register={register}
//               errors={errors}
//               label="Task Name"
//               name="taskName"
//             />
//           </div>

//           <TextArea
//             register={register}
//             errors={errors}
//             label="Task Description"
//             name="taskDescription"
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <FormSelectInput
//                 label="Priority"
//                 options={priorityOptions}
//                 option={selectedPriority}
//                 setOption={setselectedPriority}
//                 toolTipText="Select Priority"
//               />
//             </div>

//             <div className="space-y-3 text-sm">
//               <p>Start Date</p>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className={cn(
//                       "w-full pl-3 bg-gray-950 hover:bg-gray-900 border-gray-900 text-slate-300 hover:text-gray-300 text-left font-normal",
//                       !selectedDate && "text-slate-200"
//                     )}
//                   >
//                     {selectedDate ? (
//                       format(selectedDate, "PPP")
//                     ) : (
//                       <span>Pick a date</span>
//                     )}
//                     <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent
//                   className="w-full pl-3 bg-gray-950 hover:bg-gray-900 border-gray-900 text-gray-300 text-left font-normal"
//                   align="start"
//                 >
//                   <Calendar
//                     mode="single"
//                     selected={selectedDate}
//                     onSelect={setSelectedDate}
//                     disabled={(date) => date < new Date("1900-01-01")}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>

//           <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
//             <div className="space-y-3 text-sm">
//               <p>End Date</p>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className={cn(
//                       "w-full pl-3 bg-gray-950 hover:bg-gray-900 border-gray-900 hover:text-gray-300 text-left text-slate-300  font-normal",
//                       !selectedEndDate && "text-muted-foreground"
//                     )}
//                   >
//                     {selectedEndDate ? (
//                       format(selectedEndDate, "PPP")
//                     ) : (
//                       <span>Pick a date</span>
//                     )}
//                     <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent
//                   className="w-full pl-3 bg-gray-950 hover:bg-gray-900 border-gray-900 text-gray-300 text-left font-normal"
//                   align="start"
//                 >
//                   <Calendar
//                     mode="single"
//                     selected={selectedEndDate}
//                     onSelect={setSelectedEndDate}
//                     disabled={(date) => date < new Date("1900-01-01")}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//             <div>
//               <FormSelectInput
//                 label="Status"
//                 options={statusOptions}
//                 option={selectedStatus}
//                 setOption={setselectedStatus}
//                 toolTipText="Select Status"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <FormSelectInput
//                 label="All Departments"
//                 options={selectDepartment}
//                 option={selectedDepartment}
//                 setOption={setSelectedDepartment}
//                 toolTipText="Add Departments"
//                 href="/dashboard/departments/new"
//               />
//             </div>

//             <div>
//               <FormSelectInput
//                 label="Teams in Department"
//                 options={filteredTeams}
//                 option={selectedteam}
//                 setOption={setSelectedteam}
//                 toolTipText="Add Teams"
//                 href="/dashboard/teams/new"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Members</label>
//               <MultiSelect
//                 className="bg-gray-950 border hover:bg-transparent"
//                 options={filteredMembers}
//                 value={selectedMember}
//                 onChange={handleMemberSelection}
//                 placeholder="Select team members..."
//               />
//             </div>
//           </div>

//           {/* {role && (
//             <div className="bg-gray-100 p-3 rounded-md">
//               <p className="text-sm font-medium">Role of Assignee: {role}</p>
//             </div>
//           )} */}

//           <div className="flex mt-4 flex-row-reverse justify-between">
//             {loading ? (
//               <Button
//                 disabled
//                 className="flex items-center gap-3"
//                 type="button"
//               >
//                 <Loader className="w-4 h-4 animate-spin" />
//                 {initialData ? "Updating..." : "Submiting..."}
//               </Button>
//             ) : (
//               <Button type="submit">
//                 {initialData ? "Update Task" : "Submit Task"}
//               </Button>
//             )}
//           </div>
//         </form>
//       </>
//     </div>
//   );
// };

// export default TaskCreationForm;

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Loader } from "lucide-react";
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
import type { Department, Member, Task, Team } from "@prisma/client";
import { MultiSelect } from "../dashboard/multiple-select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateTask } from "@/actions/tasks";
import { Label } from "@/components/ui/label"; // Import the Label component

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
  initialData,
}: {
  departments: Department[];
  teams: Team[];
  members: Member[];
  initialData?: (Task & { team: Team }) | null | any;
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      taskName: initialData?.taskName || "",
      slug: initialData?.slug || "",
      taskDescription: (initialData?.taskDescription as string) || "",
      priority: initialData?.priority || "",
      department: initialData?.department || "",
      startDate: initialData?.startDate || "",
      endDate: initialData?.endDate || "",
      status: initialData?.status || "",
      memberIds: initialData?.memberIds || [],
      teamId: initialData?.teamId || "",
    },
  });
  // const [role, setRole] = useState("");
  const form = useForm<FormData>();

  const router = useRouter();

  const statuses = ["Pending", "Inprogress", "Completed"];
  const priorities = ["High", "Medium", "Low"];
  const [selectedDate, setSelectedDate] = useState<any>(
    initialData?.startDate ? new Date(initialData.startDate) : undefined
  );
  const [selectedEndDate, setSelectedEndDate] = useState<any>(
    initialData?.endDate ? new Date(initialData.endDate) : undefined
  );
  const [selectedPriority, setselectedPriority] = useState<any>(
    initialData?.priority
      ? { value: initialData.priority, label: initialData.priority }
      : ""
  );
  const [selectedStatus, setselectedStatus] = useState<any>(
    initialData?.status
      ? { value: initialData.status, label: initialData.status }
      : ""
  );
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
  const [selectedDepartment, setSelectedDepartment] = useState<any>(
    initialData?.department
      ? { value: initialData.department, label: initialData.department }
      : ""
  );
  const selectDepartment = departments.map((department) => ({
    value: department.name,
    label: department.name,
  }));
  const [selectedteam, setSelectedteam] = useState<any>(
    initialData?.teamId
      ? { value: initialData.teamId, label: initialData.team?.name }
      : ""
  );

  // Convert the array of memberIds from initialData to the format expected by MultiSelect
  const [selectedMember, setSelectedMember] = useState<any>(
    initialData?.memberIds && initialData.memberIds.length > 0
      ? initialData.memberIds.map((id: string) => {
          const member = members.find((m) => m.id === id);
          return {
            value: id,
            label: member?.fullName || id,
          };
        })
      : []
  );

  const [loading, setLoading] = useState(false);

  // Filter teams based on selected department
  useEffect(() => {
    if (selectedDepartment && selectedDepartment.value) {
      // Get department ID based on department name
      const departmentId = departments.find(
        (d) => d.name === selectedDepartment.value
      )?.id;

      if (departmentId) {
        // Filter teams by the selected department ID
        const teamsInDepartment = teams.filter(
          (team) => team.departmentId === departmentId
        );

        setFilteredTeams(
          teamsInDepartment.map((team) => ({
            value: team.id,
            label: team.name,
          }))
        );
      }
    } else {
      setFilteredTeams([]);
    }
  }, [selectedDepartment, teams, departments]);

  // Filter members based on selected team
  useEffect(() => {
    if (selectedteam && selectedteam.value) {
      // Filter members by the selected team ID
      const membersInTeam = members.filter(
        (member) => member.teamId === selectedteam.value
      );

      setFilteredMembers(
        membersInTeam.map((member) => ({
          value: member.id,
          label: member.fullName,
        }))
      );
    } else {
      setFilteredMembers([]);
    }
  }, [selectedteam, members]);

  // Add a function to handle the selection of members
  const handleMemberSelection = (option: any) => {
    setSelectedMember(option);
  };

  async function onSubmit(data: FormData) {
    data.startDate = selectedDate?.toDateString() as string;
    data.endDate = selectedEndDate?.toDateString() as string;
    // Extract just the member IDs from the selected members objects
    data.memberIds = selectedMember.map((member: any) => member.value);
    data.teamId = selectedteam.value;
    data.priority = selectedPriority.label;
    data.status = selectedStatus.label;
    data.department = selectedDepartment.label;
    data.slug = data.taskName.split(" ").join("-").toLowerCase();

    if (initialData) {
      setLoading(true);
      await updateTask(initialData.slug, data);
      setLoading(false);
      toast.success("Task updated successfully.");
      router.push("/dashboard/tasks");
    } else {
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
        const taskData = await res.json();
        await fetch("/api/notifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `New task "${data.taskName}" has been created.`,
            statusText: "New Task Created",
          }),
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to create the task.");
        setLoading(false);
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-0 md:p-6 bg-gray-950 rounded-lg shadow-lg">
      <h1 className="text-3xl p-4 text-slate-300 font-bold mb-6">
        {initialData ? "Update Task" : "Create New Task"}
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
              <Label className="text-slate-300" htmlFor="startDate">
                Start Date
              </Label>{" "}
              {/* Updated Start Date Label */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="startDate"
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 bg-gray-950 hover:bg-gray-900 border-gray-900 text-slate-300 hover:text-gray-300 text-left font-normal",
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
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm">
              <Label className="text-slate-300" htmlFor="endDate">
                End Date
              </Label>{" "}
              {/* Updated End Date Label */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="endDate"
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 bg-gray-950 hover:bg-gray-900 border-gray-900 hover:text-gray-300 text-left text-slate-300  font-normal",
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
                    disabled={(date) => date < new Date("1900-01-01")}
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
              <label className="block text-sm font-medium mb-1 text-slate-300">
                Members
              </label>
              <MultiSelect
                className="bg-gray-950 border hover:bg-transparent"
                options={filteredMembers}
                value={selectedMember}
                onChange={handleMemberSelection}
                placeholder="Select team members..."
              />
            </div>
          </div>

          {/* {role && (
            <div className="bg-gray-100 p-3 rounded-md">
              <p className="text-sm font-medium">Role of Assignee: {role}</p>
            </div>
          )} */}

          <div className="flex mt-4 flex-row-reverse justify-between">
            {loading ? (
              <Button
                disabled
                className="flex items-center gap-3"
                type="button"
              >
                <Loader className="w-4 h-4 animate-spin" />
                {initialData ? "Updating..." : "Submiting..."}
              </Button>
            ) : (
              <Button type="submit">
                {initialData ? "Update Task" : "Submit Task"}
              </Button>
            )}
          </div>
        </form>
      </>
    </div>
  );
};

export default TaskCreationForm;
