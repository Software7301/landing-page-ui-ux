import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Container, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContainer } from "@/providers/container-provider";
import { useWorkspace } from "@/providers/workspace-provider";
import { useServer } from "@/providers/server-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { modalVariants, backdropVariants } from "@/lib/motion";

const containerSchema = z.object({
  name: z.string().min(3, "Container name must be at least 3 characters"),
  image: z.string().min(1, "Docker image is required"),
  port: z.string().regex(/^\d+$/, "Port must be a number"),
  serverId: z.string().min(1, "Server selection is required"),
});

type ContainerFormData = z.infer<typeof containerSchema>;

interface CreateContainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateContainerModal({ isOpen, onClose }: CreateContainerModalProps) {
  const { language } = useLanguage();
  const { createContainer } = useContainer();
  const { activeWorkspace } = useWorkspace();
  const { servers, getServersByWorkspace } = useServer();
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<ContainerFormData>({
    resolver: zodResolver(containerSchema),
    defaultValues: {
      name: "",
      image: "",
      port: "",
      serverId: "",
    },
  });

  const workspaceServers = activeWorkspace
    ? getServersByWorkspace(activeWorkspace.id)
    : [];

  const onSubmit = async (data: ContainerFormData) => {
    if (!activeWorkspace) {
      toast.error(t("container.create.noWorkspaceSelected", language) || "No workspace selected");
      return;
    }
    if (workspaceServers.length === 0) {
      toast.error(t("container.create.noServersAvailable", language) || "No servers available");
      return;
    }

    setIsCreating(true);
    try {
      const selectedServer = servers.find(s => s.id === data.serverId);
      if (!selectedServer) {
        toast.error(t("container.create.serverNotFound", language) || "Server not found");
        return;
      }
      createContainer(
        data.name,
        data.image,
        data.port,
        selectedServer.id,
        selectedServer.name,
        activeWorkspace.id
      );
      toast.success(t("container.create.success", language, { name: data.name }) || `Container ${data.name} created successfully`);
      form.reset();
      onClose();
    } catch (error) {
      toast.error(t("container.create.error", language) || "Error creating container");
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    form.reset();
    setIsCreating(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl shadow-2xl pointer-events-auto transition-colors duration-300"
              style={{
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
                borderWidth: "1px",
              }}
            >
              <div 
                className="flex items-center justify-between p-6 border-b transition-colors duration-300"
                style={{
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors duration-300"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary)20, var(--color-accent)10)`,
                      borderColor: "var(--color-primary)30",
                    }}
                  >
                    <Container className="w-5 h-5 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <h2 className="text-xl font-semibold transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                    {t("container.create.title", language) || "Create Container"}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg transition-colors duration-300"
                  style={{
                    color: "var(--color-text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-text)";
                    e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="container-name" className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                    {t("container.create.nameLabel", language) || "Container Name"}
                  </Label>
                  <Input
                    id="container-name"
                    type="text"
                    {...form.register("name")}
                    className="h-11 transition-colors duration-300"
                    placeholder={t("container.create.namePlaceholder", language) || "e.g., my-app"}
                    disabled={isCreating}
                  />
                  {form.formState.errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm transition-colors duration-300"
                      style={{ color: "var(--color-error)" }}
                    >
                      {form.formState.errors.name.message}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="container-image" className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                    {t("container.create.imageLabel", language) || "Docker Image"}
                  </Label>
                  <Input
                    id="container-image"
                    type="text"
                    {...form.register("image")}
                    className="h-11 transition-colors duration-300"
                    placeholder={t("container.create.imagePlaceholder", language) || "e.g., nginx:latest"}
                    disabled={isCreating}
                  />
                  {form.formState.errors.image && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm transition-colors duration-300"
                      style={{ color: "var(--color-error)" }}
                    >
                      {form.formState.errors.image.message}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="container-port" className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                    {t("container.create.portLabel", language) || "Port"}
                  </Label>
                  <Input
                    id="container-port"
                    type="text"
                    {...form.register("port")}
                    className="h-11 transition-colors duration-300"
                    placeholder={t("container.create.portPlaceholder", language) || "e.g., 8080"}
                    disabled={isCreating}
                  />
                  {form.formState.errors.port && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm transition-colors duration-300"
                      style={{ color: "var(--color-error)" }}
                    >
                      {form.formState.errors.port.message}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="server-select" className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                    {t("container.create.serverLabel", language) || "Server"}
                  </Label>
                  <Select
                    onValueChange={(value) => form.setValue("serverId", value)}
                    value={form.watch("serverId")}
                    disabled={isCreating || workspaceServers.length === 0}
                  >
                    <SelectTrigger
                      id="server-select"
                      className="h-11 transition-colors duration-300"
                    >
                      <SelectValue placeholder={t("container.create.serverPlaceholder", language) || "Select a server"} />
                    </SelectTrigger>
                    <SelectContent 
                      className="transition-colors duration-300"
                      style={{
                        backgroundColor: "var(--color-card)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      {workspaceServers.length === 0 ? (
                        <SelectItem value="no-servers" disabled>
                          {t("container.create.noServersAvailable", language) || "No servers available"}
                        </SelectItem>
                      ) : (
                        workspaceServers.map((server) => (
                          <SelectItem key={server.id} value={server.id}>
                            {server.name} ({server.region})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.serverId && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm transition-colors duration-300"
                      style={{ color: "var(--color-error)" }}
                    >
                      {form.formState.errors.serverId.message}
                    </motion.p>
                  )}
                </div>

                <div className="flex items-center gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    onClick={handleClose}
                    disabled={isCreating}
                    variant="outline"
                    className="transition-colors duration-300"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-secondary)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-text)";
                      e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-text-secondary)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {t("container.create.cancelButton", language) || "Cancel"}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreating || workspaceServers.length === 0}
                    className="transition-all duration-300 font-semibold"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
                      color: "var(--color-primary-foreground)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px var(--color-primary)50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {isCreating ? (
                      <span className="flex items-center">
                        <Plus className="w-5 h-5 mr-2 animate-spin" />
                        {t("container.create.creatingButton", language) || "Creating..."}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Plus className="w-5 h-5 mr-2" />
                        {t("container.create.createButton", language) || "Create Container"}
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

