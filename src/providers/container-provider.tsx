import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Container {
  id: string;
  name: string;
  image: string;
  status: "running" | "stopped" | "restarting";
  port: string;
  serverId: string;
  serverName: string;
  workspaceId: string;
  createdAt: Date;
  cpuUsage?: number;
  ramUsage?: number;
}

interface ContainerContextType {
  containers: Container[];
  getContainersByWorkspace: (workspaceId: string) => Container[];
  createContainer: (name: string, image: string, port: string, serverId: string, serverName: string, workspaceId: string) => Container;
  updateContainer: (id: string, updates: Partial<Container>) => void;
  deleteContainer: (id: string) => void;
  startContainer: (id: string) => void;
  stopContainer: (id: string) => void;
  restartContainer: (id: string) => void;
}

const ContainerContext = createContext<ContainerContextType | undefined>(undefined);

export function ContainerProvider({ children }: { children: ReactNode }) {
  const [containers, setContainers] = useState<Container[]>(() => {
    const stored = localStorage.getItem('containers');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('containers', JSON.stringify(containers));
  }, [containers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setContainers(prev => prev.map(container => {
        if (container.status === 'running') {
          const cpuChange = (Math.random() - 0.5) * 3;
          const ramChange = (Math.random() - 0.5) * 2;
          
          return {
            ...container,
            cpuUsage: Math.max(0, Math.min(100, (container.cpuUsage || 0) + cpuChange)),
            ramUsage: Math.max(0, Math.min(100, (container.ramUsage || 0) + ramChange)),
          };
        }
        return container;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getContainersByWorkspace = (workspaceId: string): Container[] => {
    return containers.filter(c => c.workspaceId === workspaceId);
  };

  const createContainer = (
    name: string, 
    image: string, 
    port: string, 
    serverId: string, 
    serverName: string, 
    workspaceId: string
  ): Container => {
    const newContainer: Container = {
      id: `container-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      image: image.trim(),
      port,
      status: "stopped",
      serverId,
      serverName,
      workspaceId,
      createdAt: new Date(),
      cpuUsage: 0,
      ramUsage: 0,
    };

    setContainers(prev => [...prev, newContainer]);
    return newContainer;
  };

  const updateContainer = (id: string, updates: Partial<Container>) => {
    setContainers(prev => prev.map(container => 
      container.id === id ? { ...container, ...updates } : container
    ));
  };

  const deleteContainer = (id: string) => {
    setContainers(prev => prev.filter(container => container.id !== id));
  };

  const startContainer = (id: string) => {
    updateContainer(id, { 
      status: "running",
      cpuUsage: Math.random() * 30 + 5,
      ramUsage: Math.random() * 40 + 10,
    });
  };

  const stopContainer = (id: string) => {
    updateContainer(id, { 
      status: "stopped",
      cpuUsage: 0,
      ramUsage: 0,
    });
  };

  const restartContainer = (id: string) => {
    const container = containers.find(c => c.id === id);
    if (container && container.status === 'running') {
      updateContainer(id, { status: "restarting" });
      setTimeout(() => {
        updateContainer(id, { 
          status: "running",
          cpuUsage: Math.random() * 30 + 5,
          ramUsage: Math.random() * 40 + 10,
        });
      }, 2000);
    }
  };

  return (
    <ContainerContext.Provider
      value={{
        containers,
        getContainersByWorkspace,
        createContainer,
        updateContainer,
        deleteContainer,
        startContainer,
        stopContainer,
        restartContainer,
      }}
    >
      {children}
    </ContainerContext.Provider>
  );
}

export function useContainer() {
  const context = useContext(ContainerContext);
  if (!context) {
    throw new Error('useContainer must be used within ContainerProvider');
  }
  return context;
}

