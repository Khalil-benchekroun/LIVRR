import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';

const MOCK_PRODUCTS = [
  { _id:'1', brand:'Sandro', name:'Robe Midi Fleurie', price:490, emoji:'👗', category:'vetements', delivery:'< 1h', boutique:'Sandro Paris 8e', inStock:true },
  { _id:'2', brand:'Jacquemus', name:'Mules Cuir Beige', price:650, emoji:'👠', category:'chaussures', delivery:'< 1h', boutique:'Jacquemus Marais', inStock:true },
  { _id:'3', brand:'Polène', name:'Numéro Un Mini', price:400, emoji:'👜', category:'accessoires', delivery:'< 45min', boutique:'Polène Paris', inStock:true },
  { _id:'4', brand:'Charlotte Tilbury', name:'Pillow Talk Lipstick', price:42, emoji:'💄', category:'beaute', delivery:'< 30min', boutique:'Sephora Champs', inStock:true },
  { _id:'5', brand:'A.P.C.', name:'Trench Camel', price:890, emoji:'🧥', category:'vetements', delivery:'< 1h', boutique:'APC Saint-Germain', inStock:true },
  { _id:'6', brand:'Celine', name:'Lunettes Triomphe', price:320, emoji:'🕶', category:'accessoires', delivery:'< 1h', boutique:'Celine Faubourg', inStock:true },
  { _id:'7', brand:'Isabel Marant', name:'Sneakers Étoile', price:380, emoji:'👟', category:'chaussures', delivery:'< 1h', boutique:'Isabel Marant Marais', inStock:true },
  { _id:'8', brand:'Dior Beauty', name:'Rouge Dior 999', price:58, emoji:'💋', category:'beaute', delivery:'< 45min', boutique:'Dior Champs-Élysées', inStock:true },
  { _id:'9', brand:'The Frankie Shop', name:'Blazer Structuré', price:295, emoji:'🥼', category:'vetements', delivery:'< 2h', boutique:'The Frankie Shop', inStock:true },
  { _id:'10', brand:'Valextra', name:'Cartable Mini', price:1200, emoji:'💼', category:'accessoires', delivery:'< 1h', boutique:'Valextra Vendôme', inStock:false },
  { _id:'11', brand:'Ganni', name:'Robe Smock Coton', price:275, emoji:'🌸', category:'vetements', delivery:'< 1h', boutique:'Ganni Marais', inStock:true },
  { _id:'12', brand:'By Terry', name:'Hyaluronic Serum', price:95, emoji:'✨', category:'beaute', delivery:'< 30min', boutique:'By Terry Sephora', inStock:true },
];

const CATS = [
  { slug:'tous', label:'Tous' },
  { slug:'beaute', label:'Beauté' },
  { slug:'vetements', label:'Vêtements' },
  { slug:'chaussures', label:'Chaussures' },
  { slug:'accessoires', label:'Accessoires' },
];

export default function Catalog() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(category || 'tous');
  const [sortBy, setSortBy] = useState('popular');
  const [priceMax, setPriceMax] = useState(2000);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const query = searchParams.get('q') || '';

  useEffect(() => { setActiveCategory(category || 'tous'); }, [category]);

  const filtered = MOCK_PRODUCTS
    .filter(p => activeCategory === 'tous' || p.category === activeCategory)
    .filter(p => !showInStockOnly || p.inStock)
    .filter(p => p.price <= priceMax)
    .filter(p => !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div style={{ paddingTop:'64px', minHeight:'100vh' }}>
      {/* Header */}
      <div style={{ background:'var(--noir)', padding:'48px 0 32px' }}>
        <div className="container">
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'48px', fontWeight:'300', color:'var(--white)', marginBottom:'8px' }}>
            {query ? `Résultats pour "${query}"` : 'Catalogue'}
          </h1>
          <p style={{ color:'rgba(250,249,246,0.5)', fontSize:'15px' }}>{filtered.length} produits disponibles en livraison express</p>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ borderBottom:'1px solid rgba(0,0,0,0.08)', background:'var(--white)', position:'sticky', top:'64px', zIndex:20 }}>
        <div className="container-wide" style={{ display:'flex', gap:'0', overflowX:'auto', scrollbarWidth:'none' }}>
          {CATS.map(cat => (
            <button key={cat.slug} onClick={() => { setActiveCategory(cat.slug); navigate(cat.slug === 'tous' ? '/catalog' : `/catalog/${cat.slug}`); }} style={{
              padding:'16px 24px',
              background:'none',
              border:'none',
              borderBottom: activeCategory === cat.slug ? '2px solid var(--gold)' : '2px solid transparent',
              color: activeCategory === cat.slug ? 'var(--noir)' : 'var(--gray)',
              fontWeight: activeCategory === cat.slug ? '500' : '400',
              fontSize:'14px',
              cursor:'pointer',
              whiteSpace:'nowrap',
              transition:'0.2s',
            }}>{cat.label}</button>
          ))}
        </div>
      </div>

      <div className="container-wide" style={{ padding:'32px 40px', display:'flex', gap:'40px' }}>
        {/* Sidebar filters */}
        <aside style={{ width:'220px', flexShrink:0, display:'flex', flexDirection:'column', gap:'32px' }} className="desktop-sidebar">
          <div>
            <h4 style={{ fontSize:'13px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'16px', color:'var(--gray)' }}>Prix max</h4>
            <input type="range" min="50" max="2000" step="50" value={priceMax} onChange={e => setPriceMax(+e.target.value)}
              style={{ width:'100%', accentColor:'var(--gold)' }} />
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', color:'var(--gray)', marginTop:'6px' }}>
              <span>€50</span><span style={{ fontWeight:'500', color:'var(--noir)' }}>€{priceMax}</span>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize:'13px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'16px', color:'var(--gray)' }}>Disponibilité</h4>
            <label style={{ display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', fontSize:'14px' }}>
              <input type="checkbox" checked={showInStockOnly} onChange={e => setShowInStockOnly(e.target.checked)}
                style={{ accentColor:'var(--gold)', width:'16px', height:'16px' }} />
              En stock uniquement
            </label>
          </div>
          <div>
            <h4 style={{ fontSize:'13px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'16px', color:'var(--gray)' }}>Délai de livraison</h4>
            {['< 30min','< 1h','< 2h'].map(d => (
              <label key={d} style={{ display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', fontSize:'14px', marginBottom:'10px' }}>
                <input type="checkbox" style={{ accentColor:'var(--gold)' }} />
                {d}
              </label>
            ))}
          </div>
        </aside>

        {/* Products */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <span style={{ fontSize:'14px', color:'var(--gray)' }}>{filtered.length} produits</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              border:'1px solid rgba(0,0,0,0.1)', borderRadius:'var(--radius-sm)',
              padding:'8px 14px', fontSize:'14px', background:'var(--white)',
              outline:'none', cursor:'pointer'
            }}>
              <option value="popular">Populaires</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'20px' }}>
            {filtered.map(p => (
              <Link key={p._id} to={`/product/${p._id}`} style={{ textDecoration:'none' }}>
                <div className="card" style={{ opacity: p.inStock ? 1 : 0.6 }}>
                  <div style={{
                    height:'180px', background:'var(--white-2)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'64px', position:'relative'
                  }}>
                    {p.emoji}
                    {!p.inStock && (
                      <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <span style={{ background:'var(--noir)', color:'var(--white)', fontSize:'11px', padding:'4px 12px', borderRadius:'20px' }}>Indisponible</span>
                      </div>
                    )}
                    {p.inStock && (
                      <span style={{ position:'absolute', top:'10px', right:'10px', background:'rgba(10,10,15,0.8)', color:'var(--gold)', fontSize:'10px', fontWeight:'500', padding:'3px 8px', borderRadius:'20px' }}>⚡ {p.delivery}</span>
                    )}
                  </div>
                  <div style={{ padding:'14px' }}>
                    <div style={{ fontSize:'10px', color:'var(--gold)', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.06em' }}>{p.brand}</div>
                    <div style={{ fontSize:'15px', fontFamily:'var(--font-display)', marginTop:'4px', marginBottom:'8px' }}>{p.name}</div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ fontWeight:'500', fontSize:'15px' }}>€{p.price}</span>
                      <span style={{ fontSize:'11px', color:'var(--gray)' }}>{p.boutique}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'80px 0', color:'var(--gray)' }}>
              <div style={{ fontSize:'48px', marginBottom:'16px' }}>🔍</div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'28px', fontWeight:'300', marginBottom:'8px' }}>Aucun résultat</h3>
              <p>Essayez d'autres filtres ou catégories</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
