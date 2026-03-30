import React from 'react';
import { Link } from 'react-router-dom';

const LEVELS = [
  { name:'Bronze', min:0, max:500, color:'#CD7F32', perks:['5% de réduction', 'Accès aux ventes privées'] },
  { name:'Argent', min:500, max:2000, color:'#A8A9AD', perks:['10% de réduction', 'Livraison prioritaire', 'Accès early sale'] },
  { name:'Or', min:2000, max:5000, color:'#C9A96E', perks:['15% de réduction', 'Livraison gratuite illimitée', 'Personal shopper', 'Événements VIP'] },
];

const HISTORY = [
  { date:'05 déc. 2024', action:'Commande #LV-20241205', points:'+89 pts' },
  { date:'28 nov. 2024', action:'Commande #LV-20241128', points:'+65 pts' },
  { date:'15 nov. 2024', action:'Commande #LV-20241115', points:'+14 pts' },
  { date:'10 nov. 2024', action:'Inscription LIVRR', points:'+100 pts' },
];

export default function FidelityProgram() {
  const userPoints = 1250;
  const currentLevel = LEVELS[1];
  const nextLevel = LEVELS[2];
  const progressPct = ((userPoints - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100;

  return (
    <div style={{ paddingTop:'64px', minHeight:'100vh' }}>
      {/* Hero */}
      <div style={{ background:'var(--noir)', padding:'56px 0 40px' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <div style={{ fontSize:'13px', color:'var(--gold)', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'12px' }}>Programme de fidélité</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'52px', fontWeight:'300', color:'var(--white)', marginBottom:'8px' }}>Mes récompenses</h1>
          <p style={{ color:'rgba(250,249,246,0.5)', fontSize:'16px' }}>Chaque achat vous rapproche d'avantages exclusifs</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop:'40px', paddingBottom:'80px', maxWidth:'760px' }}>
        {/* Current status card */}
        <div style={{
          background:'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
          borderRadius:'var(--radius-xl)', padding:'36px', marginBottom:'32px'
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px' }}>
            <div>
              <div style={{ fontSize:'13px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.08em', opacity:0.7, marginBottom:'6px' }}>Niveau actuel</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'36px', fontWeight:'400' }}>{currentLevel.name} ✦</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'52px', fontWeight:'300', lineHeight:1 }}>{userPoints.toLocaleString('fr-FR')}</div>
              <div style={{ fontSize:'13px', opacity:0.7 }}>points accumulés</div>
            </div>
          </div>

          {/* Progress to next level */}
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', marginBottom:'8px', fontWeight:'500' }}>
              <span>Niveau {currentLevel.name}</span>
              <span>Niveau {nextLevel.name} ({nextLevel.min.toLocaleString('fr-FR')} pts)</span>
            </div>
            <div style={{ background:'rgba(0,0,0,0.15)', borderRadius:'6px', height:'8px' }}>
              <div style={{ background:'rgba(0,0,0,0.4)', height:'8px', borderRadius:'6px', width:`${progressPct}%`, transition:'width 1s ease' }}/>
            </div>
            <div style={{ fontSize:'13px', marginTop:'8px', opacity:0.7 }}>
              Plus que <strong>{(nextLevel.min - userPoints).toLocaleString('fr-FR')} pts</strong> pour atteindre le niveau Or
            </div>
          </div>
        </div>

        {/* Levels */}
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'32px', fontWeight:'300', marginBottom:'20px' }}>Les niveaux</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:'14px', marginBottom:'40px' }}>
          {LEVELS.map((level, i) => {
            const isCurrent = level.name === currentLevel.name;
            return (
              <div key={level.name} style={{
                background: isCurrent ? 'var(--white-2)' : 'var(--white)',
                borderRadius:'var(--radius-lg)',
                border: isCurrent ? `2px solid var(--gold)` : '1px solid rgba(0,0,0,0.08)',
                padding:'20px 24px',
                display:'flex', gap:'20px', alignItems:'center'
              }}>
                <div style={{ width:'48px', height:'48px', borderRadius:'50%', background:level.color, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontFamily:'var(--font-display)', fontSize:'18px', flexShrink:0 }}>
                  {i + 1}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', gap:'10px', alignItems:'center', marginBottom:'6px' }}>
                    <span style={{ fontWeight:'600', fontSize:'16px' }}>{level.name}</span>
                    {isCurrent && <span className="badge badge-gold">Votre niveau</span>}
                    <span style={{ fontSize:'13px', color:'var(--gray)' }}>{level.min.toLocaleString('fr-FR')} – {level.max.toLocaleString('fr-FR')} pts</span>
                  </div>
                  <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                    {level.perks.map(p => (
                      <span key={p} style={{ fontSize:'12px', background:'rgba(0,0,0,0.05)', padding:'3px 10px', borderRadius:'20px', color:'var(--gray)' }}>✓ {p}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* History */}
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'32px', fontWeight:'300', marginBottom:'20px' }}>Historique des points</h2>
        <div style={{ background:'var(--white)', borderRadius:'var(--radius-xl)', border:'1px solid rgba(0,0,0,0.06)', overflow:'hidden' }}>
          {HISTORY.map((h, i) => (
            <div key={i} style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'16px 24px',
              borderBottom: i < HISTORY.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none'
            }}>
              <div>
                <div style={{ fontWeight:'500', fontSize:'14px' }}>{h.action}</div>
                <div style={{ fontSize:'12px', color:'var(--gray)', marginTop:'2px' }}>{h.date}</div>
              </div>
              <span style={{ color:'var(--success)', fontWeight:'600', fontSize:'15px' }}>{h.points}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', marginTop:'40px' }}>
          <Link to="/catalog" className="btn-gold" style={{ padding:'16px 40px', fontSize:'15px' }}>
            Gagner plus de points →
          </Link>
        </div>
      </div>
    </div>
  );
}
