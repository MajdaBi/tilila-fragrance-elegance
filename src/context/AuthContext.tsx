import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User { name: string; email: string; }
interface AuthCtx {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);
const USERS_KEY = "tilila_users";
const SESSION_KEY = "tilila_session";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const s = localStorage.getItem(SESSION_KEY);
    if (s) setUser(JSON.parse(s));
  }, []);

  const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

  const signup = (name: string, email: string, password: string) => {
    const users = getUsers();
    if (users.find((u: any) => u.email === email)) return false;
    users.push({ name, email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const u = { name, email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
    return true;
  };

  const login = (email: string, password: string) => {
    const users = getUsers();
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) return false;
    const u = { name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
