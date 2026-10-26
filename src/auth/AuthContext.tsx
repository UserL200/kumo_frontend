import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authenticate, ENDPOINTS, session, type Role, type User } from "../lib/api";

interface SignupInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  role: Role;
}

interface AuthValue {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (input: SignupInput) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => session.user());

  const value = useMemo<AuthValue>(
    () => ({
      user,
      login: async (email, password) => {
        const u = await authenticate(ENDPOINTS.login, { email, password });
        setUser(u);
        return u;
      },
      signup: async (input) => {
        const u = await authenticate(ENDPOINTS.signup, input);
        setUser(u);
        return u;
      },
      logout: () => {
        session.clear();
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function homeFor(role: Role) {
  return role === "LANDLORD" ? "/landlord" : "/tenant";
}

export function RequireAuth({ role, children }: { role?: Role; children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  if (role && user.role !== role) return <Navigate to={homeFor(user.role)} replace />;
  return <>{children}</>;
}