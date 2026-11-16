import { http } from './http';
import { toItem } from './adapters';

export async function getAccount(id) {
  const q = encodeURIComponent(id);
  const [p, inv, g] = await Promise.all([
    http(`/api/profiles/${q}`),
    http(`/api/inventory/${q}?top=10`),
    http(`/api/games/${q}`).catch((e) => ({ error: e.message })), 
  ]);
  const games = g.error ? null : g;
  return {
    profile: { steamId: p.steamId, name: p.personaName, avatarUrl: p.avatarUrl, profileUrl: p.profileUrl,
               level: null, country: null, gamesOwned: games?.gamesCount ?? null, friends: [] },
    values: {
      total: inv.totalValue + (games?.totalLowestPrice ?? 0),
      games: games?.totalLowestPrice ?? null,     
      gamesCurrent: games?.totalCurrentPrice ?? null,
      gamesFull: games?.totalFullPrice ?? null,
      inventory: inv.totalValue,
      items: inv.totalItems, pending: inv.pendingItems,
    },
    items: inv.items.map(toItem), top: inv.topItems.map(toItem),
    games: games?.games ?? [], topGames: games?.topGames ?? [],
    gamesWarning: games ? games.warning : `Games unavailable: ${g.error}`,
  };
}

