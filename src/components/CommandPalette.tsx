import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useWorkspace } from "@/providers/workspace-provider";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Home,
  Server,
  Briefcase,
  Container,
  Globe,
  BarChart3,
  CreditCard,
  Settings,
  FolderKanban,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { workspaces, activeWorkspace, setActiveWorkspace } = useWorkspace();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Home, path: "/dashboard/overview" },
    { id: "workspaces", label: "Workspaces", icon: FolderKanban, path: "/dashboard/workspaces" },
    { id: "servers", label: "Servers", icon: Server, path: "/dashboard/servers" },
    { id: "agents", label: "Agents", icon: Briefcase, path: "/dashboard/agents" },
    { id: "containers", label: "Containers", icon: Container, path: "/dashboard/containers" },
    { id: "domains", label: "Domains", icon: Globe, path: "/dashboard/domains" },
    { id: "metrics", label: "Metrics", icon: BarChart3, path: "/dashboard/metrics" },
    { id: "billing", label: "Billing", icon: CreditCard, path: "/dashboard/billing" },
    { id: "settings", label: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
    setSearch("");
  };

  const handleWorkspaceSelect = (workspaceId: string) => {
    setActiveWorkspace(workspaceId);
    onOpenChange(false);
    setSearch("");
  };

  const filteredNavItems = navigationItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const filteredWorkspaces = workspaces.filter((ws) =>
    ws.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <Command
        className="relative z-50 w-full max-w-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <CommandInput
          placeholder="Type a command or search..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {filteredNavItems.length > 0 && (
            <CommandGroup heading="Navigation">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleSelect(item.path)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                    <CommandShortcut>⌘{item.label[0]}</CommandShortcut>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {filteredWorkspaces.length > 0 && (
            <CommandGroup heading="Workspaces">
              {filteredWorkspaces.map((workspace) => (
                <CommandItem
                  key={workspace.id}
                  onSelect={() => handleWorkspaceSelect(workspace.id)}
                  className={cn(
                    activeWorkspace?.id === workspace.id &&
                      "bg-[#6D28D9]/20 text-[#E5E7EB]"
                  )}
                >
                  <FolderKanban className="mr-2 h-4 w-4" />
                  <span>{workspace.name}</span>
                  {activeWorkspace?.id === workspace.id && (
                    <CommandShortcut>Active</CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  );
}

