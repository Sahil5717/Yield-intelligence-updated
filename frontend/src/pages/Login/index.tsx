import { useEffect, useState, type FormEvent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { api } from '../../lib/api';
import { useAuth } from '../../lib/auth';

interface DemoUser {
  username: string;
  role: string;
  password_hint: string;
}

export function Login() {
  const { user, login, loading: authLoading } = useAuth();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoUsers, setDemoUsers] = useState<DemoUser[]>([]);

  useEffect(() => {
    let cancelled = false;
    api
      .demoUsers()
      .then((res) => {
        if (!cancelled) setDemoUsers(res.demo_users || []);
      })
      .catch(() => {
        /* non-fatal — demo hints just won't show */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (authLoading) {
    return <div style={styles.shell}>Checking session…</div>;
  }
  if (user) {
    const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname;
    return <Navigate to={from || '/'} replace />;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Username and password are required.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await login(username.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (u: DemoUser) => {
    setUsername(u.username);
    setPassword(u.password_hint);
  };

  return (
    <div style={styles.shell}>
      <div style={styles.card}>
        <div style={styles.brand}>Yield Intelligence</div>
        <div style={styles.title}>Sign in</div>

        <form onSubmit={onSubmit} style={styles.form}>
          <label style={styles.label}>
            Username
            <input
              style={styles.input}
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={submitting}
              autoFocus
            />
          </label>
          <label style={styles.label}>
            Password
            <input
              style={styles.input}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
            />
          </label>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button} disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {demoUsers.length > 0 && (
          <div style={styles.demoBox}>
            <div style={styles.demoTitle}>Demo accounts</div>
            <div style={styles.demoList}>
              {demoUsers.map((u) => (
                <button
                  key={u.username}
                  type="button"
                  onClick={() => fillDemo(u)}
                  style={styles.demoRow}
                >
                  <span style={styles.demoName}>{u.username}</span>
                  <span style={styles.demoRole}>{u.role}</span>
                </button>
              ))}
            </div>
            <div style={styles.demoHint}>
              Click a row to prefill. All demo accounts use the same password.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f1117',
    color: '#e7e9ee',
    fontFamily: 'system-ui, sans-serif',
  },
  card: {
    width: 380,
    background: '#161923',
    border: '1px solid #252a37',
    borderRadius: 12,
    padding: 32,
    boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
  },
  brand: {
    fontSize: 12,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#7a8394',
    marginBottom: 6,
  },
  title: { fontSize: 22, fontWeight: 600, marginBottom: 24 },
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  label: { display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#a7adbb' },
  input: {
    background: '#0f1117',
    border: '1px solid #2a2f3d',
    borderRadius: 6,
    padding: '10px 12px',
    color: '#e7e9ee',
    fontSize: 14,
    outline: 'none',
  },
  button: {
    marginTop: 4,
    background: '#4f8cff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '11px 14px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  error: {
    background: '#3a1a1f',
    border: '1px solid #5a2a2f',
    color: '#ffb3b3',
    padding: '8px 12px',
    borderRadius: 6,
    fontSize: 13,
  },
  demoBox: {
    marginTop: 24,
    paddingTop: 20,
    borderTop: '1px solid #252a37',
  },
  demoTitle: { fontSize: 12, color: '#7a8394', marginBottom: 10, letterSpacing: '0.04em' },
  demoList: { display: 'flex', flexDirection: 'column', gap: 4 },
  demoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'transparent',
    border: '1px solid #252a37',
    borderRadius: 6,
    padding: '8px 10px',
    cursor: 'pointer',
    color: '#e7e9ee',
    fontSize: 13,
    textAlign: 'left',
  },
  demoName: { fontFamily: 'ui-monospace, monospace' },
  demoRole: { color: '#7a8394', fontSize: 11, textTransform: 'uppercase' },
  demoHint: { fontSize: 11, color: '#5c6372', marginTop: 10 },
};
