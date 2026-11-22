import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USE_STEAM_LOGIN } from '../config';

export default function Login() {
  const { login } = useAuth(), go = useNavigate(), [id, setId] = useState('');
  const manual = !USE_STEAM_LOGIN;
  const submit = async (e) => {
    e.preventDefault();
    if (manual && !id.trim()) return;
    await login(id);
    go('/profile');
  };
  return (
    <form className="login" onSubmit={submit}>
      <h1 className="title">Connect Steam</h1>
      {manual && <>
        <p className="muted">Enter your Steam ID or vanity name. Your profile and inventory must be public.</p>
        <input className="search" value={id} onChange={(e) => setId(e.target.value)}
               placeholder="Steam ID or vanity name" aria-label="Steam ID or vanity name" autoFocus />
      </>}
      <button className="primary" disabled={manual && !id.trim()}>Sign in with Steam</button>
    </form>
  );
}