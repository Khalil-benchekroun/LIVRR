import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const STEPS = [
  { id:'confirmed', label:'Commande confirmée', sub:'Votre commande a été reçue', time:'14:32' },
  { id:'preparing', label:'Préparation en boutique', sub:'Sandro Paris 8e prépare votre colis', time:'14:48' },
  { id:'transit', label:'En livraison', sub:'Votre livreur est en route', time:'15:02', current:true },
  { id:'delivered', label:'Livré', sub:'Estimé à 15:20', time:null },
];

export default function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(60);

  useEffect(() => {
    const t = setInterval(() => setProgress(p => p < 100 ? p + 1 : p), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ paddingTop:'64px', minHeight:'100vh', background:'var(--white-2)' }}>
      <div className="container" style={{ paddingTop:'48px', paddingBottom:'80px', maxWidth:'640px' }}>
        <button onClick={() => navigate('/orders')} style={{ color:'var(--gray)', fontSize:'14px', marginBottom:'32px', display:'flex', alignItems:'center', gap:'6px', background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-body)' }}>
          ← Retour aux commandes
        </button>

        {/* Order status card */}
        <div style={{ background:'var(--noir)', borderRadius:'var(--radius-xl)', padding:'32px', marginBottom:'24px', color:'var(--white)' }}>
          <div style={{ fontSize:'13px', opacity:0.5, marginBottom:'6px' }}>#LV-20241205</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'28px', color:'var(--gold)', fontWeight:'400', marginBottom:'4px' }}>En livraison ⚡</div>
          <div style={{ fontSize:'15px', opacity:0.7, marginBottom:'24px' }}>Arrivée estimée : <strong style={{ color:'var(--white)' }}>15h20</strong></div>

          {/* Progress bar */}
          <div style={{ background:'rgba(255,255,255,0.1)', borderRadius:'4px', height:'6px', marginBottom:'8px' }}>
            <div style={{ background:'var(--gold)', height:'6px', borderRadius:'4px', width:`${progress}%`, transition:'width 3s ease' }}/>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'11px', opacity:0.4 }}>
            <span>Boutique</span><span>Vous</span>
          </div>

          <div style={{ marginTop:'24px', display:'flex', gap:'24px' }}>
            {[['< 1h','Express'],['€0','Livraison'],['📍','Paris 8e']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'20px', color:'var(--gold)' }}>{val}</div>
                <div style={{ fontSize:'12px', opacity:0.5, marginTop:'2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking steps */}
        <div style={{ background:'var(--white)', borderRadius:'var(--radius-xl)', padding:'32px', marginBottom:'24px' }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:'22px', fontWeight:'400', marginBottom:'28px' }}>Suivi en temps réel</h3>
          {STEPS.map((step, i) => {
            const done = i < 2;
            const current = i === 2;
            return (
              <div key={step.id} style={{ display:'flex', gap:'16px', marginBottom: i < STEPS.length - 1 ? '24px' : 0 }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <div style={{
                    width:'32px', height:'32px', borderRadius:'50%',
                    background: done ? 'var(--success)' : current ? 'var(--gold)' : 'var(--white-2)',
                    border: done ? 'none' : current ? 'none' : '2px solid rgba(0,0,0,0.1)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'13px', fontWeight:'500',
                    color: done || current ? 'var(--white)' : 'var(--gray)',
                    flexShrink:0,
                  }}>
                    {done ? '✓' : current ? '→' : ''}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width:'2px', flex:1, background: done ? 'var(--success)' : 'rgba(0,0,0,0.08)', margin:'4px 0', minHeight:'28px' }}/>
                  )}
                </div>
                <div style={{ paddingTop:'6px' }}>
                  <div style={{ fontWeight: current ? '600' : '500', fontSize:'15px', color: current ? 'var(--noir)' : done ? 'var(--noir)' : 'var(--gray)' }}>{step.label}</div>
                  <div style={{ fontSize:'13px', color:'var(--gray)', marginTop:'2px' }}>
                    {step.time ? <><strong>{step.time}</strong> · </> : null}{step.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Items */}
        <div style={{ background:'var(--white)', borderRadius:'var(--radius-xl)', padding:'24px' }}>
          <h4 style={{ fontFamily:'var(--font-display)', fontSize:'20px', fontWeight:'400', marginBottom:'16px' }}>Articles</h4>
          {[{emoji:'👗',name:'Robe Midi Fleurie',brand:'Sandro',size:'S',price:490},{emoji:'👜',name:'Numéro Un Mini',brand:'Polène',size:null,price:400}].map((item, i) => (
            <div key={i} style={{ display:'flex', gap:'14px', alignItems:'center', padding:'12px 0', borderBottom: i === 0 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
              <div style={{ width:'56px', height:'56px', background:'var(--white-2)', borderRadius:'var(--radius-md)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>{item.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'11px', color:'var(--gold)', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.06em' }}>{item.brand}</div>
                <div style={{ fontWeight:'500' }}>{item.name}</div>
                {item.size && <div style={{ fontSize:'12px', color:'var(--gray)' }}>Taille {item.size}</div>}
              </div>
              <div style={{ fontWeight:'500' }}>€{item.price}</div>
            </div>
          ))}
          <div style={{ borderTop:'1px solid rgba(0,0,0,0.08)', paddingTop:'14px', marginTop:'4px', display:'flex', justifyContent:'space-between', fontWeight:'600', fontSize:'17px' }}>
            <span>Total</span><span>€890</span>
          </div>
        </div>
      </div>
    </div>
  );
}
