import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Server {
  id: string;
  name: string;
  region: string;
  status: "online" | "offline";
  agentConnected: boolean;
  cpuUsage: number;
  ramUsage: number;
  workspaceId: string;
  createdAt: Date;
  ip?: string;
  os?: string;
}

interface ServerContextType {
  servers: Server[];
  getServersByWorkspace: (workspaceId: string) => Server[];
  createServer: (name: string, region: string, workspaceId: string) => Server;
  updateServer: (id: string, updates: Partial<Server>) => void;
  deleteServer: (id: string) => void;
  restartServer: (id: string) => void;
  stopServer: (id: string) => void;
  startServer: (id: string) => void;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export function ServerProvider({ children }: { children: ReactNode }) {
  const [servers, setServers] = useState<Server[]>(() => {
    const stored = localStorage.getItem('servers');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('servers', JSON.stringify(servers));
  }, [servers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setServers(prev => prev.map(server => {
        if (server.status === 'online' && server.agentConnected) {
          const cpuChange = (Math.random() - 0.5) * 5;
          const ramChange = (Math.random() - 0.5) * 3;
          
          return {
            ...server,
            cpuUsage: Math.max(0, Math.min(100, server.cpuUsage + cpuChange)),
            ramUsage: Math.max(0, Math.min(100, server.ramUsage + ramChange)),
          };
        }
        return server;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getServersByWorkspace = (workspaceId: string): Server[] => {
    return servers.filter(s => s.workspaceId === workspaceId);
  };

  const createServer = (name: string, region: string, workspaceId: string): Server => {
    const newServer: Server = {
      id: `server-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      region,
      status: "offline",
      agentConnected: false,
      cpuUsage: 0,
      ramUsage: 0,
      workspaceId,
      createdAt: new Date(),
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      os: "Ubuntu 22.04 LTS",
    };

    setServers(prev => [...prev, newServer]);
    return newServer;
  };

  const updateServer = (id: string, updates: Partial<Server>) => {
    setServers(prev => prev.map(server => 
      server.id === id ? { ...server, ...updates } : server
    ));
  };

  const deleteServer = (id: string) => {
    setServers(prev => prev.filter(server => server.id !== id));
  };

  const restartServer = (id: string) => {
    setServers(prev => prev.map(server => {
      if (server.id === id && server.status === 'online') {
        setTimeout(() => {
          updateServer(id, { status: 'online', agentConnected: true });
        }, 2000);
        return { ...server, status: 'offline', agentConnected: false };
      }
      return server;
    }));
  };

  const stopServer = (id: string) => {
    updateServer(id, { 
      status: 'offline', 
      agentConnected: false,
      cpuUsage: 0,
      ramUsage: 0,
    });
  };

  const startServer = (id: string) => {
    updateServer(id, { 
      status: 'online', 
      agentConnected: true,
      cpuUsage: Math.random() * 50 + 10,
      ramUsage: Math.random() * 50 + 20,
    });
  };

  return (
    <ServerContext.Provider
      value={{
        servers,
        getServersByWorkspace,
        createServer,
        updateServer,
        deleteServer,
        restartServer,
        stopServer,
        startServer,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
}

export function useServer() {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServer must be used within ServerProvider');
  }
  return context;
}

