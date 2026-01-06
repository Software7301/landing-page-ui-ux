import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "corsihub_user";

const defaultUser: User = {
  id: "1",
  firstName: "Max",
  lastName: "Takahashi",
  email: "autopiernovacapitalrp@gmail.com",
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(defaultUser);
      }
    } else {
      setUser(defaultUser);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}

