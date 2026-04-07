import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function BottomNav() {
  const { cartCount } = useApp();
  const location = useLocation();

  const items = [
    { path: "/", icon: "🏠", label: "Accueil" },
    { path: "/catalogue", icon: "🔍", label: "Explorer" },
    { path: "/panier", icon: "🛒", label: "Panier", badge: cartCount },
    { path: "/commandes", icon: "📦", label: "Commandes" },
    { path: "/compte", icon: "👤", label: "Compte" },
  ];

  const hideOn = ["/login", "/inscription", "/produit"];
  if (hideOn.some((p) => location.pathname.startsWith(p))) return null;

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const isActive = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
        return (
          <NavLink key={item.path} to={item.path} className={`nav-item ${isActive ? "active" : ""}`} style={{ position: "relative" }}>
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge > 0 && (
              <span style={{ position: "absolute", top: "4px", right: "8px", background: "var(--error)", color: "#fff", fontSize: "10px", fontWeight: "700", width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
