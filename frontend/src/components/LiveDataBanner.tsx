/**
 * LiveDataBanner — compact strip that proves the backend hook on this
 * page is live, while the body below still renders hardcoded design.
 *
 * When the body rewrite is complete on a given page, delete the banner
 * import and the JSX line.
 */
import type { Resource } from '../lib/hooks';

interface Stat {
  label: string;
  value: string;
}

export function LiveDataBanner<T>({
  resource,
  stats,
  label,
}: {
  resource: Resource<T>;
  /** Derive 3-5 stats from the resource payload when it's loaded. */
  stats: (data: T) => Stat[];
  /** Short name for what's being shown, e.g. "Channel Performance". */
  label: string;
}) {
  let content;
  if (resource.loading) {
    content = <span style={{ color: '#8C92AC' }}>Loading {label.toLowerCase()}…</span>;
  } else if (resource.error) {
    content = <span style={{ color: '#d46a6a' }}>Couldn't load: {resource.error}</span>;
  } else if (!resource.data) {
    content = <span style={{ color: '#8C92AC' }}>No data yet.</span>;
  } else {
    const items = stats(resource.data);
    content = (
      <div style={styles.stats}>
        {items.map((s) => (
          <div key={s.label} style={styles.stat}>
            <div style={styles.statLabel}>{s.label}</div>
            <div style={styles.statValue}>{s.value}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.tag}>● live · {label}</div>
      {content}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    margin: '16px 28px 0',
    padding: '10px 14px',
    background: '#f4f6fb',
    border: '1px solid #dde2ec',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    fontSize: 13,
    fontFamily: 'system-ui, sans-serif',
  },
  tag: {
    color: '#3a8f5a',
    fontWeight: 600,
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
  },
  stats: { display: 'flex', gap: 22, flexWrap: 'wrap' },
  stat: { display: 'flex', flexDirection: 'column' },
  statLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#8C92AC',
  },
  statValue: { fontSize: 13, fontWeight: 600, color: '#0F1535' },
};
