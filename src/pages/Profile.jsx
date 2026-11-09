import { Gate } from '../components/Gate';
import Metrics from '../components/Metrics';
import { money, label } from '../utils/format';

export default function Profile() {
  return <Gate>{({ profile: p, values: v, top }) => (<>
    <div className="profile-hero">
      {p.avatarUrl ? <img className="avatar" src={p.avatarUrl} alt="" /> : <div className="avatar" aria-hidden="true">{p.name[0]}</div>}
      <div><h2>{p.name}</h2><p>{[p.level != null && `Level ${p.level}`, p.country].filter(Boolean).join(' · ')}</p></div>
      {p.profileUrl && <a className="primary btn-link" href={p.profileUrl} target="_blank" rel="noreferrer">View on Steam</a>}
    </div>
    <Metrics items={[['Total account value', v.total], ['Games value', v.games], ['Inventory value', v.inventory], ['Games owned', p.gamesOwned, true]]} />
    <div className="profile-columns">
      <section><div className="section-head"><h2>Top valuable items</h2></div>
        <div className="table-wrap"><table className="rank-table"><tbody>
          {top.slice(0, 4).map((i, n) => <tr key={i.id}><td>{n + 1}</td><td>{label(i)}</td><td>{i.wear}</td><td>{money(i.total)}</td></tr>)}</tbody></table></div></section>
      <section><div className="section-head"><h2>Top friends</h2></div>
        {p.friends.length ? p.friends.map((f) => <div className="friend" key={f.steamId}><strong>{f.name}</strong> · Level {f.level}<p>{money(f.totalValue)}</p></div>)
          : <p className="muted">Friends are not available yet.</p>}</section>
    </div></>)}</Gate>;
}
