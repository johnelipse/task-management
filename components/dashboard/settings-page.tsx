"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { User } from "@prisma/client";
import TextInput from "../FormInputs/TextInput";
import { useForm } from "react-hook-form";
import ImageInput from "../FormInputs/ImageInput";
import toast from "react-hot-toast";
import { updateUser, updateUserPassword } from "@/actions/users";
import { signOut, useSession } from "next-auth/react";
import PasswordInput from "../FormInputs/PasswordInput";
export type UpdateProps = {
  name: string;
  email: string;
  image: string;
  phone: string;
  firstName: string;
  lastName: string;
};
export type PasswordProps = {
  oldPassword: string;
  newPassword: string;
};
export default function SettingsPage({ userData }: { userData: User | null }) {
  const initialImage = "/placeholder.png";
  const [imageUrl, setImageUrl] = useState(userData?.image || initialImage);
  const [activeSection, setActiveSection] = useState("profile");
  const { data: session, update } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProps>({
    defaultValues: {
      image: userData?.image as string,
      email: userData?.email,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      phone: userData?.phone,
    },
  });
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordProps>();
  const [loading, setLoading] = useState(false);
  const id = userData?.id as string;
  async function submit(data: UpdateProps) {
    data.image = imageUrl;
    data.name = `${data.firstName} ${data.lastName}`;
    try {
      setLoading(true);
      await updateUser(data, id);
      await update({
        ...session,
        user: {
          ...session?.user,
          name: data.name,
          email: data.email,
          image: data.image,
          phone: data.phone,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
      signOut();
      toast.success("Updated successfully.");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
      setLoading(false);
    }
  }
  async function updatePassword(data: PasswordProps) {
    try {
      setLoading(true);
      const res = await updateUserPassword(id, data);
      if (res?.status === 403) {
        toast.error("Incorrect old password.");
        setLoading(false);
      } else if (res?.status === 409) {
        toast.error("The password entered is the same as the old one");
        setLoading(false);
      } else if (res?.status === 200) {
        toast.success("Password updated successfully.");
        setLoading(false);
        signOut();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="dark min-h-screen bg-black text-white">
      <div className="flex min-h-screen">
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-zinc-900 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Profile Settings */}
            {activeSection === "profile" && (
              <div className="space-y-6">
                <form onSubmit={handleSubmit(submit)} action="space-y-6">
                  <div className="flex items-center pb-3 justify-between">
                    <h1 className="text-2xl font-bold">Profile Settings</h1>
                    <Button
                      disabled={loading}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>

                  <Card className="bg-zinc-950 border-zinc-800">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription className="text-zinc-400">
                        Update your personal details and profile picture
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6  w-full">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-full">
                            <ImageInput
                              title="Profile Image"
                              imageUrl={imageUrl}
                              setImageUrl={setImageUrl}
                              endpoint="categoryImage"
                            />
                          </div>
                        </div>
                        <div className="">
                          <div className="grid grid-cols-1 md:grid-cols-1 space-y-4 gap-4">
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                              <TextInput
                                register={register}
                                errors={errors}
                                label="First Name"
                                name="firstName"
                              />
                              <TextInput
                                register={register}
                                errors={errors}
                                label="Last Name"
                                name="lastName"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            {" "}
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Email"
                              name="email"
                            />
                          </div>
                          <div className="space-y-2">
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Phone"
                              name="phone"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </form>

                <Card className="bg-zinc-950 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      onSubmit={handleSubmitPassword(updatePassword)}
                      action=""
                    >
                      <div className="space-y-2">
                        <PasswordInput
                          register={registerPassword}
                          errors={passwordErrors}
                          label="Current Password"
                          name="oldPassword"
                          icon={Lock}
                          placeholder="Current Password"
                          // forgotPasswordLink="/forgot-password"
                        />
                      </div>
                      <div className="space-y-2">
                        <PasswordInput
                          register={registerPassword}
                          errors={passwordErrors}
                          label="New Password"
                          name="newPassword"
                          icon={Lock}
                          placeholder="New Password"
                          // forgotPasswordLink="/forgot-password"
                        />
                      </div>
                      <Button
                        disabled={loading}
                        className="mt-2 bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {loading ? " Updating..." : " Update Password"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
            {/* Task Customization */}
            {activeSection === "customization" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Task Customization</h1>
                  {/* <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Save Changes
                  </Button> */}
                </div>
                <Card className="bg-zinc-950 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Priority Colors</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Customize colors for different task priority levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium">Critical</div>
                        <div className="h-8 w-8 rounded-full bg-red-500 ring-2 ring-red-500/30"></div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-zinc-700 hover:bg-zinc-800"
                        >
                          Change
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium">High</div>
                        <div className="h-8 w-8 rounded-full bg-orange-500 ring-2 ring-orange-500/30"></div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-zinc-700 hover:bg-zinc-800"
                        >
                          Change
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium">Medium</div>
                        <div className="h-8 w-8 rounded-full bg-yellow-500 ring-2 ring-yellow-500/30"></div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-zinc-700 hover:bg-zinc-800"
                        >
                          Change
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium">Low</div>
                        <div className="h-8 w-8 rounded-full bg-green-500 ring-2 ring-green-500/30"></div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-zinc-700 hover:bg-zinc-800"
                        >
                          Change
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium">
                          No Priority
                        </div>
                        <div className="h-8 w-8 rounded-full bg-zinc-500 ring-2 ring-zinc-500/30"></div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-zinc-700 hover:bg-zinc-800"
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
