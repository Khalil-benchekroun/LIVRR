import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext";
import "./index.css";

import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Produit from "./pages/Produit";
import Panier from "./pages/Panier";
import Commandes from "./pages/Commandes";
import Compte from "./pages/Compte";
import Favoris from "./pages/Favoris";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Toaster
          position="top-center"
          toastOptions={{
            style: { fontFamily: "DM Sans, sans-serif", fontSize: "13px", borderRadius: "12px", maxWidth: "320px" },
            duration: 2500,
          }}
        />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/produit/:id" element={<Produit />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/commandes" element={<Commandes />} />
            <Route path="/compte" element={<Compte />} />
            <Route path="/login" element={<Compte />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <BottomNav />
        </div>
      </Router>
    </AppProvider>
  );
}
