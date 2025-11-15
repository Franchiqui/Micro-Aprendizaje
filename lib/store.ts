import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import pb from '@/lib/pocketbase';
import React from 'react';

// Define the auth state interface
interface AuthState {
  user: any | null;
  isLoading: boolean;
  init: () => void;
  setUser: (user: any | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}

// Create context
const StoreContext = createContext<AuthState | undefined>(undefined);

// Provider component
export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const init = () => {
    setUser(pb.authStore.model);
    setIsLoading(false);
    
    pb.authStore.onChange((token, model) => {
      setUser(model);
    });
  };

  const setUserState = (user: any | null) => {
    setUser(user);
    setIsLoading(false);
  };

  const setIsLoadingState = (loading: boolean) => {
    setIsLoading(loading);
  };

  const logout = () => {
    pb.authStore.clear();
    setUser(null);
  };

  useEffect(() => {
    init();
  }, []);

  const value: AuthState = {
    user,
    isLoading,
    init,
    setUser: setUserState,
    setIsLoading: setIsLoadingState,
    logout,
  };

  return React.createElement(
  StoreContext.Provider,
  { value },
  children
);
}

// Hook to use the store
export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}