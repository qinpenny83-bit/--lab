import { Link, NavLink, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

const DESKTOP_NAV = [
  { to: '/', label: '今日修炼', icon: '🌿' },
  { to: '/journey', label: '修炼之路', icon: '🗺️' },
  { to: '/memorize', label: '必背', icon: '📖' },
  { to: '/brain', label: '我的中医脑', icon: '🧠' },
  { to: '/map', label: '知识·经典', icon: '📚' },
];

const MOBILE_NAV = [
  { to: '/', label: '今日', icon: '🌿' },
  { to: '/journey', label: '修炼', icon: '🗺️' },
  { to: '/memorize', label: '必背', icon: '📖' },
  { to: '/brain', label: '中医脑', icon: '🧠' },
  { to: '/map', label: '知识', icon: '📚' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isPractice = /^\/(cases|observe|formula|classic|paradox|map)\/[^/]+$/.test(location.pathname);

  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-emoji">🌿</span>
          <span className="brand-name">中医修炼馆</span>
          <span className="brand-sub">不是教你背中医，而是教你学会中医的思维方式</span>
        </Link>
        <nav className="topnav">
          {DESKTOP_NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => 'topnav-link' + (isActive ? ' active' : '')}
            >
              <span className="topnav-icon">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className={'main' + (isPractice ? ' main-practice' : '')}>{children}</main>

      <nav className="bottomnav">
        {MOBILE_NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) => 'bottomnav-link' + (isActive ? ' active' : '')}
          >
            <span className="bottomnav-icon">{n.icon}</span>
            <span className="bottomnav-label">{n.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
