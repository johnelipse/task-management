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
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { CheckCircle, Clock, Star, Users } from "lucide-react";
// import type { Department, Task, Team } from "@prisma/client";

// export default function MembersReport({
//   departments,
//   tasks,
//   teamData,
// }: {
//   departments: Department[];
//   tasks: Task[];
//   teamData: Team[];
// }) {
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [departmentFilter, setDepartmentFilter] = useState("all");
//   const [performanceFilter, setPerformanceFilter] = useState("all");

//   // Calculate task assignments and completion for each member
//   // const memberTaskStats = members.map((member) => {
//   //   const memberTasks = tasks.filter((task) =>
//   //     // task.memberIds.includes(member.id)
//   //   );
//   // const completedTasks = memberTasks.filter(
//   //   (task) => task.status === "Completed"
//   // );
//   // const overdueTasks = memberTasks.filter(
//   //   // (task) => task.status === "Overdue"
//   // );

//   // Calculate completion rate and performance
//   // const completionRate =
//   //   memberTasks.length > 0
//   //     ? Math.round((completedTasks.length / memberTasks.length) * 100)
//   //     : 0;

//   // Performance is a weighted score based on completion rate and other factors
//   // For simplicity, we'll use completion rate with a small random factor
//   // const performance = Math.min(
//   //   100,
//   //   Math.round(completionRate * (1 + Math.random() * 0.2))
//   // );

//   //   return {
//   //     ...member,
//   //     assignedTasks: memberTasks.length,
//   //     completedTasks: completedTasks.length,
//   //     // overdueTasks: overdueTasks.length,
//   //     completionRate,
//   //     performance,
//   //   };
//   // });

//   // Calculate member statistics
//   // const memberStats = {
//   //   total: members.length,
//   //   totalAssigned: memberTaskStats.reduce(
//   //     (acc, member) => acc + member.assignedTasks,
//   //     0
//   //   ),
//   //   totalCompleted: memberTaskStats.reduce(
//   //     (acc, member) => acc + member.completedTasks,
//   //     0
//   //   ),
//   //   totalOverdue: memberTaskStats.reduce(
//   //     (acc, member) => acc + member.overdueTasks,
//   //     0
//   //   ),
//   // };

//   // Prepare data for charts
//   // const completionRateData = memberTaskStats
//   //   .filter((member) => member.assignedTasks > 0)
//   //   .map((member) => ({
//   //     name: member.fullName.split(" ")[0],
//   //     completionRate: member.completionRate,
//   //   }));

//   // const performanceData = memberTaskStats
//   //   .filter((member) => member.assignedTasks > 0)
//   //   .map((member) => ({
//   //     name: member.fullName.split(" ")[0],
//   //     performance: member.performance,
//   //   }));

//   // Prepare data for department distribution
//   const departmentCounts = departments
//     .map((dept) => {
//       const count = members.filter((m) => m.department === dept.name).length;
//       return {
//         name: dept.name,
//         value: count,
//       };
//     })
//     .filter((dept) => dept.value > 0);

//   const COLORS = [
//     "#4f46e5",
//     "#8b5cf6",
//     "#ec4899",
//     "#10b981",
//     "#f97316",
//     "#ef4444",
//   ];

//   // Get unique job titles for role filter
//   const uniqueRoles = [...new Set(members.map((m) => m.jobTitle))];

//   // Apply filters
//   // const filteredMembers = memberTaskStats.filter((member) => {
//   //   return (
//   //     (roleFilter === "all" || member.jobTitle === roleFilter) &&
//   //     (departmentFilter === "all" || member.department === departmentFilter) &&
//   //     (performanceFilter === "all" ||
//   //       (performanceFilter === "high" && member.performance >= 90) ||
//   //       (performanceFilter === "medium" &&
//   //         member.performance >= 80 &&
//   //         member.performance < 90) ||
//   //       (performanceFilter === "low" && member.performance < 80))
//   //   );
//   // });

//   // Generate recent activity based on tasks
//   // const recentActivity = tasks
//   //   .filter((task) => task.status !== "Not Started")
//   //   .map((task) => {
//   //     const assignedMembers = members.filter((m) =>
//   //       task.memberIds.includes(m.id)
//   //     );
//   //     if (assignedMembers.length === 0) return null;

//   //     const member = assignedMembers[0];
//   //     let action = "Started task";
//   //     let timeAgo = "recently";

//   //     if (task.status === "Completed") {
//   //       action = "Completed task";
//   //       // Convert endDate to relative time
//   //       const endDate = new Date(task.endDate);
//   //       const now = new Date();
//   //       const diffDays = Math.round(
//   //         (now.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24)
//   //       );

//   //       if (diffDays <= 0) timeAgo = "today";
//   //       else if (diffDays === 1) timeAgo = "1 day ago";
//   //       else if (diffDays < 7) timeAgo = `${diffDays} days ago`;
//   //       else timeAgo = "over a week ago";
//   //     } else if (task.status === "In Progress") {
//   //       // Convert startDate to relative time
//   //       const startDate = new Date(task.startDate);
//   //       const now = new Date();
//   //       const diffDays = Math.round(
//   //         (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
//   //       );

//   //       if (diffDays <= 0) timeAgo = "today";
//   //       else if (diffDays === 1) timeAgo = "1 day ago";
//   //       else if (diffDays < 7) timeAgo = `${diffDays} days ago`;
//   //       else timeAgo = "over a week ago";
//   //     } else if (task.status === "Overdue") {
//   //       action = "Working on";
//   //       timeAgo = "overdue task";
//   //     }

//   //     return {
//   //       member: member.fullName,
//   //       memberInitials: member.fullName
//   //         .split(" ")
//   //         .map((n) => n[0])
//   //         .join(""),
//   //       action,
//   //       task: task.taskName,
//   //       time: timeAgo,
//   //     };
//   //   })
//   //   .filter(Boolean)
//   //   .slice(0, 8);

//   // Get team name by member
//   const getTeamName = (member: Member) => {
//     if (!member.teamId) return "Unassigned";
//     const team = teamData.find((t) => t.id === member.teamId);
//     return team ? team.name : "Unknown";
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between gap-4">
//         <h3 className="text-2xl font-bold">Members Report</h3>
//         <div className="flex flex-wrap gap-4">
//           <Select defaultValue="all" onValueChange={setRoleFilter}>
//             <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800">
//               <SelectValue placeholder="Filter by role" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-950 border-gray-800 text-slate-200">
//               <SelectItem value="all">All Roles</SelectItem>
//               {uniqueRoles.map((role) => (
//                 <SelectItem key={role} value={role}>
//                   {role}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select defaultValue="all" onValueChange={setDepartmentFilter}>
//             <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800">
//               <SelectValue placeholder="Filter by department" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-950 border-gray-800 text-slate-200">
//               <SelectItem value="all">All Departments</SelectItem>
//               {departments.map((dept) => (
//                 <SelectItem key={dept.id} value={dept.name}>
//                   {dept.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select defaultValue="all" onValueChange={setPerformanceFilter}>
//             <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800">
//               <SelectValue placeholder="Filter by performance" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-950 border-gray-800 text-slate-200">
//               <SelectItem value="all">All Performance</SelectItem>
//               <SelectItem value="high">High (90%+)</SelectItem>
//               <SelectItem value="medium">Medium (80-89%)</SelectItem>
//               <SelectItem value="low">Low (Below 80%)</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Total Members
//             </CardDescription>
//             {/* <CardTitle className="text-2xl text-slate-200">
//               {memberStats.total}
//             </CardTitle> */}
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-blue-400 flex items-center">
//               <Users className="h-4 w-4 mr-1" />
//               <span>Active team members</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Assigned Tasks
//             </CardDescription>
//             {/* <CardTitle className="text-2xl text-slate-200">
//               {memberStats.totalAssigned}
//             </CardTitle> */}
//           </CardHeader>
//           {/* <CardContent>
//             <div className="text-sm text-purple-400 flex items-center">
//               <span>
//                 Avg{" "}
//                 {Math.round(memberStats.totalAssigned / memberStats.total) || 0}{" "}
//                 per member
//               </span>
//             </div>
//           </CardContent> */}
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Completed Tasks
//             </CardDescription>
//             {/* <CardTitle className="text-2xl text-slate-200">
//               {memberStats.totalCompleted}
//             </CardTitle> */}
//           </CardHeader>
//           {/* <CardContent>
//             <div className="text-sm text-green-400 flex items-center">
//               <CheckCircle className="h-4 w-4 mr-1" />
//               <span>
//                 {memberStats.totalAssigned > 0
//                   ? Math.round(
//                       (memberStats.totalCompleted / memberStats.totalAssigned) *
//                         100
//                     )
//                   : 0}
//                 % completion rate
//               </span>
//             </div>
//           </CardContent> */}
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Overdue Tasks
//             </CardDescription>
//             {/* <CardTitle className="text-2xl text-slate-200">
//               {memberStats.totalOverdue}
//             </CardTitle> */}
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-orange-400 flex items-center">
//               <Clock className="h-4 w-4 mr-1" />
//               <span>Require attention</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader>
//             <CardTitle>Completion Rates</CardTitle>
//             <CardDescription className="text-gray-400">
//               Task completion percentage by member
//             </CardDescription>
//           </CardHeader>
//           {/* <CardContent>
//             <div className="h-[250px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={completionRateData}
//                   margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
//                   layout="vertical"
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#333"
//                     horizontal={true}
//                     vertical={false}
//                   />
//                   <XAxis
//                     type="number"
//                     domain={[0, 100]}
//                     tick={{ fill: "#888" }}
//                     axisLine={{ stroke: "#333" }}
//                     tickLine={{ stroke: "#333" }}
//                   />
//                   <YAxis
//                     dataKey="name"
//                     type="category"
//                     tick={{ fill: "#888" }}
//                     axisLine={{ stroke: "#333" }}
//                     tickLine={{ stroke: "#333" }}
//                   />
//                   <Tooltip
//                     formatter={(value) => [`${value}%`, "Completion Rate"]}
//                     contentStyle={{
//                       backgroundColor: "#1f1f1f",
//                       borderColor: "#333",
//                       borderRadius: "6px",
//                     }}
//                     itemStyle={{ color: "#fff" }}
//                   />
//                   <Bar
//                     dataKey="completionRate"
//                     fill="#8b5cf6"
//                     radius={[0, 4, 4, 0]}
//                     label={{ position: "right", fill: "#888", fontSize: 12 }}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent> */}
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader>
//             <CardTitle>Performance Ratings</CardTitle>
//             <CardDescription className="text-gray-400">
//               Overall performance score by member
//             </CardDescription>
//           </CardHeader>
//           {/* <CardContent>
//             <div className="h-[250px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={performanceData}
//                   margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
//                   layout="vertical"
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#333"
//                     horizontal={true}
//                     vertical={false}
//                   />
//                   <XAxis
//                     type="number"
//                     domain={[0, 100]}
//                     tick={{ fill: "#888" }}
//                     axisLine={{ stroke: "#333" }}
//                     tickLine={{ stroke: "#333" }}
//                   />
//                   <YAxis
//                     dataKey="name"
//                     type="category"
//                     tick={{ fill: "#888" }}
//                     axisLine={{ stroke: "#333" }}
//                     tickLine={{ stroke: "#333" }}
//                   />
//                   <Tooltip
//                     formatter={(value) => [`${value}%`, "Performance"]}
//                     contentStyle={{
//                       backgroundColor: "#1f1f1f",
//                       borderColor: "#333",
//                       borderRadius: "6px",
//                     }}
//                     itemStyle={{ color: "#fff" }}
//                   />
//                   <Bar
//                     dataKey="performance"
//                     fill="#10b981"
//                     radius={[0, 4, 4, 0]}
//                     label={{ position: "right", fill: "#888", fontSize: 12 }}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent> */}
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader>
//             <CardTitle>Department Distribution</CardTitle>
//             <CardDescription className="text-gray-400">
//               Members by department
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[250px] flex items-center justify-center">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={departmentCounts}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={90}
//                     paddingAngle={2}
//                     dataKey="value"
//                     label={({ name, percent }) =>
//                       `${name} (${(percent * 100).toFixed(0)}%)`
//                     }
//                     labelLine={{ stroke: "#555", strokeWidth: 1 }}
//                   >
//                     {departmentCounts.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value, name) => [`${value} members`, name]}
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
//           <CardTitle>Top Performers</CardTitle>
//           <CardDescription className="text-gray-400">
//             Members with highest performance ratings
//           </CardDescription>
//         </CardHeader>
//         {/* <CardContent className="text-slate-300">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {memberTaskStats
//               .filter((member) => member.assignedTasks > 0)
//               .sort((a, b) => b.performance - a.performance)
//               .slice(0, 3)
//               .map((member) => (
//                 <Card
//                   key={member.id}
//                   className="bg-gray-900 border-gray-800 text-slate-300"
//                 >
//                   <CardContent className="p-4">
//                     <div className="flex items-start gap-4">
//                       <Avatar className="h-12 w-12 border border-gray-800">
//                         <AvatarFallback className="bg-purple-900 text-purple-200">
//                           {member.fullName
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="grid gap-1">
//                         <h4 className="font-semibold">{member.fullName}</h4>
//                         <p className="text-sm text-gray-400">
//                           {member.jobTitle}
//                         </p>
//                         <div className="flex items-center gap-1 mt-1">
//                           <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
//                           <span className="text-sm font-medium">
//                             {member.performance}% performance
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-4 space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-400">Completion Rate</span>
//                         <span>{member.completionRate}%</span>
//                       </div>
//                       <Progress
//                         value={member.completionRate}
//                         className="h-1 bg-gray-800"
//                       />
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-400">Tasks Completed</span>
//                         <span>
//                           {member.completedTasks}/{member.assignedTasks}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//           </div>
//         </CardContent> */}
//       </Card>

//       <Card className="bg-gray-950 border-gray-800">
//         <CardHeader>
//           <CardTitle>Members Overview</CardTitle>
//           {/* <CardDescription className="text-gray-400">
//             Showing {filteredMembers.length} of {members.length} members
//           </CardDescription> */}
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader className="bg-gray-900">
//               <TableRow className="hover:bg-gray-900 border-gray-800">
//                 <TableHead className="text-gray-300">Member</TableHead>
//                 <TableHead className="text-gray-300">Role</TableHead>
//                 <TableHead className="text-gray-300">Department</TableHead>
//                 <TableHead className="text-gray-300">Team</TableHead>
//                 <TableHead className="text-gray-300">Assigned</TableHead>
//                 <TableHead className="text-gray-300">Completed</TableHead>
//                 <TableHead className="text-gray-300">Overdue</TableHead>
//                 <TableHead className="text-gray-300">Performance</TableHead>
//               </TableRow>
//             </TableHeader>
//             {/* <TableBody>
//               {filteredMembers.map((member) => (
//                 <TableRow
//                   key={member.id}
//                   className="hover:bg-gray-900 border-gray-800"
//                 >
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Avatar className="h-8 w-8 border border-gray-800">
//                         <AvatarFallback className="bg-gray-800 text-gray-300 text-xs">
//                           {member.fullName
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <span className="font-medium">{member.fullName}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell>{member.jobTitle}</TableCell>
//                   <TableCell>{member.department}</TableCell>
//                   <TableCell>{getTeamName(member)}</TableCell>
//                   <TableCell>{member.assignedTasks}</TableCell>
//                   <TableCell>{member.completedTasks}</TableCell>
//                   <TableCell>
//                     {member.overdueTasks > 0 ? (
//                       <div className="flex items-center">
//                         <Clock className="h-4 w-4 mr-1 text-orange-400" />
//                         {member.overdueTasks}
//                       </div>
//                     ) : (
//                       <span>0</span>
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       className={`
//                       ${
//                         member.performance >= 90
//                           ? "bg-green-900 text-green-300 hover:bg-green-900"
//                           : member.performance >= 80
//                           ? "bg-blue-900 text-blue-300 hover:bg-blue-900"
//                           : "bg-orange-900 text-orange-300 hover:bg-orange-900"
//                       }
//                     `}
//                     >
//                       {member.performance}%
//                     </Badge>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody> */}
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
