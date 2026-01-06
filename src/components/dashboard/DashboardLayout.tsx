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

function DashboardContent() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--color-sidebar)" }}>
      <DashboardSidebar />
      <div className="ml-64">
        <DashboardHeader />
        <main 
          className="p-8 min-h-screen transition-colors duration-300"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
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

