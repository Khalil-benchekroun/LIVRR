import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const STATUS_CONFIG = {
  "en préparation": { label: "En préparation", color: "var(--warning)", bg: "var(--warning-bg)", icon: "⏳", step: 1 },
  "en livraison": { label: "En livraison", color: "var(--info)", bg: "var(--info-bg)", icon: "🚴", step: 2 },
  "livré": { label: "Livré", color: "var(--success)", bg: "var(--success-bg)", icon: "✅", step: 3 },
  "annulé": { label: "Annulé", color: "var(--error)", bg: "var(--error-bg)", icon: "❌", step: 0 },
};

export default function Commandes() {
  const { orders, user } = useApp();
  const navigate = useNavigate();

  if (!user) return (
    <div>
      <div className="top-bar"><h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>Mes Commandes</h2></div>
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔐</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", marginBottom: "8px" }}>Connexion requise</h3>
        <p style={{ color: "var(--gray)", fontSize: "14px", marginBottom: "24px" }}>Connectez-vous pour voir vos commandes</p>
        <button className="btn-primary" style={{ maxWidth: "200px", margin: "0 auto" }} onClick={() => navigate("/login")}>Se connecter</button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="top-bar">
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>Mes Commandes</h2>
        <span style={{ fontSize: "13px", color: "var(--gray)" }}>{orders.length} commande{orders.length > 1 ? "s" : ""}</span>
      </div>

      <div className="page-content">
        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", marginBottom: "8px" }}>Aucune commande</h3>
            <p style={{ color: "var(--gray)", marginBottom: "24px" }}>Commencez à explorer notre catalogue</p>
            <button className="btn-primary" style={{ maxWidth: "200px", margin: "0 auto" }} onClick={() => navigate("/catalogue")}>Découvrir</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {orders.map((order) => {
              const config = STATUS_CONFIG[order.status] || STATUS_CONFIG["livré"];
              return (
                <div key={order.id} className="card">
                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <div style={{ fontFamily: "monospace", fontWeight: "700", fontSize: "15px" }}>#{order.id}</div>
                      <div style={{ fontSize: "12px", color: "var(--gray)", marginTop: "2px" }}>
                        {order.boutique} · {new Date(order.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                      </div>
                    </div>
                    <span style={{ background: config.bg, color: config.color, fontSize: "11px", fontWeight: "600", padding: "4px 10px", borderRadius: "20px" }}>
                      {config.icon} {config.label}
                    </span>
                  </div>

                  {/* SUIVI EN COURS */}
                  {order.status === "en livraison" && order.estimatedTime && (
                    <div style={{ background: "var(--info-bg)", borderRadius: "10px", padding: "12px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "24px" }}>🚴</span>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "14px", color: "var(--info)" }}>Coursier en route</div>
                        <div style={{ fontSize: "12px", color: "var(--info)" }}>Arrivée estimée dans {order.estimatedTime}</div>
                      </div>
                    </div>
                  )}

                  {/* TIMELINE */}
                  {order.status !== "annulé" && (
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "14px" }}>
                      {["Préparation", "Livraison", "Livré"].map((step, i) => (
                        <React.Fragment key={step}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: config.step > i ? "var(--noir)" : config.step === i + 1 ? "var(--gold)" : "var(--gray-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {config.step > i + 1 ? <span style={{ color: "#fff", fontSize: "11px" }}>✓</span> : <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: config.step === i + 1 ? "var(--noir)" : "transparent" }} />}
                            </div>
                            <span style={{ fontSize: "10px", marginTop: "4px", color: "var(--gray)" }}>{step}</span>
                          </div>
                          {i < 2 && <div style={{ height: "2px", flex: 1, background: config.step > i + 1 ? "var(--noir)" : "var(--gray-bg)", marginBottom: "14px" }} />}
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {/* ARTICLES */}
                  <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "12px" }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                        <span style={{ color: "var(--gray)" }}>{item.name} × {item.qty} <span style={{ opacity: 0.6 }}>[{item.size}]</span></span>
                        <span style={{ fontWeight: "600" }}>{item.price * item.qty} €</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontWeight: "700", fontSize: "14px" }}>
                      <span>Total</span><span>{order.total} €</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
