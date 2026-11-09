import { Link } from 'react-router-dom';
import { Gate } from '../components/Gate';
import Metrics from '../components/Metrics';
import ItemGrid from '../components/ItemGrid';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (<>
    <div className="hero">
      <div className="hero-copy">
        <div className="eyebrow">Your gaming portfolio</div>
        <h1 className="title">Know what your Steam account is worth.</h1>
        <p className="muted">Explore games, track your inventory and discover your most valuable skins.</p>
        <Link className="primary btn-link" to={user ? '/profile' : '/login'}>{user ? 'Explore profile' : 'Connect Steam'}</Link>
      </div>
      <div className="hero-art" aria-hidden="true">
        <svg viewBox="0 0 200 200" width="70%"><path d="M40 160 L150 30 Q170 25 175 45 L70 175 Z" fill="#a471ff"/><path d="M40 160 L28 172 L52 184 L70 175Z" fill="#c9a24a"/></svg>
      </div>
    </div>
    {user && <Gate>{(a) => (<>
      <Metrics items={[['Total account value', a.values.total], ['Games value', a.values.games], ['Inventory value', a.values.inventory], ['Items tracked', a.values.items, true]]} />
      <div className="section-head"><h2>Featured inventory</h2><Link className="text-link" to="/inventory">View all</Link></div>
      <ItemGrid items={a.items.slice(0, 4)} />
    </>)}</Gate>}
  </>);
}
