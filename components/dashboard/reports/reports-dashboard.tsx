"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
// import DepartmentsReport from "./department-reports";
// import TeamsReport from "./teams-report";
import TasksReport from "./task-reports";
import { Department, Task, Team } from "@prisma/client";
export default function ReportsDashboard({
  departments,
  tasks,
  teamData,
}: {
  departments: Department[];
  tasks: Task[];
  teamData: Team[];
}) {
  const [activeTab, setActiveTab] = useState("departments");

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-[3.7rem] z-10 border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="px-2 flex h-16 items-center justify-between py-4">
          <h1 className="text-xl hidden md:block font-bold tracking-tight">
            Task Management Reports
          </h1>
          <h1 className="text-xl md:hidden block font-bold tracking-tight">
            Reports
          </h1>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 border-gray-700 bg-black text-gray-300 hover:bg-gray-900 hover:text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 border-gray-700 bg-black text-gray-300 hover:bg-gray-900 hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="px-3 py-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-green-400">
              Reports Dashboard
            </h2>
            <p className="text-gray-400 mt-1">
              Comprehensive analytics and insights for your task management
              system
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search reports..."
                  className="w-full bg-gray-950 border-gray-800 pl-9 text-gray-300 placeholder:text-gray-500 focus:border-purple-600"
                />
              </div>
            </div>

            <Tabs
              defaultValue="departments"
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList className="bg-gray-950 border border-gray-800 p-0.5">
                <TabsTrigger
                  value="departments"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  Departments
                </TabsTrigger>
                <TabsTrigger
                  value="teams"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  Teams
                </TabsTrigger>
                <TabsTrigger
                  value="tasks"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  Tasks
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  Members
                </TabsTrigger>
              </TabsList>

              <TabsContent value="departments" className="space-y-4">
                {/* <DepartmentsReport
                  departments={departments}
                  tasks={tasks}
                  teamData={teamData}
                /> */}
              </TabsContent>

              <TabsContent value="teams" className="space-y-4">
                {/* <TeamsReport
                  departments={departments}
                  tasks={tasks}
                  teamData={teamData}
                  members={members}
                /> */}
              </TabsContent>

              <TabsContent value="tasks" className="space-y-4">
                <TasksReport
                  departments={departments}
                  tasks={tasks}
                  teamData={teamData}
                />
              </TabsContent>

              <TabsContent value="members" className="space-y-4">
                {/* <MembersReport
                  departments={departments}
                  tasks={tasks}
                  teamData={teamData}
                /> */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
