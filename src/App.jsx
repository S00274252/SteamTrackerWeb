import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { Protected } from './components/Gate';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Compare from './pages/Compare';
import Profile from './pages/Profile';
import Top10 from './pages/Top10';
import Login from './pages/Login';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="compare" element={<Compare />} />
        <Route path="profile" element={<Profile />} />
        <Route path="top" element={<Protected><Top10 /></Protected>} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<p className="empty">Page not found.</p>} />
      </Route>
    </Routes>
  );
}
