import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import api from "../api/axios";

type User = {
  email?: string;
  username: string;
  name?: string;
  password: string;
};

interface AuthcontextType {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  // login: (user: User) => Promise<void>;
  // register: (user: User) => Promise<void>;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const Authcontext = createContext<AuthcontextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await api.get("/users/profile", { withCredentials: true });
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // const login = async (user: User) => {
  //   await api.post("/auth/login", {
  //     username: user.username,
  //     password: user.password,
  //   });
  //   await fetchUser();
  // };

  // const register = async (user: User) => {
  //   await api.post("/auth/register", {
  //     username: user.username,
  //     password: user.password,
  //     name: user.name,
  //     email: user.email,
  //   });
  // };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <Authcontext.Provider
      value={{ user, loading: isLoading, logout, fetchUser, isAuthenticated }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export default Authcontext;
