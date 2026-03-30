import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const MOCK_PRODUCTS = {
  '1': { _id:'1', brand:'Sandro', name:'Robe Midi Fleurie', price:490, emoji:'👗', category:'vetements', delivery:'< 1h', boutique:'Sandro Paris 8e', desc:'Robe midi en viscose légère à imprimé floral. Col V élégant, manches longues avec poignets boutonnés. Fermeture dissimulée dans le dos. Coupe ajustée à la taille.', sizes:['XS','S','M','L','XL'], inStock:true, rating:4.8, reviewCount:124 },
  '2': { _id:'2', brand:'Jacquemus', name:'Mules Cuir Beige', price:650, emoji:'👠', category:'chaussures', delivery:'< 1h', boutique:'Jacquemus Marais', desc:'Mules à talon block en cuir grain premium. Bout carré iconique Jacquemus. Semelle en cuir naturel. Talon 6 cm. Disponibles en plusieurs tailles.', sizes:['36','37','38','39','40'], inStock:true, rating:4.9, reviewCount:89 },
  '3': { _id:'3', brand:'Polène', name:'Numéro Un Mini', price:400, emoji:'👜', category:'accessoires', delivery:'< 45min', boutique:'Polène Paris', desc:'Sac structuré en cuir grainé de vachette. Bandoulière amovible et réglable. Fermeture à pression magnétique. Une poche intérieure zippée. Dimensions : 23 x 16 x 7 cm.', sizes:null, inStock:true, rating:4.7, reviewCount:203 },
  '4': { _id:'4', brand:'Charlotte Tilbury', name:'Pillow Talk Lipstick', price:42, emoji:'💄', category:'beaute', delivery:'< 30min', boutique:'Sephora Champs', desc:'L\'iconique rouge à lèvres Matte Revolution en teinte Pillow Talk. Une teinte rose nude avec des reflets dorés, universelle et ultra-flatteuse sur toutes les carnations.', sizes:null, inStock:true, rating:5.0, reviewCount:512 },
  '5': { _id:'5', brand:'A.P.C.', name:'Trench Camel', price:890, emoji:'🧥', category:'vetements', delivery:'< 1h', boutique:'APC Saint-Germain', desc:'Trench classique en gabardine de coton. Double boutonnage. Ceinture à boucle dorée. Col transformable. Doublure en coton imprimé APC. Un basique indémodable.', sizes:['XS','S','M','L'], inStock:true, rating:4.6, reviewCount:67 },
  '6': { _id:'6', brand:'Celine', name:'Lunettes Triomphe', price:320, emoji:'🕶', category:'accessoires', delivery:'< 1h', boutique:'Celine Faubourg', desc:'Monture acétate rectangle en coloris noir. Branches métalliques avec gravure Triomphe dorée. Verres gris catégorie 3. Étui rigide et chiffon inclus.', sizes:null, inStock:true, rating:4.8, reviewCount:156 },
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(MOCK_PRODUCTS[id] || null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setProduct(MOCK_PRODUCTS[id] || null);
    setSelectedSize(null);
  }, [id]);

  if (!product) return (
    <div style={{ paddingTop:'120px', textAlign:'center', color:'var(--gray)' }}>
      <p>Produit introuvable</p>
      <button className="btn-primary" style={{ marginTop:'16px' }} onClick={() => navigate('/catalog')}>Retour au catalogue</button>
    </div>
  );

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) { toast.error('Veuillez sélectionner une taille'); return; }
    addItem(product, 1, selectedSize);
  };

  return (
    <div style={{ paddingTop:'64px' }}>
      <div className="container" style={{ paddingTop:'40px', paddingBottom:'80px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize:'13px', color:'var(--gray)', marginBottom:'32px', display:'flex', gap:'8px', alignItems:'center' }}>
          <span style={{ cursor:'pointer', color:'var(--gold)' }} onClick={() => navigate('/catalog')}>Catalogue</span>
          <span>/</span>
          <span style={{ cursor:'pointer' }} onClick={() => navigate(`/catalog/${product.category}`)}>{product.brand}</span>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px' }}>
          {/* Left — image */}
          <div>
            <div style={{
              background:'var(--white-2)',
              borderRadius:'var(--radius-xl)',
              height:'520px',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'140px',
              position:'relative',
            }}>
              {product.emoji}
              <button
                onClick={() => setIsFav(!isFav)}
                style={{
                  position:'absolute', top:'20px', right:'20px',
                  width:'44px', height:'44px', borderRadius:'50%',
                  background:'var(--white)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'20px', border:'1px solid rgba(0,0,0,0.08)',
                  cursor:'pointer', transition:'0.2s',
                  color: isFav ? '#e24b4a' : 'var(--gray)',
                }}
              >{isFav ? '♥' : '♡'}</button>
              <span style={{
                position:'absolute', bottom:'20px', left:'20px',
                background:'rgba(10,10,15,0.8)', color:'var(--gold)',
                fontSize:'13px', fontWeight:'500', padding:'6px 14px', borderRadius:'20px'
              }}>⚡ Livraison {product.delivery}</span>
            </div>
          </div>

          {/* Right — info */}
          <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
            <div>
              <div style={{ fontSize:'12px', color:'var(--gold)', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px' }}>{product.brand}</div>
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'38px', fontWeight:'300', lineHeight:'1.1', marginBottom:'12px' }}>{product.name}</h1>
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <span style={{ fontSize:'28px', fontWeight:'500' }}>€{product.price}</span>
                <div style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'13px', color:'var(--gray)' }}>
                  <span style={{ color:'var(--gold)' }}>{'★'.repeat(Math.round(product.rating))}</span>
                  <span>{product.rating} ({product.reviewCount} avis)</span>
                </div>
              </div>
            </div>

            {/* Delivery info */}
            <div style={{ background:'var(--white-2)', borderRadius:'var(--radius-md)', padding:'16px 20px', display:'flex', gap:'16px', alignItems:'center' }}>
              <span style={{ fontSize:'24px' }}>⚡</span>
              <div>
                <div style={{ fontWeight:'500', fontSize:'14px' }}>Livraison express disponible</div>
                <div style={{ color:'var(--success)', fontSize:'13px', marginTop:'2px' }}>
                  En stock chez {product.boutique} · Livraison {product.delivery}
                </div>
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && (
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', fontWeight:'500', marginBottom:'12px' }}>
                  <span>Taille</span>
                  <span style={{ color:'var(--gold)', cursor:'pointer' }}>Guide des tailles</span>
                </div>
                <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} style={{
                      width:'52px', height:'52px',
                      border: selectedSize === s ? '2px solid var(--noir)' : '1px solid rgba(0,0,0,0.12)',
                      borderRadius:'var(--radius-sm)',
                      background: selectedSize === s ? 'var(--noir)' : 'var(--white)',
                      color: selectedSize === s ? 'var(--white)' : 'var(--noir)',
                      fontWeight: selectedSize === s ? '500' : '400',
                      fontSize:'14px', cursor:'pointer', transition:'0.2s'
                    }}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p style={{ fontSize:'15px', color:'var(--gray)', lineHeight:'1.7' }}>{product.desc}</p>

            {/* Actions */}
            <div style={{ display:'flex', gap:'12px', marginTop:'8px' }}>
              <button className="btn-primary" style={{ flex:1, fontSize:'15px', padding:'16px' }} onClick={handleAddToCart}>
                Ajouter au panier
              </button>
              <button className="btn-outline" style={{ padding:'16px 20px' }} onClick={() => { handleAddToCart(); navigate('/checkout'); }}>
                Commander maintenant
              </button>
            </div>

            {/* Trust signals */}
            <div style={{ borderTop:'1px solid rgba(0,0,0,0.06)', paddingTop:'20px', display:'flex', gap:'24px', flexWrap:'wrap' }}>
              {[['🔒','Paiement sécurisé'],['↩','Retour 30 jours'],['🏪',product.boutique]].map(([icon, text]) => (
                <div key={text} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', color:'var(--gray)' }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
