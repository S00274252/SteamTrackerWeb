import { money } from '../utils/format';
export default function Metrics({ items }) {
  return <div className="metrics">{items.map(([l, v, raw]) => (
    <div className="metric" key={l}><div className="metric-label">{l}</div><div className="metric-value">{raw ? (v ?? '—') : money(v)}</div></div>))}</div>;
}
