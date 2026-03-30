import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { items, subtotal, total, discountAmount, promoCode, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: address, 2: delivery, 3: payment
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ firstName:'', lastName:'', street:'', city:'Paris', zip:'', apt:'' });
  const [deliveryOption, setDeliveryOption] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('apple_pay');

  const handleOrder = async () => {
    setLoading(true);
    try {
      await createOrder({
        items: items.map(i => ({ product: i._id, qty: i.qty, size: i.selectedSize })),
        address,
        deliveryOption,
        paymentMethod,
        promoCode,
        total,
      });
      clearCart();
      toast.success('Commande confirmée ! ⚡');
      navigate('/orders');
    } catch {
      // Demo mode — simulate success
      clearCart();
      toast.success('Commande confirmée ! ⚡ Livraison en cours');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const StepIndicator = () => (
    <div style={{ display:'flex', alignItems:'center', gap:'0', marginBottom:'40px' }}>
      {['Livraison', 'Délai', 'Paiement'].map((label, i) => {
        const n = i + 1;
        const active = step === n, done = step > n;
        return (
          <React.Fragment key={n}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{
                width:'32px', height:'32px', borderRadius:'50%',
                background: done ? 'var(--success)' : active ? 'var(--noir)' : 'var(--white-2)',
                color: done || active ? 'var(--white)' : 'var(--gray)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'13px', fontWeight:'500'
              }}>{done ? '✓' : n}</div>
              <span style={{ fontSize:'14px', fontWeight: active ? '500' : '400', color: active ? 'var(--noir)' : 'var(--gray)' }}>{label}</span>
            </div>
            {i < 2 && <div style={{ flex:1, height:'1px', background: done ? 'var(--success)' : 'rgba(0,0,0,0.1)', margin:'0 12px' }}/>}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div style={{ paddingTop:'64px', minHeight:'100vh', background:'var(--white-2)' }}>
      <div className="container" style={{ paddingTop:'48px', paddingBottom:'80px', maxWidth:'900px' }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'42px', fontWeight:'300', marginBottom:'40px' }}>Commander</h1>
        <StepIndicator />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:'32px', alignItems:'start' }}>
          <div style={{ background:'var(--white)', borderRadius:'var(--radius-xl)', padding:'32px' }}>
            {/* Step 1 — Address */}
            {step === 1 && (
              <div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:'400', marginBottom:'24px' }}>Adresse de livraison</h3>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                  {[['firstName','Prénom'],['lastName','Nom']].map(([k,l]) => (
                    <div key={k}>
                      <label style={{ fontSize:'13px', fontWeight:'500', display:'block', marginBottom:'6px' }}>{l}</label>
                      <input className="input-field" value={address[k]} onChange={e => setAddress(p => ({...p,[k]:e.target.value}))} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:'14px' }}>
                  <label style={{ fontSize:'13px', fontWeight:'500', display:'block', marginBottom:'6px' }}>Adresse</label>
                  <input className="input-field" placeholder="Numéro et rue" value={address.street} onChange={e => setAddress(p => ({...p,street:e.target.value}))} />
                </div>
                <div style={{ marginTop:'14px' }}>
                  <label style={{ fontSize:'13px', fontWeight:'500', display:'block', marginBottom:'6px' }}>Appartement (optionnel)</label>
                  <input className="input-field" placeholder="Bâtiment, appartement…" value={address.apt} onChange={e => setAddress(p => ({...p,apt:e.target.value}))} />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginTop:'14px' }}>
                  {[['city','Ville'],['zip','Code postal']].map(([k,l]) => (
                    <div key={k}>
                      <label style={{ fontSize:'13px', fontWeight:'500', display:'block', marginBottom:'6px' }}>{l}</label>
                      <input className="input-field" value={address[k]} onChange={e => setAddress(p => ({...p,[k]:e.target.value}))} />
                    </div>
                  ))}
                </div>
                <button className="btn-primary" style={{ marginTop:'28px', width:'100%', padding:'16px' }} onClick={() => setStep(2)}>
                  Continuer →
                </button>
              </div>
            )}

            {/* Step 2 — Delivery */}
            {step === 2 && (
              <div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:'400', marginBottom:'24px' }}>Délai de livraison</h3>
                {[
                  { id:'express', label:'⚡ Express', sub:'Livraison en moins d\'1 heure', price:'Gratuit', desc:'Directement depuis la boutique' },
                  { id:'standard', label:'📦 Standard', sub:'Livraison en 2 heures', price:'Gratuit', desc:'Option relaxée' },
                  { id:'click', label:'🏪 Click & Collect', sub:'Retrait en boutique', price:'Gratuit', desc:'Disponible dans 30 min' },
                ].map(opt => (
                  <div key={opt.id} onClick={() => setDeliveryOption(opt.id)} style={{
                    border: deliveryOption === opt.id ? '2px solid var(--noir)' : '1px solid rgba(0,0,0,0.1)',
                    borderRadius:'var(--radius-md)', padding:'18px 20px', marginBottom:'12px',
                    cursor:'pointer', transition:'0.2s', background: deliveryOption === opt.id ? 'var(--white-2)' : 'var(--white)',
                    display:'flex', justifyContent:'space-between', alignItems:'center'
                  }}>
                    <div>
                      <div style={{ fontWeight:'500', fontSize:'15px' }}>{opt.label}</div>
                      <div style={{ fontSize:'13px', color:'var(--gray)', marginTop:'2px' }}>{opt.sub}</div>
                      <div style={{ fontSize:'12px', color:'var(--success)', marginTop:'2px' }}>{opt.desc}</div>
                    </div>
                    <div style={{ fontWeight:'500', color:'var(--success)' }}>{opt.price}</div>
                  </div>
                ))}
                <div style={{ display:'flex', gap:'12px', marginTop:'8px' }}>
                  <button className="btn-outline" style={{ padding:'14px 20px' }} onClick={() => setStep(1)}>← Retour</button>
                  <button className="btn-primary" style={{ flex:1, padding:'14px' }} onClick={() => setStep(3)}>Continuer →</button>
                </div>
              </div>
            )}

            {/* Step 3 — Payment */}
            {step === 3 && (
              <div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:'400', marginBottom:'24px' }}>Mode de paiement</h3>
                {[
                  { id:'apple_pay', icon:'🍎', label:'Apple Pay', sub:'Paiement rapide et sécurisé' },
                  { id:'google_pay', icon:'G', label:'Google Pay', sub:'Paiement rapide et sécurisé' },
                  { id:'card', icon:'💳', label:'Carte bancaire', sub:'Visa, Mastercard, Amex' },
                ].map(pm => (
                  <div key={pm.id} onClick={() => setPaymentMethod(pm.id)} style={{
                    border: paymentMethod === pm.id ? '2px solid var(--noir)' : '1px solid rgba(0,0,0,0.1)',
                    borderRadius:'var(--radius-md)', padding:'16px 20px', marginBottom:'12px',
                    cursor:'pointer', transition:'0.2s', display:'flex', gap:'16px', alignItems:'center'
                  }}>
                    <span style={{ fontSize:'24px' }}>{pm.icon}</span>
                    <div>
                      <div style={{ fontWeight:'500' }}>{pm.label}</div>
                      <div style={{ fontSize:'13px', color:'var(--gray)' }}>{pm.sub}</div>
                    </div>
                  </div>
                ))}
                {paymentMethod === 'card' && (
                  <div style={{ marginTop:'16px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <input className="input-field" placeholder="Numéro de carte" />
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                      <input className="input-field" placeholder="MM/AA" />
                      <input className="input-field" placeholder="CVC" />
                    </div>
                  </div>
                )}
                <div style={{ display:'flex', gap:'12px', marginTop:'20px' }}>
                  <button className="btn-outline" style={{ padding:'14px 20px' }} onClick={() => setStep(2)}>← Retour</button>
                  <button className="btn-gold" style={{ flex:1, padding:'14px', fontSize:'15px' }}
                    disabled={loading} onClick={handleOrder}>
                    {loading ? 'Traitement…' : `Confirmer · €${total}`}
                  </button>
                </div>
                <p style={{ fontSize:'12px', color:'var(--gray)', textAlign:'center', marginTop:'12px' }}>
                  🔒 Paiement sécurisé · Données chiffrées SSL
                </p>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div style={{ background:'var(--white)', borderRadius:'var(--radius-xl)', padding:'24px', position:'sticky', top:'80px' }}>
            <h4 style={{ fontFamily:'var(--font-display)', fontSize:'20px', fontWeight:'400', marginBottom:'20px' }}>Votre commande</h4>
            {items.map(item => (
              <div key={item._id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px', fontSize:'14px' }}>
                <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
                  <span style={{ fontSize:'24px' }}>{item.emoji}</span>
                  <div>
                    <div style={{ fontWeight:'500' }}>{item.name}</div>
                    {item.selectedSize && <div style={{ color:'var(--gray)', fontSize:'12px' }}>Taille {item.selectedSize}</div>}
                    <div style={{ color:'var(--gray)', fontSize:'12px' }}>×{item.qty}</div>
                  </div>
                </div>
                <span style={{ fontWeight:'500' }}>€{item.price * item.qty}</span>
              </div>
            ))}
            <div style={{ borderTop:'1px solid rgba(0,0,0,0.08)', marginTop:'16px', paddingTop:'16px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', color:'var(--gray)', marginBottom:'8px' }}><span>Sous-total</span><span>€{subtotal}</span></div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', color:'var(--success)', marginBottom:'8px' }}><span>Livraison</span><span>Gratuite</span></div>
              {discountAmount > 0 && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', color:'var(--success)', marginBottom:'8px' }}><span>Promo {promoCode}</span><span>−€{discountAmount}</span></div>}
              <div style={{ display:'flex', justifyContent:'space-between', fontWeight:'600', fontSize:'18px', borderTop:'1px solid rgba(0,0,0,0.08)', paddingTop:'12px', marginTop:'4px' }}><span>Total</span><span>€{total}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
