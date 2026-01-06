import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workspaceSchema, type WorkspaceFormData } from "./form-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function WorkspaceFormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WorkspaceFormData>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: WorkspaceFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Workspace created successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to create workspace");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Workspace Name</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="My Workspace"
          className={errors.name ? "border-[#F87171]" : ""}
        />
        {errors.name && (
          <p className="text-sm text-[#F87171]">{errors.name.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Workspace"}
      </Button>
    </form>
  );
}

