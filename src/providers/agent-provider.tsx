import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Agent {
  id: string;
  name: string;
  status: "online" | "offline";
  lastHeartbeat: string;
  version: string;
  serverName: string;
  serverId: string;
  workspaceId: string;
  cpuUsage: number;
  ramUsage: number;
  createdAt: Date;
}

interface AgentContextType {
  agents: Agent[];
  getAgentsByWorkspace: (workspaceId: string) => Agent[];
  createAgent: (name: string, serverId: string, serverName: string, workspaceId: string) => Agent;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  startAgent: (id: string) => void;
  stopAgent: (id: string) => void;
  restartAgent: (id: string) => void;
  updateAgentVersion: (id: string) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(() => {
    const stored = localStorage.getItem('agents');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((a: any) => ({
          ...a,
          createdAt: new Date(a.createdAt),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('agents', JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status === 'online') {
          const cpuChange = (Math.random() - 0.5) * 3;
          const ramChange = (Math.random() - 0.5) * 2;
          
          const secondsAgo = Math.floor(Math.random() * 10) + 1;
          
          return {
            ...agent,
            cpuUsage: Math.max(0, Math.min(100, agent.cpuUsage + cpuChange)),
            ramUsage: Math.max(0, Math.min(100, agent.ramUsage + ramChange)),
            lastHeartbeat: secondsAgo < 60 ? `${secondsAgo}s ago` : `${Math.floor(secondsAgo / 60)}m ago`,
          };
        }
        return agent;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAgentsByWorkspace = (workspaceId: string): Agent[] => {
    return agents.filter(a => a.workspaceId === workspaceId);
  };

  const createAgent = (name: string, serverId: string, serverName: string, workspaceId: string): Agent => {
    const newAgent: Agent = {
      id: `agent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      status: "offline",
      lastHeartbeat: "never",
      version: "v2.0.5",
      serverId,
      serverName: serverName.trim(),
      workspaceId,
      cpuUsage: 0,
      ramUsage: 0,
      createdAt: new Date(),
    };

    setAgents(prev => [...prev, newAgent]);
    return newAgent;
  };

  const updateAgent = (id: string, updates: Partial<Agent>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, ...updates } : agent
    ));
  };

  const deleteAgent = (id: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
  };

  const startAgent = (id: string) => {
    updateAgent(id, { 
      status: "online",
      cpuUsage: Math.random() * 20 + 5,
      ramUsage: Math.random() * 30 + 10,
      lastHeartbeat: "1s ago",
    });
  };

  const stopAgent = (id: string) => {
    updateAgent(id, { 
      status: "offline",
      cpuUsage: 0,
      ramUsage: 0,
    });
  };

  const restartAgent = (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (agent && agent.status === 'online') {
      updateAgent(id, { status: "offline", cpuUsage: 0, ramUsage: 0 });
      setTimeout(() => {
        updateAgent(id, { 
          status: "online",
          cpuUsage: Math.random() * 20 + 5,
          ramUsage: Math.random() * 30 + 10,
          lastHeartbeat: "1s ago",
        });
      }, 2000);
    }
  };

  const updateAgentVersion = (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (agent) {
      const currentVersion = parseFloat(agent.version.replace('v', ''));
      const newVersion = `v${(currentVersion + 0.1).toFixed(1)}`;
      updateAgent(id, { version: newVersion });
    }
  };

  return (
    <AgentContext.Provider
      value={{
        agents,
        getAgentsByWorkspace,
        createAgent,
        updateAgent,
        deleteAgent,
        startAgent,
        stopAgent,
        restartAgent,
        updateAgentVersion,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within AgentProvider');
  }
  return context;
}

