import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Gate({ children }) {
  const { user, account, error, booting } = useAuth();
  if (booting) return <p className="empty">Loading…</p>;
  if (!user) return (
    <div className="empty"><p>Connect your Steam account to see your values.</p>
      <Link className="primary btn-link" to="/login">Connect Steam</Link></div>);
  if (error) return <p className="message">{error}</p>;
  if (!account) return <p className="empty">Loading your account…</p>;
  return children(account);
}

export function Protected({ children }) {
  const { user, booting } = useAuth();
  if (booting) return null;
  return user ? children : <Navigate to="/login" replace />;
}
