"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FilterBar from "./filter-bar";
import TaskCard from "./task-card";
import type { Department, Member, Task, Team } from "@prisma/client";

export default function TaskDashboard({
  teams,
  departments,
  allTasks,
  members,
}: {
  teams: Team[];
  departments: Department[];
  allTasks:
    | (Task[] & {
        team: Team;
      })
    | any;
  members: Member[];
}) {
  // const singleId = allTasks.memberIds.find((id: any) => id.id);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState({
    team: "all",
    department: "all",
    priority: "all",
    status: "all",
    member: "all",
    dateRange: { start: null, end: null },
  });
  const [sortOption, setSortOption] = useState("newest");

  // Use allTasks instead of mock data
  useEffect(() => {
    setFilteredTasks(allTasks);
  }, [allTasks]);

  useEffect(() => {
    let result = [...allTasks];

    // Apply filters
    if (filters.team !== "all") {
      result = result.filter((task) => task.teamId === filters.team);
    }
    if (filters.member !== "all") {
      result = result.filter((task) => task.memberIds.includes(filters.member));
    }
    if (filters.department !== "all") {
      result = result.filter((task) => task.department === filters.department);
    }

    if (filters.priority !== "all") {
      // Capitalize the first letter of the filter priority to match database format
      const capitalizedPriority =
        filters.priority.charAt(0).toUpperCase() +
        filters.priority.slice(1).toLowerCase();
      result = result.filter((task) => task.priority === capitalizedPriority);
    }
    if (filters.status !== "all") {
      // Capitalize the first letter of the filter priority to match database format
      const capitalizedPriority =
        filters.status.charAt(0).toUpperCase() +
        filters.status.slice(1).toLowerCase();
      result = result.filter((task) => task.status === capitalizedPriority);
    }
    if (filters.dateRange.start && filters.dateRange.end) {
      const endDate = new Date(filters.dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      result = result.filter(
        (task) =>
          new Date(task.startDate) >= new Date(filters.dateRange.start!) &&
          new Date(task.endDate) <= new Date(filters.dateRange.end!)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "priority":
        const priorityOrder = { High: 0, Medium: 1, Low: 2 };
        result.sort(
          (a, b) =>
            priorityOrder[a.priority as keyof typeof priorityOrder] -
            priorityOrder[b.priority as keyof typeof priorityOrder]
        );
        break;
      case "status":
        const statusOrder = { Inprogress: 0, Pending: 1, Completed: 2 };
        result.sort(
          (a, b) =>
            statusOrder[a.status as keyof typeof statusOrder] -
            statusOrder[b.status as keyof typeof statusOrder]
        );
        break;
    }

    setFilteredTasks(result);
  }, [allTasks, filters, sortOption]);

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="py-8">
        <FilterBar
          tasks={allTasks}
          members={members}
          departments={departments}
          teams={teams}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          currentSort={sortOption}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <TaskCard members={members} task={task} />
            </motion.div>
          ))}
        </motion.div>

        {filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-xl text-gray-400">No tasks match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
