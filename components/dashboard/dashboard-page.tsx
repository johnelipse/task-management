"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  LayoutDashboard,
  TrendingUp,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Task } from "@prisma/client";

export default function DashboardPage({ tasks }: { tasks: Task[] }) {
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const pendingTasksPercentage = (pendingTasks / totalTasks) * 100;
  const completedTasksPercentage = (completedTasks / totalTasks) * 100;

  const taskDateDifference = tasks.filter((task) => {
    const start = new Date(task.startDate);
    const end = new Date(task.endDate);

    // Calculate difference in milliseconds and convert to days
    const duration = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const taskRequired = duration < 10;
    return taskRequired;
  }).length;
  const overdueTasksPercentage = (taskDateDifference / totalTasks) * 100;
  return (
    <div
      className={`bg-gradient-to-br from-black to-slate-900 transition-colors duration-300 `}
    >
      <div className="">
        {/* Main Content */}
        <main className="">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                    <CardDescription className="text-slate-300 ">
                      All tasks in the system
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-300">
                  {tasks.length}
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-2">
                  <TrendingUp className="h-3 w-3" />+{tasks.length}% from last
                  month
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 bg-slate-800/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-xl"></div>
              <CardHeader className="pb-2 text-slate-200  relative z-10">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                    <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">
                      Completed Tasks
                    </CardTitle>
                    <CardDescription className="text-slate-300 ">
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

            <Card className="overflow-hidden border-0 bg-slate-800/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-xl"></div>
              <CardHeader className="pb-2 text-slate-200  relative z-10">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">
                      Pending Tasks
                    </CardTitle>
                    <CardDescription className="text-slate-300 ">
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

            <Card className="overflow-hidden border-0 bg-slate-800/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-red-500/5 rounded-xl"></div>
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-rose-500/20 dark:bg-rose-500/10 blur-xl"></div>
              <CardHeader className="pb-2 text-slate-200  relative z-10">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/30">
                    <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">
                      Overdue Tasks
                    </CardTitle>
                    <CardDescription className="text-slate-300 ">
                      Tasks past deadline
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-red-500 dark:from-rose-400 dark:to-red-300 animate-pulse">
                  {taskDateDifference}
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
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* <Card className="border-0  bg-slate-800/70 backdrop-blur-md shadow-lg rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-xl"></div>
                  <CardHeader className="text-slate-200  relative z-10">
                    <CardTitle>Priority Distribution</CardTitle>
                    <CardDescription className="text-slate-300 ">
                      Tasks by priority level
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center relative z-10">
                    <div className="w-full h-[240px] flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <div className="absolute inset-0 rounded-full border-[12px] border-rose-500/10 transition-all duration-300"></div>
                        <div
                          className="absolute inset-0 rounded-full border-[12px] border-amber-500/10 transition-all duration-300"
                          style={{
                            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                          }}
                        ></div>
                        <div
                          className="absolute inset-0 rounded-full border-[12px] border-emerald-500/10 transition-all duration-300"
                          style={{
                            clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)",
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-sm font-medium text-slate-300">
                            Total
                          </span>
                          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
                            248
                          </span>
                        </div>
                        <div className="absolute top-2 right-0 flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-red-500 shadow-md shadow-rose-500/20"></div>
                          <span className="text-xs font-medium">
                            High (32%)
                          </span>
                        </div>
                        <div className="absolute top-16 right-2 flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-md shadow-amber-500/20"></div>
                          <span className="text-xs font-medium">
                            Medium (45%)
                          </span>
                        </div>
                        <div className="absolute bottom-8 left-2 flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/20"></div>
                          <span className="text-xs font-medium">Low (23%)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}

                <Card className="border-0  bg-slate-800/70 backdrop-blur-md shadow-lg rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-xl"></div>
                  <CardHeader className=" text-slate-200 relative z-10">
                    <CardTitle>Department Distribution</CardTitle>
                    <CardDescription className="text-slate-300">
                      Tasks by department
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-5">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-500 shadow-sm shadow-blue-500/20"></div>
                            <span className="text-sm font-medium text-slate-200">
                              Engineering
                            </span>
                          </div>
                          <span className="text-sm font-bold text-sky-600 dark:text-sky-400">
                            86
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-sky-100 dark:bg-sky-950 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full shadow-inner transition-all duration-500 ease-in-out"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 shadow-sm shadow-purple-500/20"></div>
                            <span className="text-sm font-medium text-slate-200">
                              Design
                            </span>
                          </div>
                          <span className="text-sm font-bold text-fuchsia-600 dark:text-fuchsia-400">
                            52
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-fuchsia-950 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full shadow-inner transition-all duration-500 ease-in-out"
                            style={{ width: "21%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm shadow-emerald-500/20"></div>
                            <span className="text-sm font-medium text-slate-200">
                              Marketing
                            </span>
                          </div>
                          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            43
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-emerald-950 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-inner transition-all duration-500 ease-in-out"
                            style={{ width: "17%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm shadow-amber-500/20"></div>
                            <span className="text-sm font-medium text-slate-200">
                              Product
                            </span>
                          </div>
                          <span className="text-sm font-bold text-amber-400">
                            67
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-amber-950 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-inner transition-all duration-500 ease-in-out"
                            style={{ width: "27%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0  bg-slate-800/70 backdrop-blur-md shadow-lg rounded-xl overflow-hidden text-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-xl"></div>
                  <CardHeader className="text-slate-200 relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Tasks</CardTitle>
                        <CardDescription className="text-slate-200">
                          Your latest task activities
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-slate-800/50 border text-slate-200 border-slate-700 hover:bg-slate-700 transition-all duration-200"
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <TaskList />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics">
              <div className="flex items-center justify-center h-[400px] mt-6  bg-slate-800/70 backdrop-blur-md shadow-lg rounded-xl border-0">
                <p className="text-muted-foreground">
                  Analytics content will appear here
                </p>
              </div>
            </TabsContent>
            <TabsContent value="teams">
              <div className="flex items-center justify-center h-[400px] mt-6  bg-slate-800/70 backdrop-blur-md shadow-lg rounded-xl border-0">
                <p className="text-muted-foreground">
                  Teams content will appear here
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
