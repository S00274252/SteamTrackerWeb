import { API_URL } from '../config';
export async function http(path, opts = {}) {
  const res = await fetch(API_URL + path, { credentials: 'include', ...opts });
  if (!res.ok) {
    let detail = '';
    try { detail = (await res.json()).detail; } catch { /* no body */ }
    const err = new Error(detail || res.statusText); err.status = res.status; throw err;
  }
  return res.json();
}
