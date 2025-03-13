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
//   Legend,
//   Line,
//   LineChart,
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
// import { ArrowUpRight, Clock, Users } from "lucide-react";
// import type { Department, Task, Team, Member } from "@prisma/client";

// export default function TeamsReport({
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
//   // Process team data
//   // const processedTeamData = teamData.map((team) => {
//   //   // Find all tasks for this team
//   //   const teamTasks = tasks.filter((task) => task.teamId === team.id);

//   //   // Find team members using the teamId relation
//   //   const teamMembers = members.filter((member) => member.teamId === team.id);

//   //   // Calculate metrics
//   //   const totalTasks = teamTasks.length;
//   //   // const completedTasks = teamTasks.filter(
//   //   //   (task) => task.status === "completed"
//   //   // ).length;
//   //   // const overdueTasks = teamTasks.filter((task) => {
//   //   //   const endDate = new Date(task.endDate);
//   //   //   const today = new Date();
//   //   //   return endDate < today && task.status !== "completed";
//   //   // }).length;

//   //   // Calculate efficiency (completed tasks percentage with some weighting for overdue)
//   //   // const efficiency =
//   //   //   totalTasks > 0
//   //   //     ? Math.round((completedTasks / totalTasks) * 100 - overdueTasks * 2)
//   //   //     : 0;

//   //   // Find department
//   //   // const department = departments.find(
//   //   //   (dept) => dept.id === team.departmentId
//   //   // );

//   //   // Create performance data - simulated based on task completion dates
//   //   // const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
//   //   // const performance = monthNames.map((month, index) => {
//   //   //   // Simulate efficiency trend with small variations
//   //   //   return {
//   //   //     month,
//   //   //     efficiency: Math.min(
//   //   //       100,
//   //   //       Math.max(70, efficiency - 5 + index + Math.floor(Math.random() * 5))
//   //   //     ),
//   //   //   };
//   //   // });

//   //   // Calculate member contributions
//   // //   const memberContributions = teamMembers
//   // //     .map((member) => {
//   // //       const memberTaskCount = teamTasks.filter((task) =>
//   // //         task.memberIds.includes(member.id)
//   // //       ).length;

//   // //       return {
//   // //         id: member.id,
//   // //         name: member.fullName,
//   // //         jobTitle: member.jobTitle,
//   // //         image: member.image,
//   // //         tasks: memberTaskCount,
//   // //       };
//   // //     })
//   // //     .sort((a, b) => b.tasks - a.tasks)
//   // //     .slice(0, 6); // Top 6 contributors

//   // //   return {
//   // //     id: team.id,
//   // //     name: team.name,
//   // //     // department: department?.name || "Unassigned",
//   // //     totalTasks,
//   // //     completedTasks,
//   // //     overdueTasks,
//   // //     efficiency: Math.max(0, Math.min(100, efficiency)), // Keep between 0-100
//   // //     members: teamMembers.length,
//   // //     teamMembers: teamMembers, // Store the full member objects
//   // //     performance,
//   // //     memberContributions,
//   // //   };
//   // // });

//   // // Prepare data for team performance over time chart
//   // const performanceMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
//   // const teamPerformanceData = performanceMonths.map((month) => {
//   //   const data: { month: string; [key: string]: string | number } = {
//   //     month,
//   //   };
//   // //   processedTeamData.forEach((team) => {
//   // //     const teamMonth = team.performance.find((m) => m.month === month);
//   // //     data[team.name] = teamMonth ? teamMonth.efficiency : 0;
//   // //   });
//   // //   return data;
//   // // });

//   // const [selectedTeam, setSelectedTeam] = useState(
//   //   processedTeamData.length > 0 ? processedTeamData[0].id : ""
//   // );
//   // const [departmentFilter, setDepartmentFilter] = useState("all");

//   // // Get unique departments from processed data
//   // // const uniqueDepartments = Array.from(
//   // //   new Set(processedTeamData.map((team) => team.department))
//   // // );

//   // // const filteredTeams =
//   // //   departmentFilter === "all"
//   // //     ? processedTeamData
//   // //     : processedTeamData.filter(
//   // //         (team) => team.department === departmentFilter
//   // //       );

//   // const selectedTeamData = processedTeamData.find(
//   //   (team) => team.id === selectedTeam
//   // );

//   return (
//     <div className="space-y-6 text-slate-300">
//       <div className="flex flex-col sm:flex-row justify-between gap-4">
//         <h3 className="text-2xl font-bold">Teams Report</h3>
//         {/* <div className="flex gap-4">
//           <Select defaultValue="all" onValueChange={setDepartmentFilter}>
//             <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800">
//               <SelectValue placeholder="Filter by department" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-950 border-gray-800 text-slate-300">
//               <SelectItem value="all">All Departments</SelectItem>
//             </SelectContent>
//           </Select>
//         </div> */}
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Total Teams
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {/* {filteredTeams.length} */}
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
//               {/* {filteredTeams.reduce((acc, team) => acc + team.totalTasks, 0)} */}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-blue-400 flex items-center">
//               <span>Assigned to teams</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Completed Tasks
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {/* {filteredTeams.reduce(
//                 (acc, team) => acc + team.completedTasks,
//                 0
//               )} */}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-purple-400 flex items-center">
//               {/* <span>
//                 {filteredTeams.reduce((acc, team) => acc + team.totalTasks, 0) >
//                 0
//                   ? Math.round(
//                       (filteredTeams.reduce(
//                         (acc, team) => acc + team.completedTasks,
//                         0
//                       ) /
//                         filteredTeams.reduce(
//                           (acc, team) => acc + team.totalTasks,
//                           0
//                         )) *
//                         100
//                     )
//                   : 0}
//                 % completion rate
//               </span> */}
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-950 border-gray-800">
//           <CardHeader className="pb-2">
//             <CardDescription className="text-gray-400">
//               Overdue Tasks
//             </CardDescription>
//             <CardTitle className="text-2xl text-slate-300">
//               {/* {filteredTeams.reduce((acc, team) => acc + team.overdueTasks, 0)} */}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-orange-400 flex items-center">
//               <Clock className="h-4 w-4 mr-1" />
//               <span>Require attention</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <Card className="bg-gray-950 border-gray-800 h-[25rem]  text-slate-300">
//           <CardHeader>
//             <CardTitle>Team Performance Over Time</CardTitle>
//             <CardDescription className="text-gray-400">
//               Efficiency trends for all teams
//             </CardDescription>
//           </CardHeader>
//           {/* <CardContent>
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart
//                   data={teamPerformanceData}
//                   margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#333"
//                     vertical={false}
//                   />
//                   <XAxis
//                     dataKey="month"
//                     tick={{ fill: "#888" }}
//                     axisLine={{ stroke: "#333" }}
//                     tickLine={{ stroke: "#333" }}
//                   />
//                   <YAxis
//                     tick={{ fill: "#888" }}
//                     axisLine={{ stroke: "#333" }}
//                     tickLine={{ stroke: "#333" }}
//                     domain={[70, 90]}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#1f1f1f",
//                       borderColor: "#333",
//                       borderRadius: "6px",
//                     }}
//                     itemStyle={{ color: "#fff" }}
//                   />
//                   <Legend wrapperStyle={{ paddingTop: 10 }} />
//                   {processedTeamData.slice(0, 6).map((team, index) => {
//                     // Array of colors for the lines
//                     const colors = [
//                       "#4f46e5",
//                       "#8b5cf6",
//                       "#ec4899",
//                       "#10b981",
//                       "#3b82f6",
//                       "#f97316",
//                     ];
//                     return (
//                       <Line
//                         key={team.id}
//                         type="monotone"
//                         dataKey={team.name}
//                         stroke={colors[index % colors.length]}
//                         strokeWidth={2}
//                         dot={{ r: 4 }}
//                       />
//                     );
//                   })}
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent> */}
//         </Card>

//         <Card className="bg-gray-950 border-gray-800 text-slate-300">
//           <CardHeader className="flex flex-row items-center justify-between">
//             <div>
//               <CardTitle>Team Details</CardTitle>
//               <CardDescription className="text-gray-400">
//                 Select a team to view details
//               </CardDescription>
//             </div>
//             <Select value={selectedTeam} onValueChange={setSelectedTeam}>
//               <SelectTrigger className="w-[180px] bg-gray-950 text-slate-300 border-gray-800">
//                 <SelectValue placeholder="Select team" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-950 border-gray-800 text-slate-300">
//                 {processedTeamData.map((team) => (
//                   <SelectItem key={team.id} value={team.id}>
//                     {team.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </CardHeader>
//           <CardContent className="scrollbar-hide">
//             {selectedTeamData && (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <p className="text-sm text-gray-400">Department</p>
//                     {/* <p className="font-medium">{selectedTeamData.department}</p> */}
//                   </div>
//                   <div className="space-y-1">
//                     <p className="text-sm text-gray-400">Members</p>
//                     <p className="font-medium flex items-center">
//                       <Users className="h-4 w-4 mr-1" />
//                       {selectedTeamData.members}
//                     </p>
//                   </div>
//                   <div className="space-y-1">
//                     <p className="text-sm text-gray-400">Tasks</p>
//                     <p className="font-medium">{selectedTeamData.totalTasks}</p>
//                   </div>
//                   <div className="space-y-1">
//                     <p className="text-sm text-gray-400">Efficiency</p>
//                     <p className="font-medium">
//                       <Badge
//                         className={`
//                         ${
//                           selectedTeamData.efficiency >= 85
//                             ? "bg-green-900 text-green-300 hover:bg-green-900"
//                             : selectedTeamData.efficiency >= 75
//                             ? "bg-blue-900 text-blue-300 hover:bg-blue-900"
//                             : "bg-orange-900 text-orange-300 hover:bg-orange-900"
//                         }
//                       `}
//                       >
//                         {selectedTeamData.efficiency}%
//                       </Badge>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <p className="text-sm font-medium">Task Completion</p>
//                   <Progress
//                     value={
//                       selectedTeamData.totalTasks
//                         ? (selectedTeamData.completedTasks /
//                             selectedTeamData.totalTasks) *
//                           100
//                         : 0
//                     }
//                     className="h-2 bg-gray-800"
//                   />
//                   <div className="flex justify-between text-xs text-gray-400">
//                     <span>Completed: {selectedTeamData.completedTasks}</span>
//                     <span>Total: {selectedTeamData.totalTasks}</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <p className="text-sm font-medium">Team Members</p>
//                   <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
//                     {selectedTeamData.teamMembers.length > 0 ? (
//                       selectedTeamData.teamMembers.map((member) => (
//                         <div
//                           key={member.id}
//                           className="flex items-center justify-between bg-gray-900 p-2 rounded-md"
//                         >
//                           <div className="flex items-center gap-3">
//                             <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
//                               {member.image ? (
//                                 <img
//                                   src={member.image || "/placeholder.svg"}
//                                   alt={member.fullName}
//                                   className="h-full w-full object-cover"
//                                 />
//                               ) : (
//                                 <span className="text-xs font-medium">
//                                   {member.fullName
//                                     .split(" ")
//                                     .map((n) => n[0])
//                                     .join("")}
//                                 </span>
//                               )}
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium">
//                                 {member.fullName}
//                               </p>
//                               <p className="text-xs text-gray-400">
//                                 {member.jobTitle}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="text-xs text-gray-400">
//                             Joined:{" "}
//                             {new Date(member.dateJoined).toLocaleDateString()}
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="flex items-center justify-center h-20 text-gray-400">
//                         No team members assigned
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <p className="text-sm font-medium">Member Contributions</p>
//                   <div className="h-[120px]">
//                     {selectedTeamData.memberContributions.length > 0 ? (
//                       <ResponsiveContainer width="100%" height="100%">
//                         <BarChart
//                           data={selectedTeamData.memberContributions}
//                           margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
//                           layout="vertical"
//                         >
//                           <CartesianGrid
//                             strokeDasharray="3 3"
//                             stroke="#333"
//                             horizontal={true}
//                             vertical={false}
//                           />
//                           <XAxis
//                             type="number"
//                             tick={{ fill: "#888" }}
//                             axisLine={{ stroke: "#333" }}
//                             tickLine={{ stroke: "#333" }}
//                           />
//                           <YAxis
//                             dataKey="name"
//                             type="category"
//                             tick={{ fill: "#888" }}
//                             axisLine={{ stroke: "#333" }}
//                             tickLine={{ stroke: "#333" }}
//                             width={100}
//                           />
//                           <Tooltip
//                             contentStyle={{
//                               backgroundColor: "#1f1f1f",
//                               borderColor: "#333",
//                               borderRadius: "6px",
//                             }}
//                             itemStyle={{ color: "#fff" }}
//                           />
//                           <Bar
//                             dataKey="tasks"
//                             fill="#4f46e5"
//                             radius={[0, 4, 4, 0]}
//                           />
//                         </BarChart>
//                       </ResponsiveContainer>
//                     ) : (
//                       <div className="flex items-center justify-center h-full text-gray-400">
//                         No member data available
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="bg-gray-950 border-gray-800">
//         <CardHeader>
//           <CardTitle>Team Efficiency Ranking</CardTitle>
//           <CardDescription className="text-gray-400">
//             Performance comparison across teams
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow className="hover:bg-gray-900 border-gray-800">
//                 <TableHead>Team</TableHead>
//                 <TableHead>Department</TableHead>
//                 <TableHead>Members</TableHead>
//                 <TableHead>Tasks</TableHead>
//                 <TableHead>Completed</TableHead>
//                 <TableHead>Overdue</TableHead>
//                 <TableHead>Efficiency</TableHead>
//               </TableRow>
//             </TableHeader>
//             {/* <TableBody>
//               {filteredTeams
//                 .sort((a, b) => b.efficiency - a.efficiency)
//                 .map((team) => (
//                   <TableRow
//                     key={team.id}
//                     className="hover:bg-gray-900 border-gray-800"
//                   >
//                     <TableCell className="font-medium">{team.name}</TableCell>
//                     <TableCell>{team.department}</TableCell>
//                     <TableCell>
//                       <div className="flex -space-x-2 overflow-hidden">
//                         {team.teamMembers.slice(0, 3).map((member) => (
//                           <div
//                             key={member.id}
//                             className="flex h-6 w-6 rounded-full ring-2 ring-gray-950 bg-gray-700 items-center justify-center overflow-hidden"
//                             title={member.fullName}
//                           >
//                             {member.image ? (
//                               <img
//                                 src={member.image || "/placeholder.svg"}
//                                 alt={member.fullName}
//                                 className="h-full w-full object-cover"
//                               />
//                             ) : (
//                               <span className="text-xs font-medium">
//                                 {member.fullName
//                                   .split(" ")
//                                   .map((n) => n[0])
//                                   .join("")}
//                               </span>
//                             )}
//                           </div>
//                         ))}
//                         {team.teamMembers.length > 3 && (
//                           <div className="flex h-6 w-6 rounded-full ring-2 ring-gray-950 bg-gray-800 items-center justify-center">
//                             <span className="text-xs font-medium">
//                               +{team.teamMembers.length - 3}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </TableCell>
//                     <TableCell>{team.totalTasks}</TableCell>
//                     <TableCell>{team.completedTasks}</TableCell>
//                     <TableCell>{team.overdueTasks}</TableCell>
//                     <TableCell>
//                       <Badge
//                         className={`
//                           ${
//                             team.efficiency >= 85
//                               ? "bg-green-900 text-green-300 hover:bg-green-900"
//                               : team.efficiency >= 75
//                               ? "bg-blue-900 text-blue-300 hover:bg-blue-900"
//                               : "bg-orange-900 text-orange-300 hover:bg-orange-900"
//                           }
//                         `}
//                       >
//                         {team.efficiency}%
//                       </Badge>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody> */}
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
