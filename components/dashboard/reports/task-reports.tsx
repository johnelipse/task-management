// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   Cell,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Progress } from "@/components/ui/progress";
// import { AlertTriangle, CheckCircle, Clock, Hourglass } from "lucide-react";
// import type { Department, Member, Task, Team } from "@prisma/client";

// export default function TasksReport({
//   departments,
//   tasks,
//   teamData,
//   members,
// }: {
//   departments: Department[];
//   tasks: Task[];
//   teamData: Team[];
//   members: Member[];
// }) {
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [priorityFilter, setPriorityFilter] = useState("all");
//   const [departmentFilter, setDepartmentFilter] = useState("all");

//   // Calculate task status counts
//   const statusCounts = {
//     completed: tasks.filter((task) => task.status === "Completed").length,
//     inProgress: tasks.filter((task) => task.status === "In Progress").length,
//     notStarted: tasks.filter((task) => task.status === "Not Started").length,
//     overdue: tasks.filter((task) => task.status === "Overdue").length,
//   };

//   // Calculate priority counts
//   const priorityCounts = {
//     high: tasks.filter((task) => task.priority === "High").length,
//     medium: tasks.filter((task) => task.priority === "Medium").length,
//     low: tasks.filter((task) => task.priority === "Low").length,
//   };

//   // Prepare data for pie charts
//   const statusPieData = [
//     { name: "Completed", value: statusCounts.completed, color: "#10b981" },
//     { name: "In Progress", value: statusCounts.inProgress, color: "#3b82f6" },
//     { name: "Not Started", value: statusCounts.notStarted, color: "#8b5cf6" },
//     { name: "Overdue", value: statusCounts.overdue, color: "#f97316" },
//   ];

//   const priorityPieData = [
//     { name: "High", value: priorityCounts.high, color: "#ef4444" },
//     { name: "Medium", value: priorityCounts.medium, color: "#f97316" },
//     { name: "Low", value: priorityCounts.low, color: "#3b82f6" },
//   ];

//   // Group tasks by date to prepare data for the area chart
//   // This assumes tasks have startDate in format "YYYY-MM-DD"
//   interface TasksByDate {
//     [key: string]: {
//       date: string;
//       completed: number;
//       inProgress: number;
//       notStarted: number;
//     };
//   }

//   const tasksByDate = tasks.reduce<TasksByDate>((acc, task) => {
//     // Extract month and day from the date string
//     const date = new Date(task.startDate);
//     const formattedDate = `${date.toLocaleString("default", {
//       month: "short",
//     })} ${date.getDate()}`;

//     if (!acc[formattedDate]) {
//       acc[formattedDate] = {
//         date: formattedDate,
//         completed: 0,
//         inProgress: 0,
//         notStarted: 0,
//       };
//     }

//     if (task.status === "Completed") acc[formattedDate].completed++;
//     else if (task.status === "In Progress") acc[formattedDate].inProgress++;
//     else if (task.status === "Not Started") acc[formattedDate].notStarted++;

//     return acc;
//   }, {});

//   // Convert to array and sort by date
//   const completionTimeData = Object.values(tasksByDate).sort(
//     (a: any, b: any) => {
//       return new Date(a.date).getTime() - new Date(b.date).getTime();
//     }
//   );

//   // Apply filters
//   const filteredTasks = tasks.filter((task) => {
//     return (
//       (statusFilter === "all" || task.status === statusFilter) &&
//       (priorityFilter === "all" || task.priority === priorityFilter) &&
//       (departmentFilter === "all" || task.department === departmentFilter)
//     );
//   });

//   // Get team name by teamId
//   const getTeamName = (teamId: string) => {
//     const team = teamData.find((t) => t.id === teamId);
//     return team ? team.name : "Unknown";
//   };

//   // Get member names by memberIds
//   const getMemberNames = (memberIds: string[]) => {
//     const assignedMembers = members.filter((m) => memberIds.includes(m.id));
//     return assignedMembers.map((m) => m.fullName).join(", ");
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between gap-4">
//         <h3 className="text-2xl font-bold">Tasks Report</h3>
//         <div className="flex flex-wrap gap-4">
//           <Select defaultValue="all" onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-[150px] bg-gray-950 border-gray-800">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-950 border-gray-800 text-slate-300">
//               <SelectItem value="all">All Statuses</SelectItem>
//               <SelectItem value="Completed">Completed</SelectItem>
//               <SelectItem value="In Progress">In Progress</SelectItem>
//               {/* <SelectItem value="Not Started">Not Started</SelectItem>
//               <SelectItem value="Overdue">Overdue</SelectItem> */}
//             </SelectContent>
//           </Select>

//           <Select defaultValue="all" onValueChange={setPriorityFilter}>
//             <SelectTrigger className="w-[150px] bg-gray-950 border-gray-800">
//               <SelectValue placeholder="Filter by priority" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-950 border-gray-800 text-slate-300">
//               <SelectItem value="all">All Priorities</SelectItem>
//               <SelectItem value="High">High</SelectItem>
//               <SelectItem value="Medium">Medium</SelectItem>
//               <SelectItem value="Low">Low</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select defaultValue="all" onValueChange={setDepartmentFilter}>
//             <SelectTrigger className="w-[150px] bg-gray-950 border-gray-800">
//               <SelectValue placeholder="Filter by department" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-950 border-gray-800 text-slate-300">
//               <SelectItem value="all">All Departments</SelectItem>
//               {departments.map((dept) => (
//                 <SelectItem key={dept.id} value={dept.name}>
//                   {dept.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Total Tasks
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {tasks.length}
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="text-slate-300">
//             <div className="text-sm text-blue-400 flex items-center">
//               <span>Across all departments</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Completed
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {statusCounts.completed}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-green-400 flex items-center">
//               <CheckCircle className="h-4 w-4 mr-1" />
//               <span>
//                 {Math.round((statusCounts.completed / tasks.length) * 100) || 0}
//                 % of total
//               </span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               In Progress
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {statusCounts.inProgress}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-blue-400 flex items-center">
//               <Hourglass className="h-4 w-4 mr-1" />
//               <span>Currently being worked on</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">Overdue</CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {statusCounts.overdue}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-orange-400 flex items-center">
//               <AlertTriangle className="h-4 w-4 mr-1" />
//               <span>Past deadline</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 md:grid-cols-3">
//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader>
//             <CardTitle>Task Status</CardTitle>
//             <CardDescription className="text-gray-400">
//               Distribution of tasks by status
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[200px] flex items-center justify-center">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={statusPieData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={40}
//                     outerRadius={80}
//                     paddingAngle={2}
//                     dataKey="value"
//                   >
//                     {statusPieData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value, name) => [`${value} tasks`, name]}
//                     contentStyle={{
//                       backgroundColor: "#1f1f1f",
//                       borderColor: "#333",
//                       borderRadius: "6px",
//                     }}
//                     itemStyle={{ color: "#fff" }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="flex justify-center gap-4 mt-2">
//               {statusPieData.map((entry, index) => (
//                 <div key={index} className="flex items-center gap-1">
//                   <div
//                     className="w-3 h-3 rounded-full"
//                     style={{ backgroundColor: entry.color }}
//                   ></div>
//                   <span className="text-xs text-gray-300">{entry.name}</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader>
//             <CardTitle>Task Priority</CardTitle>
//             <CardDescription className="text-gray-400">
//               Distribution of tasks by priority
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[200px] flex items-center justify-center">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={priorityPieData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={40}
//                     outerRadius={80}
//                     paddingAngle={2}
//                     dataKey="value"
//                   >
//                     {priorityPieData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value, name) => [`${value} tasks`, name]}
//                     contentStyle={{
//                       backgroundColor: "#1f1f1f",
//                       borderColor: "#333",
//                       borderRadius: "6px",
//                     }}
//                     itemStyle={{ color: "#fff" }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="flex justify-center gap-4 mt-2">
//               {priorityPieData.map((entry, index) => (
//                 <div key={index} className="flex items-center gap-1">
//                   <div
//                     className="w-3 h-3 rounded-full"
//                     style={{ backgroundColor: entry.color }}
//                   ></div>
//                   <span className="text-xs text-gray-300">{entry.name}</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader>
//             <CardTitle>Task Completion</CardTitle>
//             <CardDescription className="text-gray-400">
//               Task status over time
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[200px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart
//                   data={completionTimeData}
//                   margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#333"
//                     vertical={false}
//                   />
//                   <XAxis
//                     dataKey="date"
//                     tick={{ fill: "#888" }}
//                     axisLine={{ stroke: "#333" }}
//                     tickLine={{ stroke: "#333" }}
//                   />
//                   <YAxis
//                     tick={{ fill: "#888" }}
//                     axisLine={{ stroke: "#333" }}
//                     tickLine={{ stroke: "#333" }}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#1f1f1f",
//                       borderColor: "#333",
//                       borderRadius: "6px",
//                     }}
//                     itemStyle={{ color: "#fff" }}
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="completed"
//                     stackId="1"
//                     stroke="#10b981"
//                     fill="#10b981"
//                     fillOpacity={0.8}
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="inProgress"
//                     stackId="1"
//                     stroke="#3b82f6"
//                     fill="#3b82f6"
//                     fillOpacity={0.8}
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="notStarted"
//                     stackId="1"
//                     stroke="#8b5cf6"
//                     fill="#8b5cf6"
//                     fillOpacity={0.8}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="bg-gray-950 border-gray-800">
//         <CardHeader>
//           <CardTitle>Tasks Overview</CardTitle>
//           <CardDescription className="text-gray-400">
//             Showing {filteredTasks.length} of {tasks.length} tasks
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader className="bg-gray-900">
//               <TableRow className="hover:bg-gray-900 border-gray-800">
//                 <TableHead className="text-gray-300">Task</TableHead>
//                 <TableHead className="text-gray-300">Department</TableHead>
//                 <TableHead className="text-gray-300">Team</TableHead>
//                 <TableHead className="text-gray-300">Assigned To</TableHead>
//                 <TableHead className="text-gray-300">Priority</TableHead>
//                 <TableHead className="text-gray-300">Status</TableHead>
//                 <TableHead className="text-gray-300">Deadline</TableHead>
//                 <TableHead className="text-gray-300">Progress</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredTasks.map((task) => {
//                 // Calculate completion rate based on status
//                 let completionRate = 0;
//                 if (task.status === "Completed") completionRate = 100;
//                 else if (task.status === "In Progress") completionRate = 50;
//                 else if (task.status === "Overdue") completionRate = 75;

//                 return (
//                   <TableRow
//                     key={task.id}
//                     className="hover:bg-gray-900 border-gray-800"
//                   >
//                     <TableCell className="font-medium">
//                       {task.taskName}
//                     </TableCell>
//                     <TableCell>{task.department}</TableCell>
//                     <TableCell>{getTeamName(task.teamId)}</TableCell>
//                     <TableCell>{getMemberNames(task.memberIds)}</TableCell>
//                     <TableCell>
//                       <Badge
//                         className={`
//                         ${
//                           task.priority === "High"
//                             ? "bg-red-900 text-red-300 hover:bg-red-900"
//                             : task.priority === "Medium"
//                             ? "bg-orange-900 text-orange-300 hover:bg-orange-900"
//                             : task.priority ===
//                               "blue-900 text-blue-300 hover:bg-blue-900"
//                         }
//                       `}
//                       >
//                         {task.priority}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         className={`
//                         ${
//                           task.status === "Completed"
//                             ? "bg-green-900 text-green-300 hover:bg-green-900"
//                             : task.status === "In Progress"
//                             ? "bg-blue-900 text-blue-300 hover:bg-blue-900"
//                             : task.status === "Not Started"
//                             ? "bg-purple-900 text-purple-300 hover:bg-purple-900"
//                             : "bg-orange-900 text-orange-300 hover:bg-orange-900"
//                         }
//                       `}
//                       >
//                         {task.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center">
//                         {task.status === "Overdue" && (
//                           <Clock className="h-4 w-4 mr-1 text-orange-400" />
//                         )}
//                         {task.endDate}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="w-full">
//                         <Progress
//                           value={completionRate}
//                           className={`h-2 bg-gray-800 [&>div]:${
//                             completionRate === 100
//                               ? "bg-green-500"
//                               : completionRate >= 50
//                               ? "bg-blue-500"
//                               : "bg-purple-500"
//                           }`}
//                         />
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, Hourglass } from "lucide-react";
import type { Department, Member, Task, Team } from "@prisma/client";

export default function TasksReport({
  departments,
  tasks,
  teamData,
  members,
}: {
  departments: Department[];
  tasks: Task[];
  teamData: Team[];
  members: Member[];
}) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Calculate task status counts
  const statusCounts = {
    completed: tasks.filter((task) => task.status === "Completed").length,
    inProgress: tasks.filter((task) => task.status === "In Progress").length,
    notStarted: tasks.filter((task) => task.status === "Not Started").length,
    overdue: tasks.filter((task) => task.status === "Overdue").length,
  };

  // Calculate priority counts
  const priorityCounts = {
    high: tasks.filter((task) => task.priority === "High").length,
    medium: tasks.filter((task) => task.priority === "Medium").length,
    low: tasks.filter((task) => task.priority === "Low").length,
  };

  // Prepare data for pie charts
  const statusPieData = [
    { name: "Completed", value: statusCounts.completed, color: "#10b981" },
    { name: "In Progress", value: statusCounts.inProgress, color: "#3b82f6" },
    { name: "Not Started", value: statusCounts.notStarted, color: "#8b5cf6" },
    { name: "Overdue", value: statusCounts.overdue, color: "#f97316" },
  ];

  const priorityPieData = [
    { name: "High", value: priorityCounts.high, color: "#ef4444" },
    { name: "Medium", value: priorityCounts.medium, color: "#f97316" },
    { name: "Low", value: priorityCounts.low, color: "#3b82f6" },
  ];

  // Group tasks by date to prepare data for the area chart
  // This assumes tasks have startDate in format "YYYY-MM-DD"
  interface TasksByDate {
    [key: string]: {
      date: string;
      completed: number;
      inProgress: number;
      notStarted: number;
    };
  }

  const tasksByDate = tasks.reduce<TasksByDate>((acc, task) => {
    // Extract month and day from the date string
    const date = new Date(task.startDate);
    const formattedDate = `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()}`;

    if (!acc[formattedDate]) {
      acc[formattedDate] = {
        date: formattedDate,
        completed: 0,
        inProgress: 0,
        notStarted: 0,
      };
    }

    if (task.status === "Completed") acc[formattedDate].completed++;
    else if (task.status === "In Progress") acc[formattedDate].inProgress++;
    else if (task.status === "Not Started") acc[formattedDate].notStarted++;

    return acc;
  }, {});

  // Convert to array and sort by date
  const completionTimeData = Object.values(tasksByDate).sort(
    (a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  );

  // Apply filters
  const filteredTasks = tasks.filter((task) => {
    return (
      (statusFilter === "all" || task.status === statusFilter) &&
      (priorityFilter === "all" || task.priority === priorityFilter) &&
      (departmentFilter === "all" || task.department === departmentFilter)
    );
  });

  // Get team name by teamId
  const getTeamName = (teamId: string) => {
    const team = teamData.find((t) => t.id === teamId);
    return team ? team.name : "Unknown";
  };

  // Get member names by memberIds
  const getMemberNames = (memberIds: string[]) => {
    const assignedMembers = members.filter((m) => memberIds.includes(m.id));
    return assignedMembers.map((m) => m.fullName).join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h3 className="text-2xl font-bold">Tasks Report</h3>
        <div className="flex flex-wrap gap-4">
          <Select defaultValue="all" onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-gray-950 border-gray-800">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-950 border-gray-800 text-slate-300">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px] bg-gray-950 border-gray-800">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent className="bg-gray-950 border-gray-800 text-slate-300">
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[150px] bg-gray-950 border-gray-800">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent className="bg-gray-950 border-gray-800 text-slate-300">
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.name}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-950 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">
              Total Tasks
            </CardDescription>
            <CardTitle className="text-2xl text-slate-300">
              {tasks.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300">
            <div className="text-sm text-blue-400 flex items-center">
              <span>Across all departments</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-950 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">
              Completed
            </CardDescription>
            <CardTitle className="text-2xl text-slate-300">
              {statusCounts.completed}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-400 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>
                {Math.round((statusCounts.completed / tasks.length) * 100) || 0}
                % of total
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-950 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">
              In Progress
            </CardDescription>
            <CardTitle className="text-2xl text-slate-300">
              {statusCounts.inProgress}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-blue-400 flex items-center">
              <Hourglass className="h-4 w-4 mr-1" />
              <span>Currently being worked on</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-950 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Overdue</CardDescription>
            <CardTitle className="text-2xl text-slate-300">
              {statusCounts.overdue}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-orange-400 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>Past deadline</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        <Card className="bg-gray-950 border-gray-800">
          <CardHeader>
            <CardTitle>Task Status</CardTitle>
            <CardDescription className="text-gray-400">
              Distribution of tasks by status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} tasks`, name]}
                    contentStyle={{
                      backgroundColor: "#1f1f1f",
                      borderColor: "#333",
                      borderRadius: "6px",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {statusPieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-xs text-gray-300">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-950 border-gray-800">
          <CardHeader>
            <CardTitle>Task Priority</CardTitle>
            <CardDescription className="text-gray-400">
              Distribution of tasks by priority
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie
                    data={priorityPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {priorityPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} tasks`, name]}
                    contentStyle={{
                      backgroundColor: "#1f1f1f",
                      borderColor: "#333",
                      borderRadius: "6px",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {priorityPieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-xs text-gray-300">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-950 border-gray-800">
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription className="text-gray-400">
              Task status over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart
                  data={completionTimeData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#333"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#888" }}
                    axisLine={{ stroke: "#333" }}
                    tickLine={{ stroke: "#333" }}
                  />
                  <YAxis
                    tick={{ fill: "#888" }}
                    axisLine={{ stroke: "#333" }}
                    tickLine={{ stroke: "#333" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f1f1f",
                      borderColor: "#333",
                      borderRadius: "6px",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="inProgress"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="notStarted"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-950 border-gray-800">
        <CardHeader>
          <CardTitle>Tasks Overview</CardTitle>
          <CardDescription className="text-gray-400">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-6 px-6">
            <Table>
              <TableHeader className="bg-gray-900">
                <TableRow className="hover:bg-gray-900 border-gray-800">
                  <TableHead className="text-gray-300">Task</TableHead>
                  <TableHead className="text-gray-300">Department</TableHead>
                  <TableHead className="text-gray-300">Team</TableHead>
                  <TableHead className="text-gray-300">Assigned To</TableHead>
                  <TableHead className="text-gray-300">Priority</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Deadline</TableHead>
                  <TableHead className="text-gray-300">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => {
                  // Calculate completion rate based on status
                  let completionRate = 0;
                  if (task.status === "Completed") completionRate = 100;
                  else if (task.status === "In Progress") completionRate = 50;
                  else if (task.status === "Overdue") completionRate = 75;

                  return (
                    <TableRow
                      key={task.id}
                      className="hover:bg-gray-900 border-gray-800"
                    >
                      <TableCell className="font-medium">
                        {task.taskName}
                      </TableCell>
                      <TableCell>{task.department}</TableCell>
                      <TableCell>{getTeamName(task.teamId)}</TableCell>
                      <TableCell>{getMemberNames(task.memberIds)}</TableCell>
                      <TableCell>
                        <Badge
                          className={`
                        ${
                          task.priority === "High"
                            ? "bg-red-900 text-red-300 hover:bg-red-900"
                            : task.priority === "Medium"
                            ? "bg-orange-900 text-orange-300 hover:bg-orange-900"
                            : task.priority ===
                              "blue-900 text-blue-300 hover:bg-blue-900"
                        }
                      `}
                        >
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`
                        ${
                          task.status === "Completed"
                            ? "bg-green-900 text-green-300 hover:bg-green-900"
                            : task.status === "In Progress"
                            ? "bg-blue-900 text-blue-300 hover:bg-blue-900"
                            : task.status === "Not Started"
                            ? "bg-purple-900 text-purple-300 hover:bg-purple-900"
                            : "bg-orange-900 text-orange-300 hover:bg-orange-900"
                        }
                      `}
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {task.status === "Overdue" && (
                            <Clock className="h-4 w-4 mr-1 text-orange-400" />
                          )}
                          {task.endDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full">
                          <Progress
                            value={completionRate}
                            className={`h-2 bg-gray-800 [&>div]:${
                              completionRate === 100
                                ? "bg-green-500"
                                : completionRate >= 50
                                ? "bg-blue-500"
                                : "bg-purple-500"
                            }`}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
