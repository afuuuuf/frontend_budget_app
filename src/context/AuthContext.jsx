import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { tokenStorage } from "@/libs/tokenStorage";
import { queryClient } from "@/libs/queryClient";
import { AUTH_LOGOUT_EVENT } from "@/constants/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => tokenStorage.get());
  const [user, setUser] = useState(() => tokenStorage.getUser());

  const login = useCallback((accessToken, nextUser = null) => {
    tokenStorage.set(accessToken);
    if (nextUser) tokenStorage.setUser(nextUser);
    setToken(accessToken);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    queryClient.clear();
    setToken(null);
    setUser(null);
  }, []);

  // The axios 401 handler announces an expired session through this event.
  useEffect(() => {
    window.addEventListener(AUTH_LOGOUT_EVENT, logout);
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, logout);
  }, [logout]);

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), login, logout }),
    [token, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
