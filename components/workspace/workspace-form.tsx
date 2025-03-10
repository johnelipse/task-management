// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Check, AlertCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// export default function WorkspaceForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     owner: "current-user",
//     themeColor: "#6366f1",
//     visibility: "private",
//     teamMembers: [] as string[],
//   });
//   const [teamMemberInput, setTeamMemberInput] = useState("");
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     // Clear error when user types
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({ ...prev, themeColor: e.target.value }));
//   };

//   const handleVisibilityChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, visibility: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form
//     const newErrors: Record<string, string> = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Workspace name is required";
//     } else if (formData.name.length > 50) {
//       newErrors.name = "Workspace name must be less than 50 characters";
//     }

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       // Form is valid, submit
//       console.log("Form submitted:", formData);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-950 to-gray-900">
//       <div className="w-full max-w-4xl animate-fade-in">
//         <Card className="border-0 bg-gray-900/60 backdrop-blur-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] overflow-hidden">
//           <CardHeader className="relative overflow-hidden pb-8">
//             <div
//               className="absolute inset-0 opacity-20"
//               style={{
//                 background: `radial-gradient(circle at top right, ${formData.themeColor}, transparent 70%)`,
//               }}
//             />
//             <div className="relative z-10">
//               <CardTitle className="text-3xl font-bold text-white">
//                 Create Workspace
//               </CardTitle>
//               <CardDescription className="text-gray-400">
//                 Set up a new workspace for your team and projects
//               </CardDescription>
//             </div>
//           </CardHeader>

//           {/* Live Preview */}
//           <div
//             className="mx-6 p-4 rounded-lg mb-6 transition-all duration-300 flex items-center"
//             style={{
//               backgroundColor: `${formData.themeColor}15`,
//               borderLeft: `4px solid ${formData.themeColor}`,
//             }}
//           >
//             <div
//               className="w-10 h-10 rounded-md flex items-center justify-center mr-3 text-white font-bold"
//               style={{ backgroundColor: formData.themeColor }}
//             >
//               {formData.name.substring(0, 1).toUpperCase() || "W"}
//             </div>
//             <div>
//               <h3 className="font-medium text-white">
//                 {formData.name || "Workspace Name"}
//               </h3>
//               <p className="text-xs text-gray-400">
//                 {formData.visibility === "private"
//                   ? "Private Workspace"
//                   : "Public Workspace"}
//               </p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <CardContent className="space-y-6">
//               {/* Workspace Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-gray-300">
//                   Workspace Name <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter workspace name"
//                   maxLength={50}
//                   className="bg-gray-800/50 border-gray-700 focus:border-gray-600 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder:text-gray-500 transition-all"
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
//                     <AlertCircle size={14} /> {errors.name}
//                   </p>
//                 )}
//                 <p className="text-gray-500 text-xs">
//                   {formData.name.length}/50 characters
//                 </p>
//               </div>

//               {/* Description */}
//               <div className="space-y-2">
//                 <Label htmlFor="description" className="text-gray-300">
//                   Description
//                 </Label>
//                 <Textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Describe the purpose of this workspace"
//                   className="bg-gray-800/50 border-gray-700 focus:border-gray-600 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder:text-gray-500 min-h-[100px] transition-all"
//                 />
//               </div>

//               {/* Owner Selection */}
//               {/* <div className="space-y-2">
//                 <Label htmlFor="owner" className="text-gray-300">
//                   Owner
//                 </Label>
//                 <Select
//                   value={formData.owner}
//                   onValueChange={handleOwnerChange}
//                 >
//                   <SelectTrigger className="bg-gray-800/50 border-gray-700 focus:ring-2 focus:ring-indigo-500/20 text-white">
//                     <SelectValue placeholder="Select owner" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-gray-800 border-gray-700 text-white">
//                     <SelectItem value="current-user">
//                       You (Current User)
//                     </SelectItem>
//                     <SelectItem value="team-lead">Team Lead</SelectItem>
//                     <SelectItem value="admin">Admin</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div> */}

//               {/* Color Theme Selection */}
//               <div className="space-y-2">
//                 <Label htmlFor="themeColor" className="text-gray-300">
//                   Color Theme
//                 </Label>
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="color"
//                     id="themeColor"
//                     value={formData.themeColor}
//                     onChange={handleColorChange}
//                     className="w-10 h-10 rounded-md border-0 bg-transparent cursor-pointer"
//                   />
//                   <div className="text-sm text-gray-400">
//                     Select a color for your workspace branding
//                   </div>
//                 </div>
//               </div>

//               {/* Invite Team Members */}
//               {/* <div className="space-y-2">
//                 <Label htmlFor="teamMembers" className="text-gray-300">
//                   Invite Team Members
//                 </Label>
//                 <div className="flex gap-2">
//                   <Input
//                     id="teamMembers"
//                     value={teamMemberInput}
//                     onChange={(e) => setTeamMemberInput(e.target.value)}
//                     placeholder="Enter email address"
//                     className="bg-gray-800/50 border-gray-700 focus:border-gray-600 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder:text-gray-500 transition-all"
//                   />
//                   <Button
//                     type="button"
//                     onClick={addTeamMember}
//                     variant="outline"
//                     className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
//                   >
//                     <Plus size={18} />
//                   </Button>
//                 </div>
//                 {errors.teamMembers && (
//                   <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
//                     <AlertCircle size={14} /> {errors.teamMembers}
//                   </p>
//                 )}

//                 {formData.teamMembers.length > 0 && (
//                   <div className="mt-3 flex flex-wrap gap-2">
//                     {formData.teamMembers.map((email) => (
//                       <div
//                         key={email}
//                         className="flex items-center gap-1 bg-gray-800 text-gray-300 text-sm px-2 py-1 rounded-full"
//                       >
//                         <span>{email}</span>
//                         <button
//                           type="button"
//                           onClick={() => removeTeamMember(email)}
//                           className="text-gray-400 hover:text-white transition-colors"
//                         >
//                           <X size={14} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div> */}

//               {/* Visibility Option */}
//               <div className="space-y-3">
//                 <Label className="text-gray-300">Workspace Visibility</Label>
//                 <RadioGroup
//                   value={formData.visibility}
//                   onValueChange={handleVisibilityChange}
//                   className="flex flex-col space-y-3"
//                 >
//                   <div className="flex items-center space-x-3 rounded-lg border border-gray-700 p-3 bg-gray-800/30">
//                     <RadioGroupItem
//                       value="private"
//                       id="private"
//                       className="border-gray-600 text-indigo-500"
//                     />
//                     <Label
//                       htmlFor="private"
//                       className="flex flex-col cursor-pointer"
//                     >
//                       <span className="font-medium text-white">Private</span>
//                       <span className="text-gray-400 text-sm">
//                         Only invited members can access
//                       </span>
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-3 rounded-lg border border-gray-700 p-3 bg-gray-800/30">
//                     <RadioGroupItem
//                       value="public"
//                       id="public"
//                       className="border-gray-600 text-indigo-500"
//                     />
//                     <Label
//                       htmlFor="public"
//                       className="flex flex-col cursor-pointer"
//                     >
//                       <span className="font-medium text-white">Public</span>
//                       <span className="text-gray-400 text-sm">
//                         Anyone in your organization can access
//                       </span>
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>
//             </CardContent>

//             <CardFooter className="flex justify-end gap-3 pt-2 pb-6">
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0 shadow-lg shadow-indigo-500/20"
//               >
//                 <Check size={18} className="mr-2" /> Create Workspace
//               </Button>
//             </CardFooter>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import type React from "react";

import { useForm } from "react-hook-form";
import { Check, AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormValues {
  name: string;
  description: string;
  ownerId: string;
  themeColor: string;
  visibility: "private" | "public";
}

export default function WorkspaceForm({
  user,
}: {
  user: Session | null | any;
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      ownerId: user.id,
      themeColor: "#6366f1",
      visibility: "private",
    },
  });
  const router = useRouter();

  // Watch form values for reactive UI updates
  const formValues = watch();

  // Handle radio group visibility change
  const handleVisibilityChange = (value: "private" | "public") => {
    setValue("visibility", value);
  };

  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("themeColor", e.target.value);
  };
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  // Form submission
  const onSubmit = async (data: FormValues) => {
    data.name = data.name.toLowerCase();
    data.ownerId = user.id;
    try {
      setLoading(true);
      const res = await fetch("/api/workspace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 409) {
        toast.error("Workspace already exists.");
        setErr("Workspace already exists.");
        setLoading(false);
      } else if (res.status === 201) {
        toast.success("Workspace created successfully.");
        setLoading(false);
        reset();
        router.push("/workspace/boards");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-950 to-gray-900">
      <div className="w-full max-w-4xl animate-fade-in">
        <Card className="border-0 bg-gray-900/60 backdrop-blur-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] overflow-hidden">
          <CardHeader className="relative overflow-hidden pb-8">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at top right, ${formValues.themeColor}, transparent 70%)`,
              }}
            />
            <div className="relative z-10">
              <CardTitle className="text-3xl font-bold text-white">
                Create Workspace
              </CardTitle>
              <CardDescription className="text-gray-400">
                Set up a new workspace for your team and projects
              </CardDescription>
            </div>
          </CardHeader>

          {/* Live Preview */}
          <div
            className="mx-6 p-4 rounded-lg mb-6 transition-all duration-300 flex items-center"
            style={{
              backgroundColor: `${formValues.themeColor}15`,
              borderLeft: `4px solid ${formValues.themeColor}`,
            }}
          >
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center mr-3 text-white font-bold"
              style={{ backgroundColor: formValues.themeColor }}
            >
              {formValues.name?.substring(0, 1).toUpperCase() || "W"}
            </div>
            <div>
              <h3 className="font-medium text-white">
                {formValues.name || "Workspace Name"}
              </h3>
              <p className="text-xs text-gray-400">
                {formValues.visibility === "private"
                  ? "Private Workspace"
                  : "Public Workspace"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Workspace Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Workspace Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  {...register("name", {
                    required: "Workspace name is required",
                    maxLength: {
                      value: 50,
                      message: "Workspace name must be less than 50 characters",
                    },
                  })}
                  placeholder="Enter workspace name"
                  maxLength={50}
                  className="bg-gray-800/50 border-gray-700 focus:border-gray-600 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder:text-gray-500 transition-all"
                />
                {err && (
                  <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={14} /> {err}
                  </p>
                )}
                {errors.name && (
                  <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={14} /> {errors.name.message}
                  </p>
                )}
                <p className="text-gray-500 text-xs">
                  {formValues.name?.length || 0}/50 characters
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe the purpose of this workspace"
                  className="bg-gray-800/50 border-gray-700 focus:border-gray-600 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder:text-gray-500 min-h-[100px] transition-all"
                />
              </div>

              {/* Color Theme Selection */}
              <div className="space-y-2">
                <Label htmlFor="themeColor" className="text-gray-300">
                  Color Theme
                </Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="themeColor"
                    value={formValues.themeColor}
                    onChange={handleColorChange}
                    className="w-10 h-10 rounded-md border-0 bg-transparent cursor-pointer"
                  />
                  <div className="text-sm text-gray-400">
                    Select a color for your workspace branding
                  </div>
                </div>
              </div>

              {/* Visibility Option */}
              <div className="space-y-3">
                <Label className="text-gray-300">Workspace Visibility</Label>
                <RadioGroup
                  value={formValues.visibility}
                  onValueChange={handleVisibilityChange}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-center space-x-3 rounded-lg border border-gray-700 p-3 bg-gray-800/30">
                    <RadioGroupItem
                      value="private"
                      id="private"
                      className="border-gray-600 text-indigo-500"
                    />
                    <Label
                      htmlFor="private"
                      className="flex flex-col cursor-pointer"
                    >
                      <span className="font-medium text-white">Private</span>
                      <span className="text-gray-400 text-sm">
                        Only invited members can access
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-gray-700 p-3 bg-gray-800/30">
                    <RadioGroupItem
                      value="public"
                      id="public"
                      className="border-gray-600 text-indigo-500"
                    />
                    <Label
                      htmlFor="public"
                      className="flex flex-col cursor-pointer"
                    >
                      <span className="font-medium text-white">Public</span>
                      <span className="text-gray-400 text-sm">
                        Anyone in your organization can access
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-3 pt-2 pb-6">
              <Button
                disabled={loading}
                type="button"
                variant="outline"
                className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0 shadow-lg shadow-indigo-500/20"
              >
                {loading ? (
                  <Loader size={18} className="mr-2 animate-spin" />
                ) : (
                  <Check size={18} className="mr-2" />
                )}
                {loading ? "Creating..." : "Create Workspace"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
