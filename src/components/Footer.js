import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background:'var(--noir)', color:'rgba(250,249,246,0.6)', paddingBottom:'80px' }}>
      <div className="container-wide" style={{ paddingTop:'60px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', marginBottom:'48px' }}>
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'28px', color:'var(--white)', letterSpacing:'0.15em', marginBottom:'16px' }}>LIVRR</div>
            <p style={{ fontSize:'14px', lineHeight:'1.7', maxWidth:'280px', marginBottom:'20px' }}>
              La mode de luxe livrée en moins d'une heure, directement depuis les boutiques de votre quartier.
            </p>
            <div style={{ display:'flex', gap:'12px' }}>
              {['Instagram','TikTok','Pinterest'].map(s => (
                <div key={s} style={{ width:'36px', height:'36px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', cursor:'pointer', transition:'0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}>
                  {s[0]}
                </div>
              ))}
            </div>
          </div>
          {[
            { title:'Boutiques', links:['Beauté','Vêtements','Chaussures','Accessoires','Toutes les marques'] },
            { title:'Services', links:['Livraison express','Programme fidélité','Abonnement Premium','Partenaires boutiques'] },
            { title:'À propos', links:['Notre histoire','Presse','Carrières','Contact','CGV','Confidentialité'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ color:'var(--white)', fontWeight:'500', fontSize:'14px', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'16px' }}>{col.title}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {col.links.map(l => (
                  <Link key={l} to="/" style={{ fontSize:'14px', color:'rgba(250,249,246,0.5)', transition:'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,249,246,0.5)'}>{l}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:'24px', display:'flex', justifyContent:'space-between', fontSize:'12px', flexWrap:'wrap', gap:'12px' }}>
          <span>© 2024 LIVRR. Tous droits réservés.</span>
          <span style={{ color:'var(--gold)' }}>⚡ Livraison en moins d'1 heure</span>
        </div>
      </div>
    </footer>
  );
}
