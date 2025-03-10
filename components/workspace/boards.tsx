"use client";

import {
  Bell,
  ChevronDown,
  Edit,
  Lock,
  LockOpen,
  Plus,
  PlusCircle,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/context/workspace-context";
import UpdateForm from "./update-workspace";
import { TeamDialog } from "./dialogs/team-dialog";
import { Team } from "@prisma/client";

export default function WorkspaceBoards({ teams }: { teams: Team[] }) {
  const { selectedWorkspace } = useWorkspace();

  // If no workspace is selected, show a placeholder or loading state
  if (!selectedWorkspace) {
    return (
      <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
        <p>Select a workspace to view boards</p>
      </div>
    );
  }

  // Get the first letter of the workspace name for the avatar
  const workspaceInitial = selectedWorkspace.name.charAt(0).toUpperCase();

  // Determine the subscription type (this is an example - adjust based on your data model)
  const subscriptionType = "Free";

  const workspaceTeams = teams.filter(
    (team) => team.workspaceId === selectedWorkspace.id
  );
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <div
              style={{
                background: `radial-gradient(circle at top right, ${selectedWorkspace.themeColor}, transparent 90%)`,
              }}
              className="flex-shrink-0 w-16 h-16 bg-purple-700 rounded-lg flex items-center justify-center text-white text-3xl font-bold"
            >
              {workspaceInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-white">
                  {selectedWorkspace.name}
                </h1>
                <UpdateForm initialData={selectedWorkspace} />
              </div>
              <div className="flex items-center gap-2 mt-1">
                {/* <span
                  className={`text-sm ${isPremium ? "bg-purple-900 text-purple-300" : "bg-gray-800 text-gray-300"} px-2 py-0.5 rounded`}
                >
                  {subscriptionType}
                </span> */}
                <div className="flex items-center text-sm text-gray-400">
                  {selectedWorkspace.visibility === "private" && (
                    <Lock size={14} className="mr-1" />
                  )}
                  {selectedWorkspace.visibility === "public" && (
                    <LockOpen size={14} className="mr-1" />
                  )}
                  {selectedWorkspace.visibility}
                </div>
              </div>
            </div>
          </div>
          <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white">
            <Bell size={16} className="mr-2" />
            Invite Workspace members
          </Button>
        </div>

        {/* Boards Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-white">Boards</h2>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <p className="text-sm mb-1">Sort by</p>
                <div className="relative">
                  <button className="flex items-center justify-between w-full md:w-56 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-left">
                    <span>Most recently active</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm mb-1">Filter by</p>
                <div className="relative">
                  <button className="flex items-center justify-between w-full md:w-56 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-left">
                    <span>Choose a collection</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm mb-1">Search</p>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search boards"
                  className="pl-9 bg-gray-900 border-gray-700 text-gray-200 w-full md:w-64"
                />
              </div>
            </div>
          </div>

          {/* Boards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Create new board */}
            <div>
              <TeamDialog
                workspaceId={selectedWorkspace.id}
                trigger={
                  <div className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg p-6 flex flex-col items-center justify-center h-32 cursor-pointer transition-colors">
                    <span className="text-gray-400 mb-2">Create new board</span>
                  </div>
                }
              />
            </div>

            {/* Board items would come from selectedWorkspace.boards or similar */}
            {/* This is a placeholder - you would map through actual boards */}

            {workspaceTeams.map((team) => {
              return (
                <div
                  key={team.id}
                  className="bg-green-800 rounded-lg p-4 h-32 flex flex-col justify-between relative group"
                >
                  <h3 className="text-white font-medium">{team.name}</h3>
                  <div className="absolute bottom-3 left-4">
                    <Bell size={16} className="text-purple-300" />
                  </div>
                  <TeamDialog
                    workspaceId={selectedWorkspace.id}
                    initialData={team}
                    trigger={
                      <button className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit size={16} className="text-white" />
                      </button>
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
