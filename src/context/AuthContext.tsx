import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface User { name: string; email: string; role: "admin" | "user"; }
interface AuthCtx {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);
const USERS_KEY = "tilila_users";
const SESSION_KEY = "tilila_session";

const ADMIN_EMAIL = "admin@tilila.ma";
const ADMIN_PASSWORD = "admin123";
const ADMIN_NAME = "Tilila Admin";

const seedAdmin = () => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    if (!users.find((u: any) => u.email === ADMIN_EMAIL)) {
      users.push({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: "admin" });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  } catch {}
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    seedAdmin();
    const s = localStorage.getItem(SESSION_KEY);
    if (s) {
      try {
        const parsed = JSON.parse(s);
        // backward-compat: ensure role
        if (!parsed.role) parsed.role = parsed.email === ADMIN_EMAIL ? "admin" : "user";
        setUser(parsed);
      } catch {}
    }
  }, []);

  const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

  const signup = (name: string, email: string, password: string) => {
    const users = getUsers();
    if (users.find((u: any) => u.email === email)) return false;
    const role: "admin" | "user" = email === ADMIN_EMAIL ? "admin" : "user";
    users.push({ name, email, password, role });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const u: User = { name, email, role };
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
    return true;
  };

  const login = (email: string, password: string) => {
    const users = getUsers();
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) return false;
    const role: "admin" | "user" = found.role || (email === ADMIN_EMAIL ? "admin" : "user");
    const u: User = { name: found.name, email: found.email, role };
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.role === "admin", login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
