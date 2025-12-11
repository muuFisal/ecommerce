import React, { createContext, useContext, useState } from 'react';

interface AuthContextValue {
  user: {
    id: number;
    name: string;
    email: string;
    type: 'user' | 'trader';
    token: string;
  } | null;
  role: 'user' | 'trader' | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextValue['user']>(null);

  const login = async (email: string, password: string) => {
    // Replace with actual API call
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    setUser(data);
    localStorage.setItem('auth-user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth-user');
  };

  const role = user?.type || null;
  const isAuthenticated = !!user;

  const value: AuthContextValue = {
    user,
    role,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return ctx;
}