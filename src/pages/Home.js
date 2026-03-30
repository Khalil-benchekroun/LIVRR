import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';

const CATEGORIES = [
  { slug: 'beaute', label: 'Beauté', emoji: '💄', desc: 'Soins & maquillage' },
  { slug: 'vetements', label: 'Vêtements', emoji: '👗', desc: 'Prêt-à-porter' },
  { slug: 'chaussures', label: 'Chaussures', emoji: '👠', desc: 'Souliers de luxe' },
  { slug: 'accessoires', label: 'Accessoires', emoji: '👜', desc: 'Sacs & bijoux' },
];

const MOCK_PRODUCTS = [
  { _id:'1', brand:'Sandro', name:'Robe Midi Fleurie', price:490, emoji:'👗', category:'vetements', delivery:'< 1h', boutique:'Sandro Paris 8e' },
  { _id:'2', brand:'Jacquemus', name:'Mules Cuir Beige', price:650, emoji:'👠', category:'chaussures', delivery:'< 1h', boutique:'Jacquemus Marais' },
  { _id:'3', brand:'Polène', name:'Numéro Un Mini', price:400, emoji:'👜', category:'accessoires', delivery:'< 45min', boutique:'Polène Paris' },
  { _id:'4', brand:'Charlotte Tilbury', name:'Pillow Talk Lipstick', price:42, emoji:'💄', category:'beaute', delivery:'< 30min', boutique:'Sephora Champs' },
  { _id:'5', brand:'A.P.C.', name:'Trench Camel', price:890, emoji:'🧥', category:'vetements', delivery:'< 1h', boutique:'APC Saint-Germain' },
  { _id:'6', brand:'Celine', name:'Lunettes Triomphe', price:320, emoji:'🕶', category:'accessoires', delivery:'< 1h', boutique:'Celine Faubourg' },
];

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div
      className="card"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ cursor:'pointer' }}
    >
      <div style={{
        height:'200px', background:'#F5F3EE',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'72px', position:'relative'
      }}>
        {product.emoji}
        <span style={{
          position:'absolute', top:'12px', right:'12px',
          background:'rgba(10,10,15,0.8)', color:'var(--gold)',
          fontSize:'11px', fontWeight:'500', padding:'4px 10px', borderRadius:'20px'
        }}>⚡ {product.delivery}</span>
      </div>
      <div style={{ padding:'16px' }}>
        <div style={{ fontSize:'11px', color:'var(--gold)', fontWeight:'500', textTransform:'uppercase', letterSpacing:'0.06em' }}>{product.brand}</div>
        <div style={{ fontSize:'15px', fontWeight:'400', margin:'4px 0', fontFamily:'var(--font-display)', fontSize:'17px' }}>{product.name}</div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'8px' }}>
          <span style={{ fontSize:'16px', fontWeight:'500' }}>€{product.price}</span>
          <span style={{ fontSize:'11px', color:'var(--gray)', background:'var(--white-2)', padding:'3px 8px', borderRadius:'6px' }}>{product.boutique}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts({ limit: 6 }).then(res => setProducts(res.data.products)).catch(() => {});
  }, []);

  return (
    <div style={{ paddingTop:'64px' }}>
      {/* Hero */}
      <section style={{
        background: 'var(--noir)',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'radial-gradient(ellipse at 70% 50%, rgba(201,169,110,0.12) 0%, transparent 60%)',
        }}/>
        <div className="container-wide" style={{ position:'relative', zIndex:1 }}>
          <div style={{ maxWidth:'600px' }}>
            <div style={{ marginBottom:'24px' }}>
              <span className="badge badge-dark">⚡ Livraison en moins d'1 heure</span>
            </div>
            <h1 style={{
              fontFamily:'var(--font-display)',
              fontSize:'clamp(48px, 7vw, 88px)',
              fontWeight:'300',
              color:'var(--white)',
              lineHeight:'1.05',
              letterSpacing:'-0.02em',
              marginBottom:'24px',
            }}>
              La mode de luxe,<br />
              <em style={{ color:'var(--gold)', fontStyle:'italic' }}>livrée chez vous</em>
            </h1>
            <p style={{ fontSize:'18px', color:'rgba(250,249,246,0.6)', lineHeight:'1.7', maxWidth:'460px', marginBottom:'40px' }}>
              Explorez les boutiques partenaires de votre quartier et recevez vos achats en moins d'une heure, directement depuis le stock en boutique.
            </p>
            <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
              <button className="btn-gold" style={{ fontSize:'15px', padding:'16px 36px' }} onClick={() => navigate('/catalog')}>
                Découvrir les boutiques
              </button>
              <button className="btn-outline" style={{ color:'var(--white)', borderColor:'rgba(255,255,255,0.3)', fontSize:'15px', padding:'16px 36px' }} onClick={() => navigate('/register')}>
                Créer un compte
              </button>
            </div>
            <div style={{ display:'flex', gap:'40px', marginTop:'56px' }}>
              {[['< 1h','Livraison express'],['100+','Boutiques partenaires'],['0€','De frais de livraison']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'32px', color:'var(--gold)', fontWeight:'400' }}>{val}</div>
                  <div style={{ fontSize:'13px', color:'rgba(250,249,246,0.5)', marginTop:'4px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding:'80px 0', background:'var(--white)' }}>
        <div className="container">
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'42px', fontWeight:'300', marginBottom:'8px' }}>Nos univers</h2>
          <p style={{ color:'var(--gray)', marginBottom:'40px', fontSize:'16px' }}>Explorez nos catégories de produits sélectionnés</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'20px' }}>
            {CATEGORIES.map(cat => (
              <Link key={cat.slug} to={`/catalog/${cat.slug}`} style={{
                background:'var(--noir)',
                borderRadius:'var(--radius-lg)',
                padding:'32px 24px',
                display:'flex',
                flexDirection:'column',
                gap:'12px',
                transition:'transform 0.25s, background 0.25s',
                textDecoration:'none',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span style={{ fontSize:'40px' }}>{cat.emoji}</span>
                <div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'24px', color:'var(--white)', fontWeight:'400' }}>{cat.label}</div>
                  <div style={{ fontSize:'13px', color:'rgba(250,249,246,0.5)', marginTop:'4px' }}>{cat.desc}</div>
                </div>
                <span style={{ color:'var(--gold)', fontSize:'13px', marginTop:'auto' }}>Voir la sélection →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section style={{ padding:'0 0 80px' }}>
        <div className="container">
          <div style={{
            background:'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
            borderRadius:'var(--radius-xl)',
            padding:'48px 56px',
            display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'24px'
          }}>
            <div>
              <div style={{ fontSize:'13px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px', opacity:0.7 }}>Offre de bienvenue</div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'36px', fontWeight:'400', lineHeight:'1.2' }}>
                -15% sur votre<br />première commande
              </h3>
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'12px', fontWeight:'500', marginBottom:'8px', opacity:0.7 }}>Votre code promo</div>
              <div style={{
                background:'rgba(0,0,0,0.15)', borderRadius:'12px', padding:'12px 24px',
                fontFamily:'var(--font-display)', fontSize:'28px', letterSpacing:'0.15em'
              }}>LIVRR15</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section style={{ padding:'0 0 100px', background:'var(--white-2)' }}>
        <div className="container" style={{ paddingTop:'80px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'40px' }}>
            <div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'42px', fontWeight:'300' }}>Sélection du moment</h2>
              <p style={{ color:'var(--gray)', fontSize:'16px', marginTop:'6px' }}>Disponible en livraison express maintenant</p>
            </div>
            <Link to="/catalog" style={{ fontSize:'14px', color:'var(--gold)', fontWeight:'500' }}>Tout voir →</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'24px' }}>
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding:'100px 0', background:'var(--white)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'42px', fontWeight:'300', marginBottom:'8px' }}>Comment ça marche</h2>
          <p style={{ color:'var(--gray)', marginBottom:'60px', fontSize:'16px' }}>Simple, rapide, fiable</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'40px' }}>
            {[
              { step:'01', icon:'🔍', title:'Parcourez', desc:'Explorez les produits disponibles en temps réel dans les boutiques partenaires' },
              { step:'02', icon:'🛒', title:'Commandez', desc:'Ajoutez au panier et payez en toute sécurité avec Apple Pay, Google Pay ou carte' },
              { step:'03', icon:'📦', title:'Attendez', desc:'Votre boutique prépare la commande et notre livreur part immédiatement' },
              { step:'04', icon:'⚡', title:'Recevez', desc:'Livraison en moins d\'une heure, où que vous soyez dans Paris' },
            ].map(s => (
              <div key={s.step} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'48px', marginBottom:'16px' }}>{s.icon}</div>
                <div style={{ fontSize:'11px', color:'var(--gold)', fontWeight:'600', letterSpacing:'0.1em', marginBottom:'8px' }}>ÉTAPE {s.step}</div>
                <h4 style={{ fontFamily:'var(--font-display)', fontSize:'22px', fontWeight:'400', marginBottom:'8px' }}>{s.title}</h4>
                <p style={{ fontSize:'14px', color:'var(--gray)', lineHeight:'1.6' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
