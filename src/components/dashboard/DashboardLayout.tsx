import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardPasswordGate } from "./DashboardPasswordGate";
import { WorkspaceProvider } from "@/providers/workspace-provider";
import { ServerProvider } from "@/providers/server-provider";
import { ContainerProvider } from "@/providers/container-provider";
import { DomainProvider } from "@/providers/domain-provider";
import { AgentProvider } from "@/providers/agent-provider";
import { CommandPalette } from "@/components/CommandPalette";
import { useThemeColors } from "@/lib/theme-colors";

function DashboardContent() {
  const [commandOpen, setCommandOpen] = useState(false);
  const colors = useThemeColors();

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: colors.sidebarBg }}>
      <DashboardSidebar />
      <div className="ml-64">
        <DashboardHeader />
        <main 
          className="p-8 min-h-screen transition-colors duration-300"
          style={{ backgroundColor: `${colors.cardBg}80` }}
        >
          <Outlet />
        </main>
      </div>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}

export function DashboardLayout() {
  return (
    <DashboardPasswordGate>
      <WorkspaceProvider>
        <ServerProvider>
          <ContainerProvider>
            <DomainProvider>
              <AgentProvider>
                <DashboardContent />
              </AgentProvider>
            </DomainProvider>
          </ContainerProvider>
        </ServerProvider>
      </WorkspaceProvider>
    </DashboardPasswordGate>
  );
}

