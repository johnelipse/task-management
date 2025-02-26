"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, SortDesc, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";
import DateRangeFilter from "../DataTableComponents/DateRangeFilter";
import { Department, Member, Task, Team } from "@prisma/client";
import { DatePickerWithRange } from "./date-range-filter";

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
  onSortChange: (option: string) => void;
  currentSort: string;
  teams: Team[];
  departments: Department[];
  tasks: Task[];
  members: Member[];
}

export default function FilterBar({
  onFilterChange,
  onSortChange,
  currentSort,
  teams,
  departments,
  tasks,
  members,
}: FilterBarProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      onFilterChange({
        dateRange: {
          start: range.from,
          end: range.to,
        },
      });
    }
  };

  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl py-2 px-4 border border-gray-800 shadow-lg w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-gray-300">Filters:</span>
        </div>

        <div className="grid grid-cols-2 md:flex gap-3 w-full">
          <Select onValueChange={(value) => onFilterChange({ member: value })}>
            <SelectTrigger className="w-full md:w-[140px] bg-gray-900 border-gray-700 focus:ring-blue-500">
              <SelectValue placeholder="Member" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="all">All Members</SelectItem>

              {members.map((member) => {
                return (
                  <SelectItem key={member.id} value={member.id}>
                    {member.fullName}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onFilterChange({ team: value })}>
            <SelectTrigger className="w-full md:w-[140px] bg-gray-900 border-gray-700 focus:ring-blue-500">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="all">All Teams</SelectItem>

              {teams.map((team) => {
                return (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => onFilterChange({ department: value })}
          >
            <SelectTrigger className="w-full md:w-[140px] bg-gray-900 border-gray-700 focus:ring-blue-500">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="all">All Departments</SelectItem>

              {departments.map((department) => {
                return (
                  <SelectItem value={department.name}>
                    {department.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => onFilterChange({ priority: value })}
          >
            <SelectTrigger className="w-full md:w-[140px] bg-gray-900 border-gray-700 focus:ring-blue-500">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onFilterChange({ status: value })}>
            <SelectTrigger className="w-full md:w-[140px] bg-gray-900 border-gray-700 focus:ring-blue-500">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="inprogress">InProgress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-auto bg-gray-900 border-gray-700 hover:bg-gray-800 hover:text-blue-400"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-900 text-white border-gray-700">
              <DatePickerWithRange
                date={dateRange}
                onDateChange={handleDateRangeChange}
              />
            </PopoverContent>
          </Popover> */}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-auto bg-gray-900 border-gray-700 hover:bg-gray-800 hover:text-blue-400"
              >
                <SortDesc className="mr-2 h-4 w-4" />
                Sort:{" "}
                {currentSort.charAt(0).toUpperCase() + currentSort.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem
                className={
                  currentSort === "newest" ? "bg-gray-800 text-blue-400" : ""
                }
                onClick={() => onSortChange("newest")}
              >
                Newest
              </DropdownMenuItem>
              <DropdownMenuItem
                className={
                  currentSort === "oldest" ? "bg-gray-800 text-blue-400" : ""
                }
                onClick={() => onSortChange("oldest")}
              >
                Oldest
              </DropdownMenuItem>
              <DropdownMenuItem
                className={
                  currentSort === "priority" ? "bg-gray-800 text-blue-400" : ""
                }
                onClick={() => onSortChange("priority")}
              >
                Priority
              </DropdownMenuItem>
              <DropdownMenuItem
                className={
                  currentSort === "status" ? "bg-gray-800 text-blue-400" : ""
                }
                onClick={() => onSortChange("status")}
              >
                Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
