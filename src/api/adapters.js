const ICON = 'https://community.cloudflare.steamstatic.com/economy/image/';
export function parseName(hash) {
  const m = hash.match(/^(.*?)\s*\|\s*(.*?)\s*(?:\(([^)]+)\))?$/); // "AK-47 | Redline (Field-Tested)"
  return m ? { name: m[1], skin: m[2], wear: m[3] || '' } : { name: hash, skin: '', wear: '' };
}
export const toItem = (v) => ({
  id: v.marketHashName, ...parseName(v.marketHashName),
  iconUrl: !v.iconUrl ? null : v.iconUrl.startsWith('http') ? v.iconUrl : `${ICON}${v.iconUrl}/256fx256f`,
  qty: v.quantity, price: v.bestPrice, total: v.totalValue, prices: v.prices || {},
});
