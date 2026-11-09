import { createContext, useContext, useEffect, useState } from 'react';
import { auth, getAccount } from '../api';
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null), [account, setAccount] = useState(null);
  const [error, setError] = useState(''), [booting, setBooting] = useState(true);
  useEffect(() => { auth.session().then(setUser).finally(() => setBooting(false)); }, []);
  useEffect(() => {
    setAccount(null); setError('');
    if (!user) return;
    let live = true;
    getAccount(user.steamId).then((a) => live && setAccount(a)).catch((e) => live && setError(e.message));
    return () => { live = false; };
  }, [user]);
  const login = async (id) => { const u = await auth.login(id); if (u) setUser(u); };
  const logout = async () => { await auth.logout(); setUser(null); };
  return <Ctx.Provider value={{ user, account, error, booting, login, logout }}>{children}</Ctx.Provider>;
}
