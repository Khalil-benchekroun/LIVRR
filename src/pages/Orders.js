// Orders.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_ORDERS = [
  { _id:'ord1', ref:'#LV-20241205', status:'transit', items:[{emoji:'👗',name:'Robe Midi'},{emoji:'👜',name:'Numéro Un Mini'}], total:890, date:'Aujourd\'hui 14:32', boutique:'Sandro Paris 8e' },
  { _id:'ord2', ref:'#LV-20241128', status:'delivered', items:[{emoji:'👠',name:'Mules Cuir'}], total:650, date:'28 nov. 2024', boutique:'Jacquemus Marais' },
  { _id:'ord3', ref:'#LV-20241115', status:'delivered', items:[{emoji:'💄',name:'Pillow Talk'},{emoji:'✨',name:'Sérum'}], total:137, date:'15 nov. 2024', boutique:'Sephora Champs' },
];

const STATUS = {
  transit: { label:'En livraison', color:'#E8F2FA', textColor:'#185FA5' },
  delivered: { label:'Livrée', color:'#E8F5EE', textColor:'#2E8B57' },
  pending: { label:'En préparation', color:'#FAEEDA', textColor:'#854F0B' },
  cancelled: { label:'Annulée', color:'#FCEBEB', textColor:'#C0392B' },
};

export default function Orders() {
  const [tab, setTab] = useState('all');

  const filtered = MOCK_ORDERS.filter(o => {
    if (tab === 'active') return ['transit','pending'].includes(o.status);
    if (tab === 'delivered') return o.status === 'delivered';
    return true;
  });

  return (
    <div style={{ paddingTop:'64px', minHeight:'100vh' }}>
      <div className="container" style={{ paddingTop:'48px', paddingBottom:'80px' }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'42px', fontWeight:'300', marginBottom:'32px' }}>Mes commandes</h1>

        {/* Tabs */}
        <div style={{ display:'flex', gap:'0', borderBottom:'1px solid rgba(0,0,0,0.08)', marginBottom:'32px' }}>
          {[['all','Toutes'],['active','En cours'],['delivered','Livrées']].map(([val, label]) => (
            <button key={val} onClick={() => setTab(val)} style={{
              padding:'12px 24px', background:'none', border:'none',
              borderBottom: tab === val ? '2px solid var(--noir)' : '2px solid transparent',
              color: tab === val ? 'var(--noir)' : 'var(--gray)',
              fontWeight: tab === val ? '500' : '400',
              fontSize:'14px', cursor:'pointer', fontFamily:'var(--font-body)', transition:'0.2s'
            }}>{label}</button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'80px 0', color:'var(--gray)' }}>
            <div style={{ fontSize:'48px', marginBottom:'16px' }}>📦</div>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'28px', fontWeight:'300' }}>Aucune commande</h3>
          </div>
        )}

        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {filtered.map(order => {
            const st = STATUS[order.status] || STATUS.pending;
            return (
              <div key={order._id} className="card" style={{ padding:'24px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
                  <div>
                    <div style={{ fontWeight:'600', fontSize:'15px' }}>{order.ref}</div>
                    <div style={{ fontSize:'13px', color:'var(--gray)', marginTop:'2px' }}>{order.date} · {order.boutique}</div>
                  </div>
                  <span style={{ background:st.color, color:st.textColor, fontSize:'12px', fontWeight:'500', padding:'4px 12px', borderRadius:'20px' }}>{st.label}</span>
                </div>
                <div style={{ display:'flex', gap:'10px', marginBottom:'16px' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ background:'var(--white-2)', borderRadius:'10px', padding:'8px 14px', fontSize:'13px', display:'flex', gap:'6px', alignItems:'center' }}>
                      <span style={{ fontSize:'20px' }}>{item.emoji}</span>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontWeight:'600', fontSize:'17px' }}>€{order.total}</span>
                  <div style={{ display:'flex', gap:'12px' }}>
                    {order.status === 'transit' && (
                      <Link to={`/orders/${order._id}`} className="btn-primary" style={{ padding:'10px 20px', fontSize:'13px' }}>
                        Suivre ma livraison
                      </Link>
                    )}
                    {order.status === 'delivered' && (
                      <button className="btn-outline" style={{ padding:'10px 20px', fontSize:'13px' }}>Commander à nouveau</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
