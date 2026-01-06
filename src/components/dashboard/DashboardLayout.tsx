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

export function DashboardLayout() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <DashboardPasswordGate>
      <WorkspaceProvider>
        <ServerProvider>
          <ContainerProvider>
            <DomainProvider>
              <AgentProvider>
                <div className="min-h-screen bg-[#060B14]">
                  <DashboardSidebar />
                  <div className="ml-64">
                    <DashboardHeader />
                    <main className="p-8 bg-[#0E1625] min-h-screen">
                      <Outlet />
                    </main>
                  </div>
                  <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
                </div>
              </AgentProvider>
            </DomainProvider>
          </ContainerProvider>
        </ServerProvider>
      </WorkspaceProvider>
    </DashboardPasswordGate>
  );
}

