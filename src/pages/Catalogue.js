import React, { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

const CATEGORIES = ["Tout", "Vêtements", "Chaussures", "Accessoires", "Beauté", "Épicerie Fine"];
const SORT_OPTIONS = [{ k: "default", l: "Pertinence" }, { k: "price_asc", l: "Prix ↑" }, { k: "price_desc", l: "Prix ↓" }, { k: "rating", l: "Mieux notés" }];

export default function Catalogue() {
  const { products, favorites, toggleFavorite } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("cat") || "Tout");
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(2000);

  const filtered = useMemo(() => {
    let result = products
      .filter((p) => activeCategory === "Tout" || p.category === activeCategory)
      .filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => p.price <= maxPrice);

    if (sort === "price_asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, activeCategory, search, sort, maxPrice]);

  return (
    <div>
      <div className="top-bar">
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>Explorer</h2>
        <button onClick={() => setShowFilters(!showFilters)} style={{ fontSize: "22px", background: "none", border: "none", cursor: "pointer" }}>⚙️</button>
      </div>

      <div className="page-content">
        {/* SEARCH */}
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>🔍</span>
          <input className="input-field" placeholder="Marque, article, boutique..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "40px", borderRadius: "30px" }} />
        </div>

        {/* CATÉGORIES */}
        <div className="pill-tabs" style={{ marginBottom: "16px" }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`pill ${activeCategory === cat ? "pill-active" : "pill-inactive"}`}>{cat}</button>
          ))}
        </div>

        {/* FILTRES */}
        {showFilters && (
          <div className="card" style={{ marginBottom: "16px" }}>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Prix max</span>
                <span style={{ fontSize: "13px", color: "var(--gold)", fontWeight: "700" }}>{maxPrice} €</span>
              </div>
              <input type="range" min="50" max="2000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--gold)" }} />
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>Trier par</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {SORT_OPTIONS.map((opt) => (
                  <button key={opt.k} onClick={() => setSort(opt.k)}
                    style={{ padding: "6px 14px", borderRadius: "20px", border: "none", background: sort === opt.k ? "var(--noir)" : "var(--gray-bg)", color: sort === opt.k ? "#fff" : "var(--gray)", fontSize: "12px", fontWeight: "500", cursor: "pointer", fontFamily: "var(--font-body)" }}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RÉSULTATS */}
        <div style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "14px" }}>{filtered.length} article{filtered.length > 1 ? "s" : ""}</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {filtered.map((product) => (
            <div key={product.id} onClick={() => navigate(`/produit/${product.id}`)}
              style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)", cursor: "pointer", border: "1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ width: "100%", aspectRatio: "3/4", background: "var(--gray-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", position: "relative" }}>
                {product.emoji}
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                  style={{ position: "absolute", top: "8px", right: "8px", width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  {favorites.includes(product.id) ? "❤️" : "🤍"}
                </button>
                {product.originalPrice && (
                  <span style={{ position: "absolute", top: "8px", left: "8px", background: "var(--error)", color: "#fff", fontSize: "10px", fontWeight: "700", padding: "2px 6px", borderRadius: "20px" }}>
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: "10px", color: "var(--gray)", marginBottom: "2px" }}>{product.brand}</div>
                <div style={{ fontWeight: "600", fontSize: "12px", marginBottom: "4px", lineHeight: "1.3" }}>{product.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "700", fontSize: "14px" }}>{product.price} €</span>
                  <span style={{ fontSize: "10px", color: "var(--gray)" }}>⚡{product.deliveryTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--gray)" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", marginBottom: "8px" }}>Aucun résultat</div>
            <div style={{ fontSize: "14px" }}>Essayez d'autres mots-clés</div>
          </div>
        )}
      </div>
    </div>
  );
}
