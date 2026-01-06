import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Domain {
  id: string;
  domain: string;
  sslStatus: "active" | "pending" | "expired";
  containerName: string;
  dnsType: "A" | "CNAME";
  dnsValue: string;
  workspaceId: string;
  createdAt: Date;
  expiresAt?: Date;
}

interface DomainContextType {
  domains: Domain[];
  getDomainsByWorkspace: (workspaceId: string) => Domain[];
  createDomain: (domain: string, containerName: string, dnsType: "A" | "CNAME", dnsValue: string, workspaceId: string) => Domain;
  updateDomain: (id: string, updates: Partial<Domain>) => void;
  deleteDomain: (id: string) => void;
  renewSSL: (id: string) => void;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export function DomainProvider({ children }: { children: ReactNode }) {
  const [domains, setDomains] = useState<Domain[]>(() => {
    const stored = localStorage.getItem('domains');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((d: any) => ({
          ...d,
          createdAt: new Date(d.createdAt),
          expiresAt: d.expiresAt ? new Date(d.expiresAt) : undefined,
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('domains', JSON.stringify(domains));
  }, [domains]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDomains(prev => prev.map(domain => {
        if (domain.sslStatus === "active" && domain.expiresAt) {
          const now = new Date();
          const expiresAt = new Date(domain.expiresAt);
          if (now > expiresAt) {
            return { ...domain, sslStatus: "expired" };
          }
        }
        return domain;
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getDomainsByWorkspace = (workspaceId: string): Domain[] => {
    return domains.filter(d => d.workspaceId === workspaceId);
  };

  const createDomain = (
    domain: string,
    containerName: string,
    dnsType: "A" | "CNAME",
    dnsValue: string,
    workspaceId: string
  ): Domain => {
    const newDomain: Domain = {
      id: `domain-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      domain: domain.trim(),
      sslStatus: "pending",
      containerName: containerName.trim(),
      dnsType,
      dnsValue: dnsValue.trim(),
      workspaceId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    };

    setDomains(prev => [...prev, newDomain]);
    
    setTimeout(() => {
      updateDomain(newDomain.id, { sslStatus: "active" });
    }, 3000);

    return newDomain;
  };

  const updateDomain = (id: string, updates: Partial<Domain>) => {
    setDomains(prev => prev.map(domain => 
      domain.id === id ? { ...domain, ...updates } : domain
    ));
  };

  const deleteDomain = (id: string) => {
    setDomains(prev => prev.filter(domain => domain.id !== id));
  };

  const renewSSL = (id: string) => {
    const domain = domains.find(d => d.id === id);
    if (domain) {
      updateDomain(id, { 
        sslStatus: "pending",
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      });
      
      setTimeout(() => {
        updateDomain(id, { sslStatus: "active" });
      }, 3000);
    }
  };

  return (
    <DomainContext.Provider
      value={{
        domains,
        getDomainsByWorkspace,
        createDomain,
        updateDomain,
        deleteDomain,
        renewSSL,
      }}
    >
      {children}
    </DomainContext.Provider>
  );
}

export function useDomain() {
  const context = useContext(DomainContext);
  if (!context) {
    throw new Error('useDomain must be used within DomainProvider');
  }
  return context;
}

