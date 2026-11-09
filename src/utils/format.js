import { CURRENCY } from '../config';
const f = new Intl.NumberFormat('en-IE', { style: 'currency', currency: CURRENCY });
export const money = (v) => (v == null ? '—' : f.format(v));
export const label = (i) => (i.skin ? `${i.name} | ${i.skin}` : i.name);
