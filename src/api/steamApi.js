import { http } from './http';
import { toItem } from './adapters';
export async function getAccount(id) {
  const q = encodeURIComponent(id);
  const [p, inv] = await Promise.all([http(`/api/profiles/${q}`), http(`/api/inventory/${q}?top=10`)]);
  return {
    profile: { steamId: p.steamId, name: p.personaName, avatarUrl: p.avatarUrl, profileUrl: p.profileUrl,
               level: null, country: null, gamesOwned: null, friends: [] },
    values: { total: inv.totalValue, games: null, inventory: inv.totalValue, items: inv.totalItems, pending: inv.pendingItems },
    items: inv.items.map(toItem), top: inv.topItems.map(toItem),
  };
}
