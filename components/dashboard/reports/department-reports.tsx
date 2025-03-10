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
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ArrowUpRight, Users } from "lucide-react";
// import { Department, Task, Team } from "@prisma/client";

// // Mock data for departments
// const departmentsData = [
//   {
//     id: 1,
//     name: "Engineering",
//     totalTasks: 245,
//     completedTasks: 187,
//     activeTeams: 5,
//     pendingTasks: 58,
//     efficiency: 76,
//   },
//   {
//     id: 2,
//     name: "Marketing",
//     totalTasks: 178,
//     completedTasks: 142,
//     activeTeams: 3,
//     pendingTasks: 36,
//     efficiency: 80,
//   },
//   {
//     id: 3,
//     name: "Design",
//     totalTasks: 156,
//     completedTasks: 134,
//     activeTeams: 2,
//     pendingTasks: 22,
//     efficiency: 86,
//   },
//   {
//     id: 4,
//     name: "Product",
//     totalTasks: 210,
//     completedTasks: 175,
//     activeTeams: 4,
//     pendingTasks: 35,
//     efficiency: 83,
//   },
//   {
//     id: 5,
//     name: "Sales",
//     totalTasks: 189,
//     completedTasks: 132,
//     activeTeams: 3,
//     pendingTasks: 57,
//     efficiency: 70,
//   },
//   {
//     id: 6,
//     name: "Customer Support",
//     totalTasks: 167,
//     completedTasks: 145,
//     activeTeams: 2,
//     pendingTasks: 22,
//     efficiency: 87,
//   },
// ];

// const taskDistributionData = departmentsData.map((dept) => ({
//   name: dept.name,
//   completed: dept.completedTasks,
//   pending: dept.pendingTasks,
// }));

// const pieChartData = departmentsData.map((dept) => ({
//   name: dept.name,
//   value: dept.totalTasks,
// }));

// const COLORS = [
//   "#4f46e5",
//   "#8b5cf6",
//   "#ec4899",
//   "#10b981",
//   "#3b82f6",
//   "#f97316",
// ];

// export default function DepartmentsReport({
//   departments,
//   tasks,
//   teamData,
// }: {
//   departments: Department[];
//   tasks: Task[];
//   teamData: Team[];
// }) {
//   const team = teamData.find((team) => team.id === tasks[0]?.teamId); // Find a team with matching ID
//   const teamWithTask = tasks.filter((task) => task.teamId === team?.id);
//   console.log(teamWithTask);

//   const taskDistribution = departmentsData.map((dept) => ({
//     name: dept.name,
//     completed: dept.completedTasks,
//     pending: dept.pendingTasks,
//   }));

//   const [filter, setFilter] = useState("all");
//   const completedTasks = tasks.filter(
//     (task) => task.status === "Completed"
//   ).length;
//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between gap-4">
//         <h3 className="text-2xl font-bold">Departments Report</h3>
//         <div className="flex gap-4">
//           <Select defaultValue="all" onValueChange={setFilter}>
//             <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-950 border-gray-800">
//               <SelectItem value="all">All Departments</SelectItem>
//               <SelectItem value="high-performing">High Performing</SelectItem>
//               <SelectItem value="low-performing">Low Performing</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Total Departments
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {departments.length}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-green-400 flex items-center">
//               <ArrowUpRight className="h-4 w-4 mr-1" />
//               <span>Active and operational</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Total Tasks
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {tasks.length}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-blue-400 flex items-center">
//               <span>Across all departments</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Completed Tasks
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {completedTasks}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-purple-400 flex items-center">
//               <span>
//                 {Math.round((completedTasks / tasks.length) * 100)}% completion
//                 rate
//               </span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Active Teams
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {teamData.length}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-cyan-400 flex items-center">
//               <Users className="h-4 w-4 mr-1" />
//               <span>Working on projects</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader>
//             <CardTitle>Task Distribution</CardTitle>
//             <CardDescription className="text-gray-400">
//               Completed vs Pending Tasks by Department
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <ChartContainer
//                 config={{
//                   completed: {
//                     label: "Completed",
//                     color: "hsl(var(--chart-1))",
//                   },
//                   pending: {
//                     label: "Pending",
//                     color: "hsl(var(--chart-2))",
//                   },
//                 }}
//               >
//                 <BarChart
//                   data={taskDistributionData}
//                   margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#333"
//                     vertical={false}
//                   />
//                   <XAxis
//                     dataKey="name"
//                     tick={{ fill: "#888" }}
//                     axisLine={{ stroke: "#333" }}
//                     tickLine={{ stroke: "#333" }}
//                     tickFormatter={(value) => value.substring(0, 3)}
//                   />
//                   <YAxis
//                     tick={{ fill: "#888" }}
//                     axisLine={{ stroke: "#333" }}
//                     tickLine={{ stroke: "#333" }}
//                   />
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                   <Bar
//                     dataKey="completed"
//                     fill="var(--color-completed)"
//                     radius={[4, 4, 0, 0]}
//                   />
//                   <Bar
//                     dataKey="pending"
//                     fill="var(--color-pending)"
//                     radius={[4, 4, 0, 0]}
//                   />
//                 </BarChart>
//               </ChartContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader>
//             <CardTitle>Task Volume by Department</CardTitle>
//             <CardDescription className="text-gray-400">
//               Distribution of total tasks across departments
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px] flex items-center justify-center">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={pieChartData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={100}
//                     paddingAngle={2}
//                     dataKey="value"
//                     label={({ name, percent }) =>
//                       `${name} (${(percent * 100).toFixed(0)}%)`
//                     }
//                     labelLine={{ stroke: "#555", strokeWidth: 1 }}
//                   >
//                     {pieChartData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value, name, props) => [
//                       `${value} tasks`,
//                       props.payload.name,
//                     ]}
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
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="bg-gray-950 border-gray-800">
//         <CardHeader>
//           <CardTitle>Departments Overview</CardTitle>
//           <CardDescription className="text-gray-400">
//             Detailed metrics for all departments
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader className="bg-gray-900">
//               <TableRow className="hover:bg-gray-900 border-gray-800">
//                 <TableHead className="text-gray-300">Department</TableHead>
//                 <TableHead className="text-gray-300">Total Tasks</TableHead>
//                 <TableHead className="text-gray-300">Completed</TableHead>
//                 <TableHead className="text-gray-300">Pending</TableHead>
//                 <TableHead className="text-gray-300">Active Teams</TableHead>
//                 <TableHead className="text-gray-300">Efficiency</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {departmentsData.map((dept) => (
//                 <TableRow
//                   key={dept.id}
//                   className="hover:bg-gray-900 border-gray-800"
//                 >
//                   <TableCell className="font-medium">{dept.name}</TableCell>
//                   <TableCell>{dept.totalTasks}</TableCell>
//                   <TableCell>{dept.completedTasks}</TableCell>
//                   <TableCell>{dept.pendingTasks}</TableCell>
//                   <TableCell>{dept.activeTeams}</TableCell>
//                   <TableCell>
//                     <Badge
//                       className={`
//                       ${
//                         dept.efficiency >= 85
//                           ? "bg-green-900 text-green-300 hover:bg-green-900"
//                           : dept.efficiency >= 75
//                           ? "bg-blue-900 text-blue-300 hover:bg-blue-900"
//                           : "bg-orange-900 text-orange-300 hover:bg-orange-900"
//                       }
//                     `}
//                     >
//                       {dept.efficiency}%
//                     </Badge>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// "use client";

// import { useState, useMemo } from "react";
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
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ArrowUpRight, Users } from "lucide-react";
// import { Department, Task, Team } from "@prisma/client";

// const COLORS = [
//   "#4f46e5",
//   "#8b5cf6",
//   "#ec4899",
//   "#10b981",
//   "#3b82f6",
//   "#f97316",
// ];

// export default function DepartmentsReport({
//   departments,
//   tasks,
//   teamData,
// }: {
//   departments: Department[];
//   tasks: Task[];
//   teamData: Team[];
// }) {
//   const [filter, setFilter] = useState("all");

//   // Calculate department metrics from actual data
//   const departmentMetrics = useMemo(() => {
//     return departments.map((department) => {
//       // Find all teams for this department
//       // const departmentTeams = teamData.filter(
//       //   (team) => team.departmentId === department.id
//       // );
//       // const departmentTeamIds = departmentTeams.map((team) => team.id);

//       // Find all tasks for this department's teams
//       // const departmentTasks = tasks.filter(
//       //   (task) =>
//       //     departmentTeamIds.includes(task.teamId) ||
//       //     task.department === department.name
//       // );

//       // const completedTasks = departmentTasks.filter(
//       //   (task) => task.status === "Completed"
//       // ).length;
//       // const pendingTasks = departmentTasks.length - completedTasks;
//       // const efficiency =
//       //   departmentTasks.length > 0
//       //     ? Math.round((completedTasks / departmentTasks.length) * 100)
//       //     : 0;

//       return {
//         id: department.id,
//         name: department.name,
//         totalTasks: departmentTasks.length,
//         completedTasks: completedTasks,
//         pendingTasks: pendingTasks,
//         activeTeams: departmentTeams.length,
//         efficiency: efficiency,
//       };
//     });
//   }, [departments, teamData, tasks]);

//   // Filter departments based on selected filter
//   const filteredDepartments = useMemo(() => {
//     if (filter === "all") return departmentMetrics;
//     if (filter === "high-performing")
//       return departmentMetrics.filter((dept) => dept.efficiency >= 80);
//     if (filter === "low-performing")
//       return departmentMetrics.filter((dept) => dept.efficiency < 80);
//     return departmentMetrics;
//   }, [departmentMetrics, filter]);

//   // Prepare data for charts
//   const taskDistributionData = useMemo(() => {
//     return departmentMetrics.map((dept) => ({
//       name: dept.name,
//       completed: dept.completedTasks,
//       pending: dept.pendingTasks,
//     }));
//   }, [departmentMetrics]);

//   const pieChartData = useMemo(() => {
//     return departmentMetrics.map((dept) => ({
//       name: dept.name,
//       value: dept.totalTasks,
//     }));
//   }, [departmentMetrics]);

//   // Overall metrics
//   const completedTasks = tasks.filter(
//     (task) => task.status === "Completed"
//   ).length;

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between gap-4">
//         <h3 className="text-2xl font-bold">Departments Report</h3>
//         <div className="flex gap-4">
//           <Select defaultValue="all" onValueChange={setFilter}>
//             <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-950 border-gray-800">
//               <SelectItem value="all">All Departments</SelectItem>
//               <SelectItem value="high-performing">High Performing</SelectItem>
//               <SelectItem value="low-performing">Low Performing</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Total Departments
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {departments.length}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-green-400 flex items-center">
//               <ArrowUpRight className="h-4 w-4 mr-1" />
//               <span>Active and operational</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Total Tasks
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {tasks.length}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-blue-400 flex items-center">
//               <span>Across all departments</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Completed Tasks
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {completedTasks}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-purple-400 flex items-center">
//               <span>
//                 {tasks.length > 0
//                   ? Math.round((completedTasks / tasks.length) * 100)
//                   : 0}
//                 % completion rate
//               </span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Active Teams
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {teamData.length}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-cyan-400 flex items-center">
//               <Users className="h-4 w-4 mr-1" />
//               <span>Working on projects</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader>
//             <CardTitle>Task Distribution</CardTitle>
//             <CardDescription className="text-gray-400">
//               Completed vs Pending Tasks by Department
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[150px] md:h-[300px]">
//               <ChartContainer
//                 config={{
//                   completed: {
//                     label: "Completed",
//                     color: "hsl(var(--chart-1))",
//                   },
//                   pending: {
//                     label: "Pending",
//                     color: "hsl(var(--chart-2))",
//                   },
//                 }}
//               >
//                 <BarChart
//                   data={taskDistributionData}
//                   margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#333"
//                     vertical={false}
//                   />
//                   <XAxis
//                     dataKey="name"
//                     tick={{ fill: "#888" }}
//                     axisLine={{ stroke: "#333" }}
//                     tickLine={{ stroke: "#333" }}
//                     tickFormatter={(value) => value.substring(0, 3)}
//                   />
//                   <YAxis
//                     tick={{ fill: "#888" }}
//                     axisLine={{ stroke: "#333" }}
//                     tickLine={{ stroke: "#333" }}
//                   />
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                   <Bar
//                     dataKey="completed"
//                     fill="var(--color-completed)"
//                     radius={[4, 4, 0, 0]}
//                   />
//                   <Bar
//                     dataKey="pending"
//                     fill="var(--color-pending)"
//                     radius={[4, 4, 0, 0]}
//                   />
//                 </BarChart>
//               </ChartContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader>
//             <CardTitle>Task Volume by Department</CardTitle>
//             <CardDescription className="text-gray-400">
//               Distribution of total tasks across departments
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px] flex items-center justify-center">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={pieChartData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={50}
//                     outerRadius={80}
//                     paddingAngle={1}
//                     dataKey="value"
//                     label={({ name }) =>
//                       name
//                         .split(" ")
//                         .map((word: string) => word[0])
//                         .join("")
//                         .toUpperCase()
//                     }
//                     labelLine={{ stroke: "#555", strokeWidth: 1 }}
//                   >
//                     {pieChartData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value, name, props) => [
//                       `${value} tasks`,
//                       props.payload.name,
//                     ]}
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
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="bg-gray-950 border-gray-800">
//         <CardHeader>
//           <CardTitle>Departments Overview</CardTitle>
//           <CardDescription className="text-gray-400">
//             Detailed metrics for all departments
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader className="bg-gray-900">
//               <TableRow className="hover:bg-gray-900 border-gray-800">
//                 <TableHead className="text-gray-300">Department</TableHead>
//                 <TableHead className="text-gray-300">Total Tasks</TableHead>
//                 <TableHead className="text-gray-300">Completed</TableHead>
//                 <TableHead className="text-gray-300">Pending</TableHead>
//                 <TableHead className="text-gray-300">Active Teams</TableHead>
//                 <TableHead className="text-gray-300">Efficiency</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredDepartments.map((dept) => (
//                 <TableRow
//                   key={dept.id}
//                   className="hover:bg-gray-900 border-gray-800"
//                 >
//                   <TableCell className="font-medium">{dept.name}</TableCell>
//                   <TableCell>{dept.totalTasks}</TableCell>
//                   <TableCell>{dept.completedTasks}</TableCell>
//                   <TableCell>{dept.pendingTasks}</TableCell>
//                   <TableCell>{dept.activeTeams}</TableCell>
//                   <TableCell>
//                     <Badge
//                       className={`
//                       ${
//                         dept.efficiency >= 85
//                           ? "bg-green-900 text-green-300 hover:bg-green-900"
//                           : dept.efficiency >= 75
//                           ? "bg-blue-900 text-blue-300 hover:bg-blue-900"
//                           : "bg-orange-900 text-orange-300 hover:bg-orange-900"
//                       }
//                     `}
//                     >
//                       {dept.efficiency}%
//                     </Badge>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
