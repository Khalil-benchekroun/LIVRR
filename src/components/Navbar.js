import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const { user } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) { navigate(`/catalog?q=${encodeURIComponent(searchQ)}`); setSearchOpen(false); setSearchQ(''); }
  };

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(250,249,246,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
      transition: '0.3s ease'
    }}>
      <div className="container-wide" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'64px' }}>
        {/* Logo */}
        <Link to="/" style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:'400', letterSpacing:'0.15em', color:'var(--noir)' }}>
          LIVRR
        </Link>

        {/* Nav links — desktop */}
        <nav style={{ display:'flex', gap:'32px', alignItems:'center' }} className="desktop-nav">
          {[
            { label:'Beauté', path:'/catalog/beaute' },
            { label:'Vêtements', path:'/catalog/vetements' },
            { label:'Chaussures', path:'/catalog/chaussures' },
            { label:'Accessoires', path:'/catalog/accessoires' },
          ].map(({ label, path }) => (
            <Link key={path} to={path} style={{
              fontSize:'13px', fontWeight:'500', letterSpacing:'0.04em', textTransform:'uppercase',
              color: location.pathname === path ? 'var(--gold)' : 'var(--noir)',
              transition:'color 0.2s'
            }}>{label}</Link>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
          {searchOpen ? (
            <form onSubmit={handleSearch} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <input
                autoFocus
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Rechercher…"
                style={{ border:'none', borderBottom:'1px solid var(--noir)', background:'transparent', fontSize:'14px', outline:'none', width:'160px', padding:'4px 0' }}
                onBlur={() => { if (!searchQ) setSearchOpen(false); }}
              />
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} style={{ color:'var(--noir)', display:'flex', alignItems:'center' }}>
              <SearchIcon />
            </button>
          )}

          <Link to="/cart" style={{ position:'relative', color:'var(--noir)', display:'flex', alignItems:'center' }}>
            <CartIcon />
            {itemCount > 0 && (
              <span style={{
                position:'absolute', top:'-8px', right:'-8px',
                background:'var(--gold)', color:'var(--noir)',
                fontSize:'10px', fontWeight:'600',
                width:'18px', height:'18px', borderRadius:'50%',
                display:'flex', alignItems:'center', justifyContent:'center'
              }}>{itemCount}</span>
            )}
          </Link>

          <Link to={user ? '/profile' : '/login'} style={{ color:'var(--noir)', display:'flex', alignItems:'center' }}>
            <UserIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}
