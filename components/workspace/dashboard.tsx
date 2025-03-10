"use client";

import { useState } from "react";
import { ChevronDown, Filter, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCards from "./stats-cards";
import TaskCompletionChart from "./task-comp-cards";
import MemberActivityChart from "./member-activity";
import BoardProgressChart from "./board-progress";

export default function WorkspaceDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Ensure dark mode is applied on initial render
  if (typeof window !== "undefined") {
    if (isDarkMode && !document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
    }
  }

  // Sample data for charts
  const taskCompletionData = [
    { name: "Mon", completed: 12, pending: 5 },
    { name: "Tue", completed: 18, pending: 7 },
    { name: "Wed", completed: 15, pending: 9 },
    { name: "Thu", completed: 20, pending: 3 },
    { name: "Fri", completed: 25, pending: 2 },
    { name: "Sat", completed: 10, pending: 1 },
    { name: "Sun", completed: 5, pending: 0 },
  ];

  const memberActivityData = [
    { name: "Week 1", activity: 45 },
    { name: "Week 2", activity: 52 },
    { name: "Week 3", activity: 49 },
    { name: "Week 4", activity: 65 },
    { name: "Week 5", activity: 59 },
    { name: "Week 6", activity: 70 },
  ];

  const boardProgressData = [
    { name: "Design", completed: 85 },
    { name: "Development", completed: 65 },
    { name: "Marketing", completed: 45 },
    { name: "Research", completed: 90 },
    { name: "Planning", completed: 75 },
  ];

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Workspace header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Design Team Workspace
            </h1>
            <p className="text-zinc-400 mt-1">
              Collaborative workspace for the design team projects and tasks
            </p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              New Board
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-zinc-800/50 border border-zinc-700 p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
              >
                All Workspaces
              </TabsTrigger>
              <TabsTrigger
                value="design"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
              >
                Design
              </TabsTrigger>
              <TabsTrigger
                value="development"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
              >
                Development
              </TabsTrigger>
              <TabsTrigger
                value="marketing"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
              >
                Marketing
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge
                variant="outline"
                className="bg-zinc-800/50 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
              >
                Active
                <ChevronDown className="ml-1 h-3 w-3" />
              </Badge>
              <Badge
                variant="outline"
                className="bg-zinc-800/50 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
              >
                Team
                <ChevronDown className="ml-1 h-3 w-3" />
              </Badge>
              <Badge
                variant="outline"
                className="bg-zinc-800/50 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
              >
                Priority
                <ChevronDown className="ml-1 h-3 w-3" />
              </Badge>
            </div>
          </Tabs>
        </div>

        {/* Stats cards */}
        <StatsCards />

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <TaskCompletionChart />
          <MemberActivityChart />
        </div>

        {/* Board Progress */}
        <BoardProgressChart />
      </div>
    </>
  );
}
