const hash = (s) => { let h = 1779033703; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 3432918353); return h >>> 0; };
const rng = (a) => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const POOL = [['AK-47','Redline',10,90],['AK-47','Bloodsport',30,110],['AWP','Asiimov',25,140],['AWP','Redline',15,60],
  ['M4A1-S','Hyper Beast',20,90],['M4A1-S','Printstream',40,160],['Desert Eagle','Printstream',15,60],['USP-S','Kill Confirmed',30,90],
  ['Glock-18','Fade',90,200],['Glock-18','Candy Apple',1,5],['Karambit','Doppler',700,1500],['Bayonet','Slaughter',150,400],
  ['Sport Gloves','Scarlet Shamagh',80,220],['Sport Gloves','Slingshot',250,500],['P250','Sand Dune',0.1,0.5],['MP9','Hot Rod',5,25]];
const WEAR = [['Factory New',1.3],['Minimal Wear',1.1],['Field-Tested',1],['Well-Worn',.85],['Battle-Scarred',.7]];
const NAMES = ['Drafter','Nasvayko','slip_stream','Huesos','ILK'];
const pick = (r, a) => a[Math.floor(r() * a.length)];
const cents = (n) => Math.round(n * 100) / 100;

function build(id) {
  const r = rng(hash(id.toLowerCase())), map = new Map();
  for (let n = 15 + Math.floor(r() * 35); n--;) {
    const [w, s, lo, hi] = pick(r, POOL), [wear, k] = pick(r, WEAR), key = `${w} | ${s} (${wear})`;
    const base = cents((lo + r() * (hi - lo)) * k);
    const it = map.get(key) || { id: key, name: w, skin: s, wear, iconUrl: null, qty: 0, price: null,
      prices: { steam: cents(base * 1.05), dmarket: cents(base * .95) } };
    it.qty += 1; map.set(key, it);
  }
  const items = [...map.values()].map((i) => ({ ...i, price: Math.min(...Object.values(i.prices)) }))
    .map((i) => ({ ...i, total: cents(i.price * i.qty) })).sort((a, b) => b.total - a.total);
  const inv = cents(items.reduce((s, i) => s + i.total, 0)), owned = 20 + Math.floor(r() * 180);
  const games = cents(owned * (2 + r() * 4));
  return {
    profile: { steamId: id, name: id[0].toUpperCase() + id.slice(1), avatarUrl: null, profileUrl: null,
      level: 5 + Math.floor(r() * 80), country: pick(r, ['Ireland', 'Poland', 'Ukraine', 'Germany']), gamesOwned: owned,
      friends: Array.from({ length: 4 }, (_, n) => ({ steamId: `${id}-friend${n + 1}`, name: pick(r, NAMES), level: 5 + Math.floor(r() * 60) })) },
    values: { total: cents(inv + games), games, inventory: inv, items: items.reduce((s, i) => s + i.qty, 0), pending: 0 },
    items, top: items.slice(0, 10),
  };
}
export async function getAccount(id) {
  await new Promise((r) => setTimeout(r, 350));
  if (!id?.trim()) throw new Error('Enter a Steam ID or vanity name.');
  const a = build(id.trim());
  a.profile.friends = a.profile.friends.map((f) => ({ ...f, totalValue: build(f.steamId).values.total }));
  return a;
}
