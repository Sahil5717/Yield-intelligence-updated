/**
 * Auth context: login, logout, current user.
 *
 * Tokens live in localStorage; on mount we try to validate the stored
 * token with /api/auth/me before trusting it. If it fails, we clear and
 * render as signed-out.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  api,
  clearToken,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
  type AuthUser,
  ApiError,
} from './api';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [loading, setLoading] = useState<boolean>(!!getToken());
  const [error, setError] = useState<string | null>(null);

  // Validate stored token on mount
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const me = await api.me();
        if (cancelled) return;
        if (me.authenticated) {
          const u: AuthUser = {
            user_id: me.user_id,
            username: me.username,
            role: me.role as AuthUser['role'],
          };
          setUser(u);
          setStoredUser(u);
        } else {
          clearToken();
          setUser(null);
        }
      } catch {
        clearToken();
        setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setError(null);
    try {
      const res = await api.login(username, password);
      setToken(res.token);
      const u: AuthUser = {
        user_id: res.user_id,
        username: res.username,
        role: res.role,
      };
      setStoredUser(u);
      setUser(u);
    } catch (e) {
      const msg =
        e instanceof ApiError
          ? e.status === 401
            ? 'Incorrect username or password.'
            : e.message
          : 'Login failed. Please try again.';
      setError(msg);
      throw e;
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, error, login, logout }),
    [user, loading, error, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/**
 * Route guard. Redirects unauthenticated users to /login. While the
 * token is being validated, renders a neutral placeholder so routes
 * don't flicker.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ padding: 48, color: 'var(--muted, #888)' }}>
        Checking session…
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
