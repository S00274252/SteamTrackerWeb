import { USE_MOCK, API_URL } from '../config';
import { http } from './http';
const KEY = 'steamtrack_session';

export const auth = USE_MOCK ? {
  async session() { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } },
  async login(id) { const u = { steamId: id.trim() }; localStorage.setItem(KEY, JSON.stringify(u)); return u; },
  async logout() { localStorage.removeItem(KEY); },
} : {
  async session() { try { return await http('/api/auth/me'); } catch { return null; } },
  async login() { window.location.href = `${API_URL}/api/auth/steam`; },
  async logout() { await http('/api/auth/logout', { method: 'POST' }); },
};
