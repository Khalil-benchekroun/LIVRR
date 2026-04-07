import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const PROMO_CODES = { "BIENVENUE10": 10, "LIVRR2026": 5, "SANDRO20": 20 };

export default function Panier() {
  const { cart, cartTotal, updateCartQty, removeFromCart, user, placeOrder } = useApp();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState("");
  const [address, setAddress] = useState(user?.address || "");
  const [deliveryMode, setDeliveryMode] = useState("express");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [step, setStep] = useState(1);

  const applyPromo = () => {
    if (PROMO_CODES[promoCode.toUpperCase()]) {
      const val = PROMO_CODES[promoCode.toUpperCase()];
      setDiscount(val);
      setPromoApplied(promoCode.toUpperCase());
      toast.success(`Code ${promoCode.toUpperCase()} appliqué — ${val}€ de réduction !`);
    } else {
      toast.error("Code promo invalide");
    }
  };

  const finalTotal = Math.max(0, cartTotal - discount + (deliveryMode === "express" ? 4.9 : 0));

  const handleCheckout = () => {
    if (!address) return toast.error("Adresse de livraison requise");
    if (!user) return navigate("/login");
    const order = placeOrder({ address, deliveryMode, paymentMethod });
    toast.success("Commande confirmée ! 🎉");
    navigate(`/commandes`);
  };

  if (cart.length === 0) return (
    <div>
      <div className="top-bar">
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>Mon Panier</h2>
      </div>
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: "56px", marginBottom: "16px" }}>🛒</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", marginBottom: "8px" }}>Votre panier est vide</h3>
        <p style={{ color: "var(--gray)", fontSize: "14px", marginBottom: "24px" }}>Découvrez notre sélection de pièces exclusives</p>
        <button className="btn-primary" style={{ maxWidth: "200px", margin: "0 auto" }} onClick={() => navigate("/catalogue")}>
          Explorer le catalogue
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="top-bar">
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>Mon Panier</h2>
        <span style={{ fontSize: "13px", color: "var(--gray)" }}>{cart.length} article{cart.length > 1 ? "s" : ""}</span>
      </div>

      <div className="page-content">
        {/* ÉTAPES */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "24px", gap: "0" }}>
          {["Panier", "Livraison", "Paiement"].map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: step > i ? "var(--noir)" : step === i + 1 ? "var(--gold)" : "var(--gray-bg)", color: step > i ? "#fff" : step === i + 1 ? "var(--noir)" : "var(--gray)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: "10px", marginTop: "4px", color: step === i + 1 ? "var(--noir)" : "var(--gray)", fontWeight: step === i + 1 ? "600" : "400" }}>{s}</span>
              </div>
              {i < 2 && <div style={{ height: "1px", flex: 1, background: step > i + 1 ? "var(--noir)" : "var(--gray-bg)", marginBottom: "14px" }} />}
            </React.Fragment>
          ))}
        </div>

        {/* STEP 1 : ARTICLES */}
        {step === 1 && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              {cart.map((item) => (
                <div key={item.key} className="card" style={{ display: "flex", gap: "14px", padding: "14px" }}>
                  <div style={{ width: "70px", height: "70px", borderRadius: "10px", background: "var(--gray-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", flexShrink: 0 }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "11px", color: "var(--gray)", marginBottom: "2px" }}>{item.brand}</div>
                    <div style={{ fontWeight: "600", fontSize: "14px", marginBottom: "4px" }}>{item.name}</div>
                    <div style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "8px" }}>Taille : {item.size}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--gray-bg)", borderRadius: "8px", padding: "4px 10px" }}>
                        <button onClick={() => updateCartQty(item.key, -1)} style={{ fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "none", border: "none" }}>−</button>
                        <span style={{ fontWeight: "700", fontSize: "14px" }}>{item.qty}</span>
                        <button onClick={() => updateCartQty(item.key, 1)} style={{ fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "none", border: "none" }}>+</button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontWeight: "700", fontSize: "15px" }}>{item.price * item.qty} €</span>
                        <button onClick={() => removeFromCart(item.key)} style={{ color: "var(--error)", fontSize: "16px", cursor: "pointer", background: "none", border: "none" }}>✕</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CODE PROMO */}
            <div className="card-flat" style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "10px" }}>🎟️ Code promo</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input className="input-field" placeholder="BIENVENUE10" value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())} style={{ flex: 1, marginBottom: 0 }} />
                <button className="btn-primary btn-sm" onClick={applyPromo} style={{ whiteSpace: "nowrap", flex: 0, width: "auto", padding: "12px 16px" }}>Appliquer</button>
              </div>
              {promoApplied && <div style={{ fontSize: "12px", color: "var(--success)", marginTop: "6px" }}>✓ Code {promoApplied} appliqué — -{discount} €</div>}
            </div>

            {/* TOTAL */}
            <div className="card" style={{ marginBottom: "20px" }}>
              {[
                { label: "Sous-total", value: `${cartTotal} €` },
                { label: "Code promo", value: discount > 0 ? `-${discount} €` : "—", color: discount > 0 ? "var(--success)" : "var(--gray)" },
                { label: "Livraison (express)", value: "4,90 €" },
              ].map((line) => (
                <div key={line.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                  <span style={{ color: "var(--gray)" }}>{line.label}</span>
                  <span style={{ fontWeight: "600", color: line.color || "var(--noir)" }}>{line.value}</span>
                </div>
              ))}
              <div className="divider" />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "700" }}>
                <span>Total</span>
                <span>{finalTotal.toFixed(2)} €</span>
              </div>
            </div>

            <button className="btn-primary" onClick={() => setStep(2)}>Continuer vers la livraison →</button>
          </>
        )}

        {/* STEP 2 : LIVRAISON */}
        {step === 2 && (
          <>
            <div style={{ marginBottom: "20px" }}>
              <label className="input-label">Adresse de livraison</label>
              <input className="input-field" placeholder="Ex: 12 Rue de la Paix, Paris 1er" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "12px" }}>Mode de livraison</div>
              {[
                { key: "express", label: "⚡ Express", sub: "En moins d'1 heure", price: "4,90 €" },
                { key: "collect", label: "🏪 Click & Collect", sub: "Récupérer en boutique", price: "Gratuit" },
              ].map((opt) => (
                <div key={opt.key} onClick={() => setDeliveryMode(opt.key)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderRadius: "12px", border: `1.5px solid ${deliveryMode === opt.key ? "var(--noir)" : "rgba(0,0,0,0.08)"}`, background: deliveryMode === opt.key ? "rgba(10,10,15,0.03)" : "transparent", cursor: "pointer", marginBottom: "10px", transition: "var(--transition)" }}>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "14px" }}>{opt.label}</div>
                    <div style={{ fontSize: "12px", color: "var(--gray)" }}>{opt.sub}</div>
                  </div>
                  <div style={{ fontWeight: "700", fontSize: "14px", color: opt.key === "collect" ? "var(--success)" : "var(--noir)" }}>{opt.price}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn-outline" onClick={() => setStep(1)}>← Retour</button>
              <button className="btn-primary" onClick={() => setStep(3)}>Continuer →</button>
            </div>
          </>
        )}

        {/* STEP 3 : PAIEMENT */}
        {step === 3 && (
          <>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "12px" }}>Mode de paiement</div>
              {[
                { key: "card", label: "💳 Carte bancaire", sub: "Visa, Mastercard, Amex" },
                { key: "apple", label: "🍎 Apple Pay", sub: "Paiement rapide et sécurisé" },
                { key: "google", label: "🔵 Google Pay", sub: "Paiement rapide et sécurisé" },
              ].map((opt) => (
                <div key={opt.key} onClick={() => setPaymentMethod(opt.key)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderRadius: "12px", border: `1.5px solid ${paymentMethod === opt.key ? "var(--gold)" : "rgba(0,0,0,0.08)"}`, background: paymentMethod === opt.key ? "rgba(201,169,110,0.06)" : "transparent", cursor: "pointer", marginBottom: "10px", transition: "var(--transition)" }}>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "14px" }}>{opt.label}</div>
                    <div style={{ fontSize: "12px", color: "var(--gray)" }}>{opt.sub}</div>
                  </div>
                  {paymentMethod === opt.key && <span style={{ color: "var(--gold)", fontSize: "18px" }}>✓</span>}
                </div>
              ))}
            </div>

            <div className="card-flat" style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "10px" }}>Récapitulatif</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px" }}>
                <span style={{ color: "var(--gray)" }}>{cart.length} article{cart.length > 1 ? "s" : ""}</span>
                <span style={{ fontWeight: "600" }}>{cartTotal} €</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px" }}>
                <span style={{ color: "var(--gray)" }}>Livraison</span>
                <span style={{ fontWeight: "600" }}>{deliveryMode === "express" ? "4,90 €" : "Gratuit"}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px" }}>
                  <span style={{ color: "var(--gray)" }}>Réduction</span>
                  <span style={{ fontWeight: "600", color: "var(--success)" }}>-{discount} €</span>
                </div>
              )}
              <div className="divider" />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "700" }}>
                <span>Total</span><span>{finalTotal.toFixed(2)} €</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn-outline" onClick={() => setStep(2)}>← Retour</button>
              <button className="btn-gold" onClick={handleCheckout}>Confirmer la commande</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
