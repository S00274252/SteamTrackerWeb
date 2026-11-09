import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Gate } from '../components/Gate';
import ItemGrid from '../components/ItemGrid';
import { label } from '../utils/format';

function View({ items }) {
  const [params, setParams] = useSearchParams(), [wear, setWear] = useState('all');
  const q = (params.get('q') || '').toLowerCase();
  const wears = [...new Set(items.map((i) => i.wear).filter(Boolean))];
  const shown = items.filter((i) => (wear === 'all' || i.wear === wear) && label(i).toLowerCase().includes(q));
  return (<>
    <div className="section-head"><div><h1 className="title">Inventory</h1><p>All your items in one place. Select one for prices.</p></div></div>
    <input className="search inventory-search" type="search" placeholder="Search your inventory..." value={params.get('q') || ''} onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {})} />
    <div className="filters" role="group" aria-label="Filter by condition">
      {['all', ...wears].map((w) => <button key={w} className={`filter ${wear === w ? 'active' : ''}`} aria-pressed={wear === w} onClick={() => setWear(w)}>
        {w === 'all' ? 'All items' : w} {items.filter((i) => w === 'all' || i.wear === w).length}</button>)}
    </div>
    {shown.length ? <ItemGrid items={shown} /> : <p className="empty">No items match this search or filter.</p>}
  </>);
}
export default function Inventory() { return <Gate>{(a) => <View items={a.items} />}</Gate>; }
