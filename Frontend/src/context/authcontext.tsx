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
  login: (user: User) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const Authcontext = createContext<AuthcontextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const res = await api.get("/users/profile");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (user: User) => {
    await api.post("/auth/login", {
      username: user.username,
      password: user.password,
    });
    await fetchUser();
  };

  const register = async (user: User) => {
    await api.post("/auth/register", {
      username: user.username,
      password: user.password,
      name: user.name,
      email: user.email,
    });
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <Authcontext.Provider
      value={{ user, loading: isLoading, login, register, logout }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export default Authcontext;
