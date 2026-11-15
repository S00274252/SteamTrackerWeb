import { USE_STEAM_LOGIN, API_URL } from '../config';
import { http } from './http';

const KEY = 'steamtrack_session';

// Login by typing a Steam ID
const manual = {
  async session() { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } },
  async login(id) { const u = { steamId: id.trim() }; localStorage.setItem(KEY, JSON.stringify(u)); return u; },
  async logout() { localStorage.removeItem(KEY); },
};

// Real Steam OpenID
const openid = {
  async session() { try { return await http('/api/auth/me'); } catch { return null; } },
  async login() { window.location.href = `${API_URL}/api/auth/steam`; },
  async logout() { await http('/api/auth/logout', { method: 'POST' }); },
};

export const auth = USE_STEAM_LOGIN ? openid : manual;