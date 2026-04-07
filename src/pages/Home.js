import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const BANNERS = [
  { id: 1, title: "Livraison express", subtitle: "En moins d'1 heure", emoji: "⚡", bg: "linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 100%)", color: "#C9A96E" },
  { id: 2, title: "Nouvelles arrivées", subtitle: "Printemps 2026", emoji: "🌸", bg: "linear-gradient(135deg, #8C6A35 0%, #C9A96E 100%)", color: "#fff" },
];

export default function Home() {
  const { products, boutiques, favorites, toggleFavorite, addToCart } = useApp();
  const navigate = useNavigate();
  const [activeBanner, setActiveBanner] = useState(0);
  const [search, setSearch] = useState("");

  const featured = products.filter((p) => p.featured);
  const newArrivals = products.filter((p) => p.isNew);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/catalogue?q=${encodeURIComponent(search)}`);
  };

  return (
    <div style={{ background: "var(--white)" }}>
      {/* TOP BAR */}
      <div className="top-bar">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "26px", letterSpacing: "2px", color: "var(--noir)" }}>LIVRR</h1>
          <div style={{ fontSize: "10px", color: "var(--gray)", letterSpacing: "1px" }}>PARIS • MODE & LUXE</div>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ fontSize: "22px", cursor: "pointer" }} onClick={() => navigate("/favoris")}>🤍</span>
          <span style={{ fontSize: "22px", cursor: "pointer" }} onClick={() => navigate("/compte")}>👤</span>
        </div>
      </div>

      <div className="page-content">
        {/* SEARCH */}
        <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px" }}>🔍</span>
            <input className="input-field" placeholder="Rechercher une marque, un article..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "44px", borderRadius: "30px" }} />
          </div>
        </form>

        {/* BANNER */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ background: BANNERS[activeBanner].bg, borderRadius: "var(--radius-xl)", padding: "28px 24px", position: "relative", overflow: "hidden", minHeight: "140px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ position: "absolute", right: "20px", top: "20px", fontSize: "56px", opacity: 0.8 }}>{BANNERS[activeBanner].emoji}</div>
            <div style={{ fontSize: "11px", color: BANNERS[activeBanner].color, opacity: 0.7, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>LIVRR EXCLUSIF</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: BANNERS[activeBanner].color, lineHeight: 1.1 }}>{BANNERS[activeBanner].title}</div>
            <div style={{ fontSize: "13px", color: BANNERS[activeBanner].color, opacity: 0.75, marginTop: "4px" }}>{BANNERS[activeBanner].subtitle}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "10px" }}>
            {BANNERS.map((_, i) => (
              <div key={i} onClick={() => setActiveBanner(i)} style={{ width: i === activeBanner ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i === activeBanner ? "var(--noir)" : "var(--gray-light)", transition: "var(--transition)", cursor: "pointer" }} />
            ))}
          </div>
        </div>

        {/* CATÉGORIES */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>Catégories</h2>
          </div>
          <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "none" }}>
            {[
              { label: "Vêtements", emoji: "👗" },
              { label: "Chaussures", emoji: "👟" },
              { label: "Accessoires", emoji: "👜" },
              { label: "Beauté", emoji: "💄" },
              { label: "Épicerie Fine", emoji: "🫒" },
            ].map((cat) => (
              <div key={cat.label} onClick={() => navigate(`/catalogue?cat=${cat.label}`)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", cursor: "pointer", minWidth: "70px" }}>
                <div style={{ width: "58px", height: "58px", borderRadius: "16px", background: "var(--gray-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", transition: "var(--transition)" }}>
                  {cat.emoji}
                </div>
                <span style={{ fontSize: "11px", fontWeight: "500", color: "var(--gray)", textAlign: "center" }}>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BOUTIQUES */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>Boutiques partenaires</h2>
            <span style={{ fontSize: "13px", color: "var(--gold)", fontWeight: "500", cursor: "pointer" }} onClick={() => navigate("/catalogue")}>Voir tout →</span>
          </div>
          <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "none" }}>
            {boutiques.map((b) => (
              <div key={b.id} onClick={() => navigate(`/boutique/${b.id}`)}
                style={{ minWidth: "150px", background: "var(--gray-bg)", borderRadius: "var(--radius-lg)", padding: "16px", cursor: "pointer", transition: "var(--transition)", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>{b.emoji}</div>
                <div style={{ fontWeight: "700", fontSize: "14px", marginBottom: "2px" }}>{b.name}</div>
                <div style={{ fontSize: "11px", color: "var(--gray)" }}>⭐ {b.rating} · {b.deliveryTime}</div>
              </div>
            ))}
          </div>
        </div>

        {/* NOUVEAUTÉS */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>Nouveautés</h2>
            <span style={{ fontSize: "13px", color: "var(--gold)", fontWeight: "500", cursor: "pointer" }} onClick={() => navigate("/catalogue")}>Voir tout →</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} onFavorite={toggleFavorite} isFav={favorites.includes(product.id)} onClick={() => navigate(`/produit/${product.id}`)} />
            ))}
          </div>
        </div>

        {/* SÉLECTION */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>Sélection LIVRR</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} onFavorite={toggleFavorite} isFav={favorites.includes(product.id)} onClick={() => navigate(`/produit/${product.id}`)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onFavorite, isFav, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-img">
        <span style={{ fontSize: "52px" }}>{product.emoji}</span>
        {product.isNew && (
          <span style={{ position: "absolute", top: "8px", left: "8px", background: "var(--noir)", color: "var(--gold)", fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "20px", letterSpacing: "0.5px" }}>NEW</span>
        )}
        {product.originalPrice && (
          <span style={{ position: "absolute", top: "8px", left: "8px", background: "var(--error)", color: "#fff", fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "20px" }}>
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
        <button onClick={(e) => { e.stopPropagation(); onFavorite(product.id); }}
          style={{ position: "absolute", top: "8px", right: "8px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
      <div style={{ padding: "12px" }}>
        <div style={{ fontSize: "10px", color: "var(--gray)", marginBottom: "2px" }}>{product.brand}</div>
        <div style={{ fontWeight: "600", fontSize: "13px", marginBottom: "6px", lineHeight: "1.3" }}>{product.name}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontWeight: "700", fontSize: "15px" }}>{product.price} €</span>
            {product.originalPrice && <span style={{ fontSize: "11px", color: "var(--gray)", textDecoration: "line-through", marginLeft: "4px" }}>{product.originalPrice} €</span>}
          </div>
          <span style={{ fontSize: "11px", color: "var(--gray)" }}>⚡ {product.deliveryTime}</span>
        </div>
      </div>
    </div>
  );
}
