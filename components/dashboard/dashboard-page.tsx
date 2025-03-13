"use client";
import {
  CheckCircle,
  LayoutDashboard,
  TrendingUp,
  Clock,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import TaskList from "./task-list";
import type { Department, Member, Task, Team } from "@prisma/client";
import { MembersMarque } from "./members-marque";

export default function DashboardPage({
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
  // Task statistics
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const pendingTasksPercentage = (pendingTasks / totalTasks) * 100;
  const completedTasksPercentage = (completedTasks / totalTasks) * 100;

  // Overdue tasks calculation
  const overdueTaskDateDifference = tasks.filter((task) => {
    const start = new Date(task.startDate);
    const end = new Date(task.endDate);
    const today = new Date();

    return today > end && task.status !== "Completed";
  }).length;
  const overdueTasksPercentage = (overdueTaskDateDifference / totalTasks) * 100;

  // Department task distribution
  const departmentTaskCount = departments.map((dept) => ({
    name: dept.name,
    // taskCount: tasks.filter((task) => task.department === dept.name).length,
    color: getColorForDepartment(dept.name),
  }));

  // Helper function to assign colors to departments
  function getColorForDepartment(departmentName: string) {
    const colorMap: { [key: string]: { from: string; to: string } } = {
      Engineering: { from: "sky-500", to: "blue-500" },
      Design: { from: "fuchsia-500", to: "purple-500" },
      Marketing: { from: "emerald-500", to: "teal-500" },
      Product: { from: "amber-500", to: "orange-500" },
    };
    return colorMap[departmentName] || { from: "indigo-500", to: "violet-500" };
  }

  return (
    <div
      className={`bg-gradient-to-br from-black to-slate-900 transition-colors duration-300`}
    >
      <main>
        {/* Task Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Tasks Card */}
          <Card className="overflow-hidden border-0 bg-slate-800/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 rounded-xl"></div>
            <CardHeader className="pb-2 text-slate-200 relative z-10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-violet-900/30">
                  <LayoutDashboard className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">
                    Total Tasks
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    All tasks in the system
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-300">
                {totalTasks}
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-2">
                <TrendingUp className="h-3 w-3" />+{totalTasks}% from last month
              </div>
            </CardContent>
          </Card>

          {/* Completed Tasks Card */}
          <Card className="overflow-hidden border-0 bg-slate-800/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-xl"></div>
            <CardHeader className="pb-2 text-slate-200 relative z-10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">
                    Completed Tasks
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Tasks marked as done
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                {completedTasks}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Progress
                  value={completedTasksPercentage}
                  className="h-2 bg-emerald-100 dark:bg-emerald-950 [&>[data-state='progress']]:bg-gradient-to-r [&>[data-state='progress']]:from-emerald-500 [&>[data-state='progress']]:to-teal-500 dark:[&>[data-state='progress']]:from-emerald-400 dark:[&>[data-state='progress']]:to-teal-400"
                />
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {completedTasksPercentage.toFixed(0)}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks Card */}
          <Card className="overflow-hidden border-0 bg-slate-800/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-xl"></div>
            <CardHeader className="pb-2 text-slate-200 relative z-10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">
                    Pending Tasks
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Tasks in progress
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-300">
                {pendingTasks}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Progress
                  value={pendingTasksPercentage}
                  className="h-2 bg-amber-100 dark:bg-amber-950 [&>[data-state='progress']]:bg-gradient-to-r [&>[data-state='progress']]:from-amber-500 [&>[data-state='progress']]:to-orange-500 dark:[&>[data-state='progress']]:from-amber-400 dark:[&>[data-state='progress']]:to-orange-400"
                />
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  {pendingTasksPercentage.toFixed(0)}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Overdue Tasks Card */}
          <Card className="overflow-hidden border-0 bg-slate-800/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-red-500/5 rounded-xl"></div>
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-rose-500/20 dark:bg-rose-500/10 blur-xl"></div>
            <CardHeader className="pb-2 text-slate-200 relative z-10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/30">
                  <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">
                    Overdue Tasks
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Tasks past deadline
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-red-500 dark:from-rose-400 dark:to-red-300 animate-pulse">
                {overdueTaskDateDifference}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant="destructive"
                  className="text-xs bg-gradient-to-r from-rose-500 to-red-500 border-0 shadow-sm"
                >
                  Urgent
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {overdueTasksPercentage.toFixed(0)}% of total
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="bg-slate-800/70 backdrop-blur-md border border-slate-900 p-1 rounded-lg">
            <TabsTrigger
              value="overview"
              className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-500 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-500 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="teams"
              className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-500 data-[state=active]:text-white"
            >
              Teams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6 py-3 px-3">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Department Distribution Card */}
              <Card className="border-0 bg-slate-800/70 backdrop-blur-md shadow-lg rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-xl"></div>
                <CardHeader className="text-slate-200 relative z-10">
                  <CardTitle>Department Distribution</CardTitle>
                  <CardDescription className="text-slate-300">
                    Tasks by department
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-5">
                    {departmentTaskCount.map((dept) => (
                      <div key={dept.name}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full bg-gradient-to-r from-${dept.color.from} to-${dept.color.to} shadow-sm shadow-${dept.color.from}/20`}
                            ></div>
                            <span className="text-sm font-medium text-slate-200">
                              {dept.name}
                            </span>
                          </div>
                          <span
                            className={`text-sm font-bold text-${dept.color.from} dark:text-${dept.color.to}`}
                          >
                            {/* {dept.taskCount} */}
                          </span>
                        </div>
                        <div
                          className={`h-2 rounded-full bg-${dept.color.from}-950 overflow-hidden`}
                        >
                          <div
                            className={`h-full bg-gradient-to-r from-${dept.color.from} to-${dept.color.to} rounded-full shadow-inner transition-all duration-500 ease-in-out`}
                            style={
                              {
                                // width: `${(dept.taskCount / totalTasks) * 100}%`,
                              }
                            }
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Tasks Card */}
              <Card className="border-0 bg-slate-800/70 backdrop-blur-md shadow-lg rounded-xl overflow-hidden text-slate-200">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-xl"></div>
                <CardHeader className="text-slate-200 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Tasks</CardTitle>
                      <CardDescription className="text-slate-300">
                        Latest tasks added to the system
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <TaskList tasks={tasks.slice(0, 5)} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6 space-y-6 py-3 px-3">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Task Status Breakdown */}
              <Card className="border-0 bg-slate-800/70 backdrop-blur-md shadow-lg rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-xl"></div>
                <CardHeader className="text-slate-200 relative z-10">
                  <CardTitle>Task Status Breakdown</CardTitle>
                  <CardDescription className="text-slate-300">
                    Distribution of tasks by status
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex justify-center items-center h-64">
                    <div className="relative w-48 h-48">
                      {/* Completed Tasks Donut Segment */}
                      <div
                        className="absolute inset-0 rounded-full border-8 border-transparent border-t-emerald-500 border-r-emerald-500"
                        style={{
                          transform: `rotate(${
                            completedTasksPercentage * 3.6
                          }deg)`,
                          clipPath:
                            completedTasksPercentage > 50
                              ? "none"
                              : "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 0%)",
                          transition: "transform 1s ease-in-out",
                        }}
                      ></div>

                      {/* Pending Tasks Donut Segment */}
                      <div
                        className="absolute inset-0 rounded-full border-8 border-transparent border-t-amber-500 border-r-amber-500"
                        style={{
                          transform: `rotate(${
                            (completedTasksPercentage +
                              pendingTasksPercentage) *
                            3.6
                          }deg)`,
                          clipPath:
                            pendingTasksPercentage > 50
                              ? "none"
                              : "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 0%)",
                          transition: "transform 1s ease-in-out",
                        }}
                      ></div>

                      {/* Overdue Tasks Donut Segment */}
                      <div
                        className="absolute inset-0 rounded-full border-8 border-transparent border-t-rose-500 border-r-rose-500"
                        style={{
                          transform: `rotate(${
                            (completedTasksPercentage +
                              pendingTasksPercentage +
                              overdueTasksPercentage) *
                            3.6
                          }deg)`,
                          clipPath:
                            overdueTasksPercentage > 50
                              ? "none"
                              : "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 0%)",
                          transition: "transform 1s ease-in-out",
                        }}
                      ></div>

                      {/* Inner Circle */}
                      <div className="absolute inset-4 rounded-full bg-slate-800 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">
                            {totalTasks}
                          </div>
                          <div className="text-xs text-slate-400">
                            Total Tasks
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-xs text-slate-300">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-xs text-slate-300">Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <span className="text-xs text-slate-300">Overdue</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Task Completion Trend */}
              <Card className="border-0 bg-slate-800/70 backdrop-blur-md shadow-lg rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-xl"></div>
                <CardHeader className="text-slate-200 relative z-10">
                  <CardTitle>Task Completion Trend</CardTitle>
                  <CardDescription className="text-slate-300">
                    Weekly task completion rate
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="h-64 flex items-end justify-between gap-2 pt-6">
                    {Array.from({ length: 7 }).map((_, i) => {
                      const height = Math.floor(Math.random() * 70) + 30;
                      return (
                        <div
                          key={i}
                          className="flex flex-col items-center gap-2"
                        >
                          <div
                            className="w-8 rounded-t-md bg-gradient-to-t from-indigo-600 to-violet-500"
                            style={{ height: `${height}%` }}
                          ></div>
                          <span className="text-xs text-slate-400">
                            {
                              ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                                i
                              ]
                            }
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teams" className="mt-6 space-y-6 py-3 px-3">
            <div className="grid grid-cols-1 py-3 px-2 gap-6 md:grid-cols-2 lg:grid-cols-2">
              {teamData.map((team) => (
                <Card
                  key={team.id}
                  className="border-0 bg-slate-800/70 backdrop-blur-md shadow-lg rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-xl"></div>
                  <CardHeader className="text-slate-200 relative z-10">
                    <CardTitle>{team.name}</CardTitle>
                    <CardDescription className="text-slate-300">
                      {team.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">
                          Team Members
                        </span>
                        <Badge
                          variant="outline"
                          className="bg-slate-700/50 text-slate-300 border-slate-600"
                        >
                          {
                            members.filter(
                              (member) => member.teamId === team.id
                            ).length
                          }{" "}
                          members
                        </Badge>
                      </div>

                      <div className="relative w-full overflow-hidden">
                        <MembersMarque
                          members={members
                            .filter((member) => member.teamId === team.id)
                            .slice(0, 5)}
                        />
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-400">
                            Tasks Assigned
                          </span>
                          <span className="text-xs font-medium text-slate-300">
                            {
                              tasks.filter((task) => task.teamId === team.id)
                                .length
                            }
                          </span>
                        </div>
                        <Progress
                          value={
                            (tasks.filter(
                              (task) =>
                                task.teamId === team.id &&
                                task.status === "Completed"
                            ).length /
                              Math.max(
                                1,
                                tasks.filter((task) => task.teamId === team.id)
                                  .length
                              )) *
                            100
                          }
                          className="h-1.5 bg-slate-700 [&>[data-state='progress']]:bg-gradient-to-r [&>[data-state='progress']]:from-indigo-500 [&>[data-state='progress']]:to-violet-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
