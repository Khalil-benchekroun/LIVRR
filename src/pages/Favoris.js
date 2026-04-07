import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Favoris() {
  const { products, favorites, toggleFavorite } = useApp();
  const navigate = useNavigate();
  const favProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div>
      <div className="top-bar">
        <button onClick={() => navigate(-1)} style={{ fontSize: "22px", background: "none", border: "none", cursor: "pointer" }}>←</button>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>Mes Favoris</h2>
        <span style={{ fontSize: "13px", color: "var(--gray)" }}>{favProducts.length}</span>
      </div>
      <div className="page-content">
        {favProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤍</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", marginBottom: "8px" }}>Aucun favori</h3>
            <p style={{ color: "var(--gray)", marginBottom: "24px", fontSize: "14px" }}>Ajoutez des articles à vos favoris en appuyant sur ❤️</p>
            <button className="btn-primary" style={{ maxWidth: "200px", margin: "0 auto" }} onClick={() => navigate("/catalogue")}>Explorer</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {favProducts.map((product) => (
              <div key={product.id} style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)", cursor: "pointer", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ width: "100%", aspectRatio: "3/4", background: "var(--gray-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", position: "relative" }}
                  onClick={() => navigate(`/produit/${product.id}`)}>
                  {product.emoji}
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    style={{ position: "absolute", top: "8px", right: "8px", width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    ❤️
                  </button>
                </div>
                <div style={{ padding: "10px 12px" }} onClick={() => navigate(`/produit/${product.id}`)}>
                  <div style={{ fontSize: "10px", color: "var(--gray)" }}>{product.brand}</div>
                  <div style={{ fontWeight: "600", fontSize: "12px", marginBottom: "4px" }}>{product.name}</div>
                  <div style={{ fontWeight: "700", fontSize: "14px" }}>{product.price} €</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
