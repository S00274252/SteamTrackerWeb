import { Gate } from '../components/Gate';
import { money, label } from '../utils/format';

export default function Top10() {
  return <Gate>{(a) => (<>
    <div className="section-head"><div><h1 className="title">Top 10 skins</h1><p>Your most valuable items by current market price.</p></div></div>
    <div className="table-wrap"><table className="rank-table">
      <thead><tr><th>Rank</th><th>Item</th><th>Condition</th><th>Price</th></tr></thead>
      <tbody>{a.top.map((i, n) => <tr key={i.id}><td>{n + 1}</td><td>{label(i)}</td><td>{i.wear}</td><td>{money(i.total)}</td></tr>)}</tbody>
    </table></div></>)}</Gate>;
}
