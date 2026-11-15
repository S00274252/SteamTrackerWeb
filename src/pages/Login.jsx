import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MANUAL_LOGIN, USE_MOCK } from '../config';

export default function Login() {
  const { login } = useAuth(), go = useNavigate(), [id, setId] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    if (MANUAL_LOGIN && !id.trim()) return;
    await login(id);
    go('/profile');
  };
  return (
    <form className="login" onSubmit={submit}>
      <h1 className="title">Connect Steam</h1>
      {MANUAL_LOGIN && <>
        <p className="muted">
          {USE_MOCK
            ? 'Demo mode: any Steam ID or vanity name gets its own generated account.'
            : 'Enter your Steam ID or vanity name. Your profile and inventory must be public.'}
        </p>
        <input className="search" value={id} onChange={(e) => setId(e.target.value)}
               placeholder="Steam ID or vanity name" aria-label="Steam ID or vanity name" autoFocus />
      </>}
      <button className="primary" disabled={MANUAL_LOGIN && !id.trim()}>Sign in with Steam</button>
    </form>
  );
}