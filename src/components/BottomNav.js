import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const icons = {
  home: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  catalog: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  cart: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  orders: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  profile: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
};

export default function BottomNav() {
  const { pathname } = useLocation();
  const { itemCount } = useCart();

  const navItems = [
    { icon: 'home', label: 'Accueil', path: '/' },
    { icon: 'catalog', label: 'Catalogue', path: '/catalog' },
    { icon: 'cart', label: 'Panier', path: '/cart', badge: itemCount },
    { icon: 'orders', label: 'Commandes', path: '/orders' },
    { icon: 'profile', label: 'Profil', path: '/profile' },
  ];

  const isActive = (path) => path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'rgba(10,10,15,0.95)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(201,169,110,0.15)',
      display: 'flex',
      zIndex: 50,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {navItems.map(item => (
        <Link key={item.path} to={item.path} style={{
          flex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '10px 0 8px',
          gap: '3px',
          color: isActive(item.path) ? 'var(--gold)' : 'rgba(255,255,255,0.45)',
          transition: 'color 0.2s',
          position: 'relative',
        }}>
          <span style={{ position: 'relative' }}>
            {icons[item.icon]}
            {item.badge > 0 && (
              <span style={{
                position: 'absolute', top: '-6px', right: '-8px',
                background: 'var(--gold)', color: 'var(--noir)',
                fontSize: '9px', fontWeight: '600',
                minWidth: '16px', height: '16px',
                borderRadius: '8px', padding: '0 3px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{item.badge}</span>
            )}
          </span>
          <span style={{ fontSize: '10px', fontWeight: '400', letterSpacing: '0.02em' }}>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
