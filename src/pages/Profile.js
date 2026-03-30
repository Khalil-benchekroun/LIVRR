// Profile.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon:'📦', label:'Mes commandes', path:'/orders' },
    { icon:'⭐', label:'Programme de fidélité', path:'/fidelite' },
    { icon:'♡', label:'Mes favoris', path:'/catalog' },
    { icon:'📍', label:'Mes adresses', path:'/profile' },
    { icon:'💳', label:'Mes paiements', path:'/profile' },
    { icon:'🔔', label:'Notifications', path:'/profile' },
    { icon:'💬', label:'Aide & SAV', path:'/profile' },
  ];

  return (
    <div style={{ paddingTop:'64px', minHeight:'100vh' }}>
      {/* Header */}
      <div style={{ background:'var(--noir)', padding:'48px 0 32px' }}>
        <div className="container">
          <div style={{ display:'flex', gap:'20px', alignItems:'center' }}>
            <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'var(--gold)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:'28px', color:'var(--noir)', fontWeight:'400' }}>
              {user ? user.firstName?.[0] : 'U'}
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'28px', color:'var(--white)', fontWeight:'300' }}>{user ? `${user.firstName} ${user.lastName}` : 'Mon Profil'}</div>
              <div style={{ color:'rgba(250,249,246,0.5)', fontSize:'14px', marginTop:'4px' }}>{user?.email}</div>
              <span className="badge badge-dark" style={{ marginTop:'8px', display:'inline-block' }}>⭐ Premium</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop:'32px', paddingBottom:'80px' }}>
        {/* Points card */}
        <div style={{ background:'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', borderRadius:'var(--radius-xl)', padding:'28px 32px', marginBottom:'32px', color:'var(--noir)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontSize:'13px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.06em', opacity:0.7, marginBottom:'6px' }}>Points fidélité</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'48px', fontWeight:'400', lineHeight:'1' }}>1 250</div>
              <div style={{ fontSize:'13px', opacity:0.7, marginTop:'4px' }}>Niveau Argent · 750 pts pour le niveau Or</div>
            </div>
            <Link to="/fidelite" style={{ background:'rgba(0,0,0,0.12)', color:'var(--noir)', padding:'10px 18px', borderRadius:'var(--radius-md)', fontSize:'13px', fontWeight:'500' }}>Voir détails</Link>
          </div>
          <div style={{ background:'rgba(0,0,0,0.12)', borderRadius:'4px', height:'6px', marginTop:'20px' }}>
            <div style={{ background:'var(--noir)', opacity:0.5, height:'6px', borderRadius:'4px', width:'62%' }}/>
          </div>
        </div>

        {/* Menu */}
        <div style={{ background:'var(--white)', borderRadius:'var(--radius-xl)', overflow:'hidden', border:'1px solid rgba(0,0,0,0.06)' }}>
          {menuItems.map((item, i) => (
            <Link key={item.label} to={item.path} style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'18px 24px',
              borderBottom: i < menuItems.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
              textDecoration:'none', color:'var(--noir)',
              transition:'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='var(--white-2)'}
            onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              <div style={{ display:'flex', gap:'14px', alignItems:'center' }}>
                <span style={{ fontSize:'20px', width:'24px', textAlign:'center' }}>{item.icon}</span>
                <span style={{ fontSize:'15px' }}>{item.label}</span>
              </div>
              <span style={{ color:'var(--gray)', fontSize:'16px' }}>›</span>
            </Link>
          ))}
        </div>

        <button onClick={logout} style={{ marginTop:'20px', width:'100%', padding:'16px', borderRadius:'var(--radius-md)', border:'1px solid rgba(0,0,0,0.1)', background:'none', color:'var(--error)', fontSize:'15px', cursor:'pointer', fontFamily:'var(--font-body)', transition:'0.2s' }}>
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
