import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, removeItem, updateQty, subtotal, total, discountAmount, promoCode, applyPromo, removePromo, itemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');

  if (items.length === 0) return (
    <div style={{ paddingTop:'120px', textAlign:'center', padding:'120px 24px 80px' }}>
      <div style={{ fontSize:'72px', marginBottom:'24px' }}>🛒</div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:'36px', fontWeight:'300', marginBottom:'12px' }}>Votre panier est vide</h2>
      <p style={{ color:'var(--gray)', marginBottom:'32px' }}>Découvrez nos produits disponibles en livraison express</p>
      <Link to="/catalog" className="btn-primary">Explorer le catalogue</Link>
    </div>
  );

  return (
    <div style={{ paddingTop:'64px', minHeight:'100vh' }}>
      <div className="container" style={{ paddingTop:'48px', paddingBottom:'80px' }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'42px', fontWeight:'300', marginBottom:'40px' }}>
          Mon panier <span style={{ color:'var(--gray)', fontSize:'24px' }}>({itemCount})</span>
        </h1>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:'48px', alignItems:'start' }}>
          {/* Items */}
          <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
            {items.map((item, i) => (
              <div key={`${item._id}-${item.selectedSize}`} style={{
                display:'flex', gap:'20px', padding:'24px 0',
                borderBottom:'1px solid rgba(0,0,0,0.06)',
                alignItems:'flex-start'
              }}>
                <div style={{
                  width:'100px', height:'100px', borderRadius:'var(--radius-md)',
                  background:'var(--white-2)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'44px', flexShrink:0
                }}>{item.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:'11px', color:'var(--gold)', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.06em' }}>{item.brand}</div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'20px', marginTop:'4px' }}>{item.name}</div>
                  {item.selectedSize && <div style={{ fontSize:'13px', color:'var(--gray)', marginTop:'4px' }}>Taille : {item.selectedSize}</div>}
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'16px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                      <button onClick={() => updateQty(item._id, item.selectedSize, item.qty - 1)} style={{
                        width:'32px', height:'32px', borderRadius:'50%',
                        border:'1px solid rgba(0,0,0,0.12)', background:'none',
                        fontSize:'16px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'
                      }}>−</button>
                      <span style={{ fontWeight:'500', minWidth:'20px', textAlign:'center' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item._id, item.selectedSize, item.qty + 1)} style={{
                        width:'32px', height:'32px', borderRadius:'50%',
                        border:'1px solid rgba(0,0,0,0.12)', background:'none',
                        fontSize:'16px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'
                      }}>+</button>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
                      <span style={{ fontWeight:'500', fontSize:'18px' }}>€{item.price * item.qty}</span>
                      <button onClick={() => removeItem(item._id, item.selectedSize)} style={{
                        color:'var(--gray)', fontSize:'13px', cursor:'pointer', background:'none', border:'none',
                        textDecoration:'underline', fontFamily:'var(--font-body)'
                      }}>Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ background:'var(--white-2)', borderRadius:'var(--radius-xl)', padding:'32px', position:'sticky', top:'80px' }}>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'24px', fontWeight:'400', marginBottom:'24px' }}>Récapitulatif</h3>

            {/* Promo */}
            {promoCode ? (
              <div style={{ background:'#E8F5EE', borderRadius:'var(--radius-md)', padding:'12px 16px', marginBottom:'20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ color:'var(--success)', fontSize:'14px', fontWeight:'500' }}>✓ Code {promoCode} appliqué</span>
                <button onClick={removePromo} style={{ color:'var(--gray)', fontSize:'12px', cursor:'pointer', background:'none', border:'none', fontFamily:'var(--font-body)' }}>Retirer</button>
              </div>
            ) : (
              <div style={{ display:'flex', gap:'8px', marginBottom:'20px' }}>
                <input className="input-field" placeholder="Code promo" value={promoInput} onChange={e => setPromoInput(e.target.value)}
                  style={{ flex:1, padding:'10px 14px', fontSize:'14px' }} />
                <button className="btn-outline" style={{ padding:'10px 16px', fontSize:'13px', whiteSpace:'nowrap' }}
                  onClick={() => applyPromo(promoInput)}>Appliquer</button>
              </div>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'20px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'15px' }}>
                <span style={{ color:'var(--gray)' }}>Sous-total</span>
                <span>€{subtotal}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'15px' }}>
                <span style={{ color:'var(--gray)' }}>Livraison express</span>
                <span style={{ color:'var(--success)' }}>Gratuite</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'15px', color:'var(--success)' }}>
                  <span>Réduction</span>
                  <span>−€{discountAmount}</span>
                </div>
              )}
            </div>

            <div style={{ borderTop:'1px solid rgba(0,0,0,0.08)', paddingTop:'16px', display:'flex', justifyContent:'space-between', fontWeight:'600', fontSize:'20px', marginBottom:'24px' }}>
              <span>Total</span>
              <span>€{total}</span>
            </div>

            <button className="btn-gold" style={{ width:'100%', fontSize:'15px', padding:'16px' }}
              onClick={() => user ? navigate('/checkout') : navigate('/login?next=/checkout')}>
              Commander →
            </button>
            {!user && <p style={{ fontSize:'12px', color:'var(--gray)', textAlign:'center', marginTop:'12px' }}>Connexion requise pour commander</p>}

            <div style={{ borderTop:'1px solid rgba(0,0,0,0.06)', marginTop:'20px', paddingTop:'16px', display:'flex', flexDirection:'column', gap:'8px' }}>
              {['🔒 Paiement sécurisé SSL','⚡ Livraison en moins d\'1h','↩ Retour sous 30 jours'].map(t => (
                <div key={t} style={{ fontSize:'12px', color:'var(--gray)', display:'flex', alignItems:'center', gap:'6px' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
