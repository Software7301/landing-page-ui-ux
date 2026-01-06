import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Workspace {
  id: string;
  name: string;
  createdAt: Date;
}

interface WorkspaceContextType {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  createWorkspace: (name: string) => Workspace;
  updateWorkspace: (id: string, updates: Partial<Workspace>) => void;
  setActiveWorkspace: (workspace: Workspace | null) => void;
  hasWorkspaces: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => {
    const stored = localStorage.getItem('workspaces');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((w: any) => ({
          ...w,
          createdAt: new Date(w.createdAt),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  const [activeWorkspace, setActiveWorkspaceState] = useState<Workspace | null>(() => {
    const stored = localStorage.getItem('activeWorkspaceId');
    if (stored && workspaces.length > 0) {
      const found = workspaces.find(w => w.id === stored);
      return found || null;
    }
    return workspaces.length > 0 ? workspaces[0] : null;
  });

  useEffect(() => {
    localStorage.setItem('workspaces', JSON.stringify(workspaces));
  }, [workspaces]);

  useEffect(() => {
    if (activeWorkspace) {
      localStorage.setItem('activeWorkspaceId', activeWorkspace.id);
    } else {
      localStorage.removeItem('activeWorkspaceId');
    }
  }, [activeWorkspace]);

  const createWorkspace = (name: string): Workspace => {
    const newWorkspace: Workspace = {
      id: `workspace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      createdAt: new Date(),
    };

    setWorkspaces(prev => [...prev, newWorkspace]);
    setActiveWorkspaceState(newWorkspace);
    
    return newWorkspace;
  };

  const updateWorkspace = (id: string, updates: Partial<Workspace>) => {
    setWorkspaces(prev => prev.map(workspace => 
      workspace.id === id ? { ...workspace, ...updates } : workspace
    ));
    
    if (activeWorkspace?.id === id) {
      setActiveWorkspaceState(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const setActiveWorkspace = (workspace: Workspace | null) => {
    setActiveWorkspaceState(workspace);
  };

  const hasWorkspaces = workspaces.length > 0;

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        activeWorkspace,
        createWorkspace,
        updateWorkspace,
        setActiveWorkspace,
        hasWorkspaces,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return context;
}

