"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Edit } from "lucide-react";
import { Workspace } from "@prisma/client";
import toast from "react-hot-toast";
import { updateWorkspace } from "@/actions/workspace";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  description: string;
  visibility: "private" | "public";
}

export default function UpdateForm({
  initialData,
}: {
  initialData: Workspace;
}) {
  const [open, setOpen] = useState(false);

  // Log the initial value to confirm what we're receiving
  console.log("initialData.visibility:", initialData.visibility);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      visibility: initialData.visibility || "private",
    },
  });

  // Watch the visibility value to keep RadioGroup in sync
  const visibilityValue = watch("visibility");

  // Log the watched value to confirm it's being updated correctly
  console.log("Watched visibility value:", visibilityValue);

  // Reset the form when dialog opens to ensure values are fresh
  useEffect(() => {
    if (open) {
      reset({
        name: initialData.name || "",
        description: initialData.description || "",
        visibility: initialData.visibility || "private",
      });
    }
  }, [open, initialData, reset]);

  // Ensure visibility is set correctly
  useEffect(() => {
    if (initialData.visibility) {
      // Normalize the value to ensure it matches exactly "private" or "public"
      const normalizedVisibility = initialData.visibility.toLowerCase() as
        | "private"
        | "public";
      setValue("visibility", normalizedVisibility);
    }
  }, [initialData.visibility, setValue]);
  const id = initialData.id;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);

    try {
      setLoading(true);
      await updateWorkspace(id, data);
      toast.success("Workspace updated successfully.");
      setLoading(false);
      setOpen(false);
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="dark">
      <div className="">
        <Button
          className="hover:bg-none"
          variant="ghost"
          onClick={() => setOpen(true)}
        >
          <Edit size={16} />
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-4xl bg-gray-950 border-gray-800 text-foreground">
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle className="text-slate-300">
                  Update Workspace
                </DialogTitle>
                <DialogDescription>
                  Update the details for your workspace. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label className="text-slate-300" htmlFor="name">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter name"
                    className="bg-gray-900 border-gray-900 text-slate-300"
                    required
                    {...register("name")}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300" htmlFor="description">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    className="bg-gray-900 border-gray-900 text-slate-300 min-h-24"
                    {...register("description")}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Visibility</Label>
                  {/* Add a key to force re-render when visibility changes */}
                  <RadioGroup
                    key={visibilityValue}
                    className="flex gap-4"
                    defaultValue={visibilityValue}
                    value={visibilityValue}
                    onValueChange={(value) =>
                      setValue("visibility", value as "private" | "public")
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label className="text-slate-300" htmlFor="private">
                        Private
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label className="text-slate-300" htmlFor="public">
                        Public
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                {loading ? (
                  <Button disabled type="button">
                    Saving...
                  </Button>
                ) : (
                  <Button type="submit">Save</Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
