import { useRef, useState } from 'react';
import { money, label } from '../utils/format';

export default function ItemGrid({ items }) {
  const [sel, setSel] = useState(null), dlg = useRef();
  const open = (i) => { setSel(i); requestAnimationFrame(() => dlg.current?.showModal()); };
  return (<>
    <div className="item-grid">{items.map((i) => (
      <button key={i.id} className="card item-card" onClick={() => open(i)}>
        <div className="item-art">{i.iconUrl ? <img src={i.iconUrl} alt="" loading="lazy" /> : '✦'}</div>
        <div className="item-body"><div className="item-name">{label(i)}</div><div className="item-sub">{i.wear}</div>
          <div className="item-bottom"><span className="condition">×{i.qty}</span><span className="price">{money(i.price)}</span></div></div>
      </button>))}</div>
    <dialog ref={dlg} className="modal" onClick={(e) => e.target === dlg.current && dlg.current.close()}>
      {sel && <div>
        <h2>{label(sel)}</h2><p className="muted">{sel.wear} · quantity {sel.qty}</p>
        <table className="rank-table"><tbody>
          {Object.entries(sel.prices).map(([src, p]) => <tr key={src}><td>{src}</td><td>{money(p)}</td></tr>)}
          <tr><td>Total ({sel.qty}×)</td><td>{money(sel.total)}</td></tr></tbody></table>
        <button className="primary" onClick={() => dlg.current.close()}>Close</button></div>}
    </dialog>
  </>);
}
