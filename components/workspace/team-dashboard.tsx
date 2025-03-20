// "use client";

// import { useState, useEffect } from "react";
// import {
//   Star,
//   Bell,
//   ChevronDown,
//   Zap,
//   SlidersHorizontal,
//   MoreHorizontal,
//   Plus,
//   X,
//   Check,
//   Calendar,
//   Users,
//   Loader,
//   Ellipsis,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import type { Team, Task, StatusTypes } from "@prisma/client";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { ActionDropdown } from "./dialogs/action-dropdown";

// interface TaskColumn {
//   id: string;
//   title: string;
//   tasks: Task[];
//   statusType: StatusTypes;
// }

// interface TaskFormData {
//   taskName: string;
//   priority: string;
//   teamId: string;
//   startDate: string;
//   endDate: string;
//   status: StatusTypes;
// }

// export default function TeamBoard({
//   team,
//   allTasks,
// }: {
//   team: Team | null;
//   allTasks: Task[];
// }) {
//   const [columns, setColumns] = useState<TaskColumn[]>([
//     { id: "pending", title: "Pending", tasks: [], statusType: "Pending" },
//     {
//       id: "inprogress",
//       title: "In Progress",
//       tasks: [],
//       statusType: "Inprogress",
//     },
//     { id: "completed", title: "Completed", tasks: [], statusType: "Completed" },
//   ]);
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//   const [activeColumn, setActiveColumn] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<TaskFormData>({
//     defaultValues: {
//       taskName: "",
//       priority: "Medium",
//       teamId: team?.id,
//       startDate: new Date().toISOString().split("T")[0],
//       endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//         .toISOString()
//         .split("T")[0],
//     },
//   });

//   useEffect(() => {
//     if (team && allTasks) {
//       // For debugging
//       console.log("All tasks:", allTasks);

//       // Group tasks by status
//       const pendingTasks = allTasks.filter((task) => task.status === "Pending");
//       const inProgressTasks = allTasks.filter(
//         (task) => task.status === "Inprogress"
//       );
//       const completedTasks = allTasks.filter(
//         (task) => task.status === "Completed"
//       );

//       setColumns([
//         {
//           id: "pending",
//           title: "Pending",
//           tasks: pendingTasks,
//           statusType: "Pending",
//         },
//         {
//           id: "inprogress",
//           title: "In Progress",
//           tasks: inProgressTasks,
//           statusType: "Inprogress",
//         },
//         {
//           id: "completed",
//           title: "Completed",
//           tasks: completedTasks,
//           statusType: "Completed",
//         },
//       ]);
//     }
//   }, [team, allTasks]);

//   const startAddingTask = (columnId: string) => {
//     setActiveColumn(columnId);

//     // Find the column by ID
//     const column = columns.find((col) => col.id === columnId);
//     if (!column) return;

//     // Set default values for the form
//     reset({
//       taskName: "",
//       priority: "Medium",
//       teamId: team?.id,
//       startDate: new Date().toISOString().split("T")[0],
//       endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//         .toISOString()
//         .split("T")[0],
//     });
//   };

//   const cancelAddingTask = () => {
//     setActiveColumn(null);
//     reset();
//   };

//   const onSubmit = async (data: TaskFormData) => {
//     console.log("Submitting task:", data);
//     if (!activeColumn || !team) {
//       cancelAddingTask();
//       return;
//     }

//     // Find the column by ID to get the correct status type
//     const column = columns.find((col) => col.id === activeColumn);
//     if (!column) return;

//     try {
//       setLoading(true);
//       // API call to save the task to the database
//       const response = await fetch("/api/tasks", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           taskName: data.taskName,
//           priority: data.priority,
//           startDate: data.startDate,
//           endDate: data.endDate,
//           status: column.statusType,
//           teamId: team.id,
//         }),
//       });

//       if (!response.ok) {
//         toast.error("Failed to save task");
//         setLoading(false);
//         throw new Error("Failed to save task");
//       }

//       // Get the saved task with DB-generated ID
//       const savedTask: Task = await response.json();
//       console.log("Saved task:", savedTask);

//       // Update the columns with the saved task immediately
//       setColumns(
//         columns.map((col) => {
//           if (col.id === activeColumn) {
//             return {
//               ...col,
//               tasks: [...col.tasks, savedTask],
//             };
//           }
//           return col;
//         })
//       );

//       if (response.status === 201) {
//         toast.success("Task created successfully.");
//         router.refresh();
//       }

//       setLoading(false);
//       setActiveColumn(null);
//       reset();
//     } catch (error) {
//       console.error("Error saving task:", error);
//       setLoading(false);
//     }
//   };

//   // Only call toLowerCase if priority exists
//   const getPriorityColor = (priority: string | undefined) => {
//     if (!priority) return "bg-blue-600"; // Default color if priority is undefined

//     try {
//       switch (priority.toLowerCase()) {
//         case "high":
//           return "bg-red-800";
//         case "medium":
//           return "bg-yellow-800";
//         case "low":
//           return "bg-green-500";
//         default:
//           return "bg-blue-600";
//       }
//     } catch (error) {
//       console.error("Error determining priority color:", error);
//       return "bg-blue-600"; // Fallback color
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black">
//       {/* <header className="flex items-center justify-between p-4 text-white">
//         <div className="flex items-center gap-4">
//           <h1 className="text-xl font-bold">{team?.name}</h1>
//         </div>

//         <div className="flex items-center gap-3">
//           <Button
//             variant="secondary"
//             className="bg-white/20 hover:bg-white/30 text-white"
//           >
//             Share
//           </Button>
//         </div>
//       </header> */}
//       <header className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 rounded-lg m-4 shadow-lg">
//         <div className="flex items-center gap-4">
//           <h1 className="text-3xl font-bold text-white">
//             {team?.name.toUpperCase()}
//           </h1>
//           <div className="flex items-center gap-2">
//             <Bell className="h-5 w-5 text-white/70 hover:text-white cursor-pointer" />
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <Button
//             variant="secondary"
//             className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-sm"
//           >
//             <Users className="h-4 w-4 mr-2" />
//             Share
//           </Button>
//         </div>
//       </header>

//       <div className="flex gap-4 p-4 overflow-x-auto">
//         {columns.map((column) => (
//           <div
//             key={column.id}
//             className="flex-shrink-0 w-72 bg-white/10 rounded-lg p-4"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-white font-medium">{column.title}</h3>
//               <div className="flex items-center gap-1">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-6 w-6 text-white/70 hover:text-white"
//                 >
//                   <ChevronDown className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-6 w-6 text-white/70 hover:text-white"
//                 >
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             <div className="space-y-2">
//               {column.tasks.map((task) => {
//                 // Skip rendering invalid tasks
//                 if (!task || !task.taskName) return null;

//                 // Pre-calculate the priority color to avoid multiple calls
//                 const priorityColor = getPriorityColor(task.priority);

//                 return (
//                   <div
//                     key={task.id}
//                     className={`text-white rounded p-3 shadow ${priorityColor}`}
//                   >
//                     <div className="flex justify-between items-start mb-2">
//                       <h4 className="font-medium">{task.taskName}</h4>
//                       <div>
//                         <ActionDropdown task={task} />
//                       </div>
//                     </div>

//                     <div className="flex items-center text-xs text-slate-300 mt-2">
//                       <div className="flex items-center mr-3">
//                         <Calendar className="h-3 w-3 mr-1" />
//                         <span>
//                           {task.endDate
//                             ? new Date(task.endDate).toLocaleDateString()
//                             : "No date"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}

//               {activeColumn === column.id && (
//                 <div className="bg-black rounded p-3 shadow border border-gray-800">
//                   <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="mb-2">
//                       <input
//                         className={`w-full border-none focus:outline-none text-white bg-gray-950 ${
//                           errors.taskName ? "border border-red-500" : ""
//                         }`}
//                         placeholder="Task name..."
//                         {...register("taskName", { required: true })}
//                         autoFocus
//                       />
//                       {errors.taskName && (
//                         <span className="text-red-500 text-xs">
//                           Task name is required
//                         </span>
//                       )}
//                     </div>

//                     <div className="grid gap-2 mb-2">
//                       <select
//                         className="text-[1rem] border rounded p-1 bg-gray-950 text-white"
//                         {...register("priority")}
//                       >
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                       </select>
//                     </div>

//                     <div className="grid grid-cols-2 gap-2 text-xs mb-2">
//                       <input
//                         type="date"
//                         className="border rounded p-1 bg-gray-950 text-white"
//                         {...register("startDate")}
//                       />
//                       <input
//                         type="date"
//                         className="border rounded p-1 bg-gray-950 text-white"
//                         {...register("endDate")}
//                       />
//                     </div>

//                     <div className="flex justify-end mt-2 gap-2">
//                       <Button
//                         type="button"
//                         size="sm"
//                         variant="ghost"
//                         onClick={cancelAddingTask}
//                         className="p-1 h-6 text-gray-500 hover:text-red-500"
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         type={loading ? "button" : "submit"}
//                         size="sm"
//                         disabled={loading}
//                         className="p-1 h-6 bg-blue-500 hover:bg-blue-600 text-white"
//                       >
//                         {loading ? (
//                           <Loader className="h-4 animate-spin w-4" />
//                         ) : (
//                           <Check className="h-4 w-4" />
//                         )}
//                       </Button>
//                     </div>
//                   </form>
//                 </div>
//               )}
//             </div>

//             {activeColumn !== column.id && (
//               <button
//                 onClick={() => startAddingTask(column.id)}
//                 className="flex items-center gap-2 text-white/80 hover:text-white mt-4 w-full"
//               >
//                 <Plus className="h-4 w-4" />
//                 <span>Add a task</span>
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Bell,
  ChevronDown,
  MoreHorizontal,
  Plus,
  X,
  Check,
  Calendar,
  Users,
  Loader,
  Ellipsis,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Team, Task, StatusTypes } from "@prisma/client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ActionDropdown } from "./dialogs/action-dropdown";

interface TaskColumn {
  id: string;
  title: string;
  tasks: Task[];
  statusType: StatusTypes;
}

interface TaskFormData {
  taskName: string;
  priority: string;
  teamId: string;
  startDate: string;
  endDate: string;
  status: StatusTypes;
}

export default function TeamBoard({
  team,
  allTasks,
}: {
  team: Team | null;
  allTasks: Task[];
}) {
  const [columns, setColumns] = useState<TaskColumn[]>([
    { id: "pending", title: "Pending", tasks: [], statusType: "Pending" },
    {
      id: "inprogress",
      title: "In Progress",
      tasks: [],
      statusType: "Inprogress",
    },
    { id: "completed", title: "Completed", tasks: [], statusType: "Completed" },
  ]);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      taskName: "",
      priority: "Medium",
      teamId: team?.id,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    },
  });

  useEffect(() => {
    if (team && allTasks) {
      // For debugging
      console.log("All tasks:", allTasks);

      // Filter tasks by teamId first
      const teamTasks = allTasks.filter((task) => task.teamId === team.id);

      // Then group filtered tasks by status
      const pendingTasks = teamTasks.filter(
        (task) => task.status === "Pending"
      );
      const inProgressTasks = teamTasks.filter(
        (task) => task.status === "Inprogress"
      );
      const completedTasks = teamTasks.filter(
        (task) => task.status === "Completed"
      );

      setColumns([
        {
          id: "pending",
          title: "Pending",
          tasks: pendingTasks,
          statusType: "Pending",
        },
        {
          id: "inprogress",
          title: "In Progress",
          tasks: inProgressTasks,
          statusType: "Inprogress",
        },
        {
          id: "completed",
          title: "Completed",
          tasks: completedTasks,
          statusType: "Completed",
        },
      ]);
    }
  }, [team, allTasks]);

  const startAddingTask = (columnId: string) => {
    setActiveColumn(columnId);

    // Find the column by ID
    const column = columns.find((col) => col.id === columnId);
    if (!column) return;

    // Set default values for the form
    reset({
      taskName: "",
      priority: "Medium",
      teamId: team?.id,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    });
  };

  const cancelAddingTask = () => {
    setActiveColumn(null);
    reset();
  };

  const onSubmit = async (data: TaskFormData) => {
    console.log("Submitting task:", data);
    if (!activeColumn || !team) {
      cancelAddingTask();
      return;
    }

    // Find the column by ID to get the correct status type
    const column = columns.find((col) => col.id === activeColumn);
    if (!column) return;

    try {
      setLoading(true);
      // API call to save the task to the database
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName: data.taskName,
          priority: data.priority,
          startDate: data.startDate,
          endDate: data.endDate,
          status: column.statusType,
          teamId: team.id,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to save task");
        setLoading(false);
        throw new Error("Failed to save task");
      }

      // Get the saved task with DB-generated ID
      const savedTask: Task = await response.json();
      console.log("Saved task:", savedTask);

      // Update the columns with the saved task immediately
      setColumns(
        columns.map((col) => {
          if (col.id === activeColumn) {
            return {
              ...col,
              tasks: [...col.tasks, savedTask],
            };
          }
          return col;
        })
      );

      if (response.status === 201) {
        toast.success("Task created successfully.");
        router.refresh();
      }

      setLoading(false);
      setActiveColumn(null);
      reset();
    } catch (error) {
      console.error("Error saving task:", error);
      setLoading(false);
    }
  };

  // Only call toLowerCase if priority exists
  const getPriorityColor = (priority: string | undefined) => {
    if (!priority) return "bg-blue-600"; // Default color if priority is undefined

    try {
      switch (priority.toLowerCase()) {
        case "high":
          return "bg-red-800";
        case "medium":
          return "bg-yellow-800";
        case "low":
          return "bg-green-500";
        default:
          return "bg-blue-600";
      }
    } catch (error) {
      console.error("Error determining priority color:", error);
      return "bg-blue-600"; // Fallback color
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 rounded-lg m-4 shadow-lg">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-white">
            {team?.name.toUpperCase()}
          </h1>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-white/70 hover:text-white cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-sm"
          >
            <Users className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      <div className="flex gap-4 p-4 overflow-x-auto">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-72 bg-white/10 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">{column.title}</h3>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white/70 hover:text-white"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white/70 hover:text-white"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {column.tasks.map((task) => {
                // Skip rendering invalid tasks
                if (!task || !task.taskName) return null;

                // Pre-calculate the priority color to avoid multiple calls
                const priorityColor = getPriorityColor(task.priority);

                return (
                  <div
                    key={task.id}
                    className={`text-white rounded p-3 shadow ${priorityColor}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{task.taskName}</h4>
                      <div>
                        <ActionDropdown task={task} />
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-slate-300 mt-2">
                      <div className="flex items-center mr-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {task.endDate
                            ? new Date(task.endDate).toLocaleDateString()
                            : "No date"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {activeColumn === column.id && (
                <div className="bg-black rounded p-3 shadow border border-gray-800">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                      <input
                        className={`w-full border-none focus:outline-none text-white bg-gray-950 ${
                          errors.taskName ? "border border-red-500" : ""
                        }`}
                        placeholder="Task name..."
                        {...register("taskName", { required: true })}
                        autoFocus
                      />
                      {errors.taskName && (
                        <span className="text-red-500 text-xs">
                          Task name is required
                        </span>
                      )}
                    </div>

                    <div className="grid gap-2 mb-2">
                      <select
                        className="text-[1rem] border rounded p-1 bg-gray-950 text-white"
                        {...register("priority")}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <input
                        type="date"
                        className="border rounded p-1 bg-gray-950 text-white"
                        {...register("startDate")}
                      />
                      <input
                        type="date"
                        className="border rounded p-1 bg-gray-950 text-white"
                        {...register("endDate")}
                      />
                    </div>

                    <div className="flex justify-end mt-2 gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={cancelAddingTask}
                        className="p-1 h-6 text-gray-500 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        type={loading ? "button" : "submit"}
                        size="sm"
                        disabled={loading}
                        className="p-1 h-6 bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        {loading ? (
                          <Loader className="h-4 animate-spin w-4" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {activeColumn !== column.id && (
              <button
                onClick={() => startAddingTask(column.id)}
                className="flex items-center gap-2 text-white/80 hover:text-white mt-4 w-full"
              >
                <Plus className="h-4 w-4" />
                <span>Add a task</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
