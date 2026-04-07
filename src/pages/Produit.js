import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

export default function Produit() {
  const { id } = useParams();
  const { products, favorites, toggleFavorite, addToCart } = useApp();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);

  if (!product) return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ fontSize: "40px", marginBottom: "12px" }}>😕</div>
      <div>Produit introuvable</div>
      <button className="btn-outline btn-sm" onClick={() => navigate(-1)} style={{ marginTop: "16px", display: "inline-flex" }}>← Retour</button>
    </div>
  );

  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return toast.error("Sélectionnez une taille");
    addToCart(product, selectedSize, qty);
    toast.success(`${product.name} ajouté au panier !`);
  };

  return (
    <div>
      {/* HEADER */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,249,246,0.95)", backdropFilter: "blur(12px)", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <button onClick={() => navigate(-1)} style={{ fontSize: "22px", background: "none", border: "none", cursor: "pointer" }}>←</button>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px" }}>Fiche produit</h3>
        <button onClick={() => toggleFavorite(product.id)} style={{ fontSize: "22px", background: "none", border: "none", cursor: "pointer" }}>
          {favorites.includes(product.id) ? "❤️" : "🤍"}
        </button>
      </div>

      {/* IMAGE */}
      <div style={{ width: "100%", aspectRatio: "1/1", background: "var(--gray-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "96px", position: "relative" }}>
        {product.emoji}
        {product.originalPrice && (
          <span style={{ position: "absolute", top: "16px", left: "16px", background: "var(--error)", color: "#fff", fontSize: "12px", fontWeight: "700", padding: "4px 12px", borderRadius: "20px" }}>
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
        {product.isNew && (
          <span style={{ position: "absolute", top: "16px", right: "16px", background: "var(--noir)", color: "var(--gold)", fontSize: "11px", fontWeight: "700", padding: "4px 12px", borderRadius: "20px", letterSpacing: "1px" }}>NEW</span>
        )}
      </div>

      <div className="page-content-notab">
        {/* INFOS */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>{product.brand}</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", marginBottom: "8px", lineHeight: 1.2 }}>{product.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <span style={{ fontWeight: "700", fontSize: "22px" }}>{product.price} €</span>
            {product.originalPrice && <span style={{ fontSize: "16px", color: "var(--gray)", textDecoration: "line-through" }}>{product.originalPrice} €</span>}
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--gray)" }}>⭐ {product.rating} ({product.reviews} avis)</span>
            <span style={{ fontSize: "13px", color: "var(--success)", fontWeight: "600" }}>⚡ Livraison en {product.deliveryTime}</span>
          </div>
        </div>

        <div className="divider" />

        {/* TAILLES */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: "600", fontSize: "14px" }}>Taille</span>
            {selectedSize && <span style={{ fontSize: "13px", color: "var(--gold)", fontWeight: "600" }}>Sélectionné : {selectedSize}</span>}
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {product.sizes.map((size) => (
              <button key={size} onClick={() => setSelectedSize(size)}
                style={{ padding: "10px 18px", borderRadius: "10px", border: `1.5px solid ${selectedSize === size ? "var(--noir)" : "rgba(0,0,0,0.1)"}`, background: selectedSize === size ? "var(--noir)" : "transparent", color: selectedSize === size ? "#fff" : "var(--noir)", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "var(--font-body)", transition: "var(--transition)" }}>
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* QUANTITÉ */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
          <span style={{ fontWeight: "600", fontSize: "14px" }}>Quantité</span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--gray-bg)", borderRadius: "10px", padding: "8px 16px" }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ fontSize: "18px", fontWeight: "700", cursor: "pointer", background: "none", border: "none", color: "var(--noir)", lineHeight: 1 }}>−</button>
            <span style={{ fontWeight: "700", fontSize: "16px", minWidth: "20px", textAlign: "center" }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)} style={{ fontSize: "18px", fontWeight: "700", cursor: "pointer", background: "none", border: "none", color: "var(--noir)", lineHeight: 1 }}>+</button>
          </div>
          <span style={{ fontSize: "12px", color: "var(--gray)" }}>{product.stock} en stock</span>
        </div>

        <div className="divider" />

        {/* DESCRIPTION */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", marginBottom: "8px" }}>Description</h3>
          <p style={{ fontSize: "14px", color: "var(--gray)", lineHeight: "1.7" }}>{product.description}</p>
        </div>

        {/* BOUTIQUE */}
        <div className="card-flat" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", border: "1px solid rgba(0,0,0,0.06)" }}>🏪</div>
          <div>
            <div style={{ fontWeight: "600", fontSize: "14px" }}>{product.boutique}</div>
            <div style={{ fontSize: "12px", color: "var(--gray)" }}>⚡ Livraison en {product.deliveryTime} · ⭐ {product.rating}</div>
          </div>
        </div>

        {/* SIMILAIRES */}
        {similar.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", marginBottom: "14px" }}>Vous aimerez aussi</h3>
            <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "none" }}>
              {similar.map((p) => (
                <div key={p.id} onClick={() => navigate(`/produit/${p.id}`)}
                  style={{ minWidth: "130px", background: "var(--gray-bg)", borderRadius: "var(--radius-md)", overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>{p.emoji}</div>
                  <div style={{ padding: "8px 10px" }}>
                    <div style={{ fontSize: "11px", fontWeight: "600", lineHeight: "1.3" }}>{p.name}</div>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--noir)", marginTop: "2px" }}>{p.price} €</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-outline" style={{ flex: 0, padding: "16px", width: "54px" }} onClick={() => { toggleFavorite(product.id); toast.success(favorites.includes(product.id) ? "Retiré des favoris" : "Ajouté aux favoris"); }}>
            {favorites.includes(product.id) ? "❤️" : "🤍"}
          </button>
          <button className="btn-primary" style={{ flex: 1 }} onClick={handleAddToCart}>
            Ajouter au panier — {product.price * qty} €
          </button>
        </div>
      </div>
    </div>
  );
}
