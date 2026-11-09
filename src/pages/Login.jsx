import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USE_MOCK } from '../config';

export default function Login() {
  const { login } = useAuth(), go = useNavigate(), [id, setId] = useState('crysouled');
  const submit = async (e) => { e.preventDefault(); await login(id); go('/profile'); };
  return (
    <form className="login" onSubmit={submit}>
      <h1 className="title">Connect Steam</h1>
      {USE_MOCK && <>
        <p className="muted">Demo mode: any Steam ID or vanity name gets its own generated account.</p>
        <input className="search" value={id} onChange={(e) => setId(e.target.value)} aria-label="Steam ID or vanity name" />
      </>}
      <button className="primary">Sign in with Steam</button>
    </form>
  );
}
