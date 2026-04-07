import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const LOYALTY_LEVELS = [
  { name: "Bronze", min: 0, max: 500, color: "#CD7F32", emoji: "🥉" },
  { name: "Argent", min: 500, max: 2000, color: "#C0C0C0", emoji: "🥈" },
  { name: "Or", min: 2000, max: 5000, color: "#C9A96E", emoji: "🥇" },
];

export default function Compte() {
  const { user, login, logout, points, loyaltyLevel, isPremium, setIsPremium } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");

  const currentLevel = LOYALTY_LEVELS.find(l => l.name === loyaltyLevel) || LOYALTY_LEVELS[0];
  const nextLevel = LOYALTY_LEVELS[LOYALTY_LEVELS.indexOf(currentLevel) + 1];
  const progress = nextLevel ? Math.min(100, ((points - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100) : 100;

  const handleAuth = () => {
    if (!email) return toast.error("Email requis");
    login(email);
    toast.success(isRegister ? "Compte créé avec succès !" : "Connexion réussie !");
  };

  if (!user) return (
    <div>
      <div className="top-bar">
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>{isRegister ? "Créer un compte" : "Connexion"}</h2>
      </div>
      <div className="page-content-notab">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "48px", color: "var(--gold)", letterSpacing: "4px", marginBottom: "6px" }}>LIVRR</div>
          <div style={{ fontSize: "14px", color: "var(--gray)" }}>Mode & Luxe · Livraison en 1h</div>
        </div>

        <div style={{ display: "flex", gap: "4px", background: "var(--gray-bg)", borderRadius: "12px", padding: "4px", marginBottom: "24px" }}>
          {["Connexion", "Inscription"].map((tab, i) => (
            <button key={tab} onClick={() => setIsRegister(i === 1)}
              style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: isRegister === (i === 1) ? "var(--white)" : "transparent", fontWeight: "600", fontSize: "13px", cursor: "pointer", fontFamily: "var(--font-body)", color: "var(--noir)", boxShadow: isRegister === (i === 1) ? "var(--shadow-sm)" : "none", transition: "var(--transition)" }}>
              {tab}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
          {isRegister && (
            <div>
              <label className="input-label">Nom complet</label>
              <input className="input-field" placeholder="Sophie Martin" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <div>
            <label className="input-label">Email</label>
            <input className="input-field" type="email" placeholder="votre@email.fr" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="input-label">Mot de passe</label>
            <input className="input-field" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        <button className="btn-primary" style={{ marginBottom: "12px" }} onClick={handleAuth}>
          {isRegister ? "Créer mon compte" : "Se connecter"}
        </button>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-outline" style={{ background: "#000", color: "#fff", border: "none" }} onClick={() => { login("apple@user.fr"); toast.success("Connecté avec Apple"); }}>
            🍎 Apple
          </button>
          <button className="btn-outline" onClick={() => { login("google@user.fr"); toast.success("Connecté avec Google"); }}>
            🔵 Google
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span style={{ fontSize: "13px", color: "var(--gray)", cursor: "pointer" }} onClick={() => toast.info("Email de réinitialisation envoyé")}>
            Mot de passe oublié ?
          </span>
        </div>

        <div style={{ marginTop: "24px", padding: "16px", background: "var(--gray-bg)", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: "var(--gray)" }}>Mode démo — entrez n'importe quel email</div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="top-bar">
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>Mon Compte</h2>
        <button onClick={() => { logout(); toast.success("Déconnecté"); }} style={{ fontSize: "13px", color: "var(--error)", fontWeight: "600", cursor: "pointer", background: "none", border: "none", fontFamily: "var(--font-body)" }}>
          Déconnexion
        </button>
      </div>

      <div className="page-content">
        {/* PROFIL */}
        <div className="card" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--noir)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "400" }}>
            {user.name?.charAt(0) || "S"}
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "16px" }}>{user.name || "Sophie M."}</div>
            <div style={{ fontSize: "13px", color: "var(--gray)" }}>{user.email}</div>
            {isPremium && <span className="badge badge-gold" style={{ marginTop: "4px" }}>⭐ Premium</span>}
          </div>
        </div>

        {/* FIDÉLITÉ */}
        <div className="card" style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "18px" }}>Programme Fidélité</div>
              <div style={{ fontSize: "13px", color: currentLevel.color, fontWeight: "700" }}>{currentLevel.emoji} Niveau {loyaltyLevel}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "var(--gold)" }}>{points.toLocaleString("fr-FR")}</div>
              <div style={{ fontSize: "11px", color: "var(--gray)" }}>points</div>
            </div>
          </div>
          <div style={{ height: "8px", background: "var(--gray-bg)", borderRadius: "4px", overflow: "hidden", marginBottom: "6px" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${currentLevel.color}, var(--gold))`, borderRadius: "4px", transition: "width 0.5s" }} />
          </div>
          {nextLevel && (
            <div style={{ fontSize: "11px", color: "var(--gray)" }}>
              {nextLevel.min - points} points pour atteindre le niveau {nextLevel.name} {nextLevel.emoji}
            </div>
          )}
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            {LOYALTY_LEVELS.map((level) => (
              <div key={level.name} style={{ flex: 1, textAlign: "center", padding: "8px", borderRadius: "8px", background: loyaltyLevel === level.name ? "var(--gray-bg)" : "transparent", border: `1px solid ${loyaltyLevel === level.name ? "var(--gold)" : "transparent"}` }}>
                <div style={{ fontSize: "16px" }}>{level.emoji}</div>
                <div style={{ fontSize: "10px", fontWeight: "600", color: loyaltyLevel === level.name ? "var(--noir)" : "var(--gray)" }}>{level.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PREMIUM */}
        {!isPremium && (
          <div style={{ background: "linear-gradient(135deg, var(--noir) 0%, #1a1a2e 100%)", borderRadius: "var(--radius-lg)", padding: "20px", marginBottom: "16px" }}>
            <div style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontSize: "20px", marginBottom: "6px" }}>⭐ LIVRR Premium</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "16px", lineHeight: "1.6" }}>
              Livraison gratuite illimitée · Réductions exclusives · Accès prioritaire aux nouveautés
            </div>
            <button onClick={() => { setIsPremium(true); toast.success("Bienvenue dans LIVRR Premium ! ⭐"); }}
              style={{ background: "var(--gold)", color: "var(--noir)", border: "none", borderRadius: "10px", padding: "12px 20px", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "var(--font-body)", width: "100%" }}>
              S'abonner — 9,99 €/mois
            </button>
          </div>
        )}

        {/* MENU */}
        {[
          { icon: "❤️", label: "Mes favoris", action: () => navigate("/favoris") },
          { icon: "📦", label: "Mes commandes", action: () => navigate("/commandes") },
          { icon: "🔄", label: "Retours & remboursements", action: () => toast.info("Fonctionnalité en cours") },
          { icon: "📍", label: "Mes adresses", action: () => toast.info("Fonctionnalité en cours") },
          { icon: "🔔", label: "Notifications", action: () => toast.info("Fonctionnalité en cours") },
          { icon: "🛡️", label: "Confidentialité", action: () => toast.info("Fonctionnalité en cours") },
        ].map((item) => (
          <div key={item.label} onClick={item.action}
            style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.06)", cursor: "pointer" }}>
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            <span style={{ flex: 1, fontSize: "14px", fontWeight: "500" }}>{item.label}</span>
            <span style={{ color: "var(--gray)", fontSize: "16px" }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}
