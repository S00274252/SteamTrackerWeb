import { useState } from 'react';
import { Gate } from '../components/Gate';
import { getAccount } from '../api';
import { money } from '../utils/format';

function View({ me }) {
  const [id, setId] = useState(''), [other, setOther] = useState(null), [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  const run = async (target) => { setBusy(true); setErr('');
    try { setOther(await getAccount(target)); } catch (e) { setErr(e.message); setOther(null); } finally { setBusy(false); } };
  const rows = [['Total account value', 'total'], ['Games value', 'games'], ['Inventory value', 'inventory']];
  return (<>
    <div className="section-head"><div><h1 className="title">Compare profiles</h1><p>See how your games and inventory stack up.</p></div></div>
    <form className="header-actions" onSubmit={(e) => { e.preventDefault(); run(id); }}>
      <input className="search" value={id} onChange={(e) => setId(e.target.value)} placeholder="Steam ID or vanity name" aria-label="Player to compare" />
      <button className="primary" disabled={busy}>{busy ? 'Loading…' : 'Compare'}</button>
      {me.profile.friends.map((f) => <button type="button" className="filter" key={f.steamId} onClick={() => run(f.steamId)}>{f.name}</button>)}
    </form>
    {err && <p className="message">{err}</p>}
    {other && <>
      <div className="compare-grid">
        {[me, other].map((a, n) => <article key={n} className={`compare-card ${n ? '' : 'accent'}`}><div className="eyebrow">{n ? 'Player' : 'You'}</div>
          <h2>{a.profile.name}</h2><p className="muted">{a.profile.level != null ? `Level ${a.profile.level}` : ''}</p><strong>{money(a.values.total)}</strong></article>)}
      </div>
      <div className="table-wrap breakdown">
        <div className="breakdown-row heading"><span>Value breakdown</span><span>You</span><span>{other.profile.name}</span></div>
        {rows.map(([l, k]) => <div className="breakdown-row" key={k}><span>{l}</span><span>{money(me.values[k])}</span><span>{money(other.values[k])}</span></div>)}
      </div></>}
  </>);
}
export default function Compare() { return <Gate>{(a) => <View me={a} />}</Gate>; }
