import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';

const NAV = [
  { to: '/', num: '01', label: 'Executive Summary' },
  { to: '/opportunities', num: '02', label: 'Opportunities' },
  { to: '/performance', num: '03', label: 'Performance' },
  { to: '/attribution', num: '04', label: 'Attribution & Data Trust' },
  { to: '/optimize', num: '05', label: 'Optimize & Simulate' },
  { to: '/plan', num: '06', label: 'Plan', disabled: true },
  { to: '/track', num: '07', label: 'Track & Report', disabled: true },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">YI</div>
          Yield Intelligence
        </div>
        {NAV.map((item) =>
          item.disabled ? (
            <span
              key={item.num}
              className="nav-item"
              style={{ opacity: 0.4, cursor: 'not-allowed' }}
            >
              <span className="nav-num">{item.num}</span> {item.label}
            </span>
          ) : (
            <NavLink
              key={item.num}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                'nav-item' + (isActive ? ' active' : '')
              }
            >
              <span className="nav-num">{item.num}</span> {item.label}
            </NavLink>
          ),
        )}
        <div className="nav-divider" />
        <div className="nav-section-label">Context</div>
        <a href="#" className="nav-item">
          <span className="nav-num">◉</span> Workspaces
        </a>
        <a href="#" className="sidebar-footer">
          <strong>Acme Retail · FY2025</strong>
          Budget Review · Sarah Rahman
          <div className="footer-switch">Switch engagement →</div>
        </a>
      </aside>
      {children}
    </div>
  );
}
