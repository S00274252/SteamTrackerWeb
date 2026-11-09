import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const cls = ({ isActive }) => (isActive ? 'active' : '');

export default function Layout() {
  const { user, logout } = useAuth(), go = useNavigate();
  const search = (e) => { e.preventDefault(); const q = new FormData(e.target).get('q').trim(); go(q ? `/inventory?q=${encodeURIComponent(q)}` : '/inventory'); };
  return (
    <div className="shell">
      <header className="topbar"><div className="frame topinner">
        <Link to="/" className="brand"><span className="brandmark" aria-hidden="true">◉</span>SteamTrack</Link>
        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/" end className={cls}>Home</NavLink>
          <NavLink to="/inventory" className={cls}>Inventory</NavLink>
          <NavLink to="/compare" className={cls}>Compare</NavLink>
          <NavLink to="/profile" className={cls}>Profile</NavLink>
          {user && <NavLink to="/top" className={cls}>Top 10</NavLink>}
        </nav>
        <form className="header-actions" role="search" onSubmit={search}>
          <input name="q" className="search" type="search" placeholder="Search your inventory..." aria-label="Search your inventory" />
          {user
            ? <button type="button" className="primary" onClick={logout}>Log out ({user.steamId})</button>
            : <Link to="/login" className="primary btn-link">Connect Steam</Link>}
        </form>
      </div></header>
      <main className="frame"><Outlet /></main>
    </div>
  );
}
