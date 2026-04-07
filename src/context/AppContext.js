import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const MOCK_PRODUCTS = [
  { id: 1, name: "Robe Midi Fleurie", brand: "Sandro", price: 490, originalPrice: null, category: "Vêtements", boutique: "Sandro Paris", emoji: "👗", rating: 4.8, reviews: 124, deliveryTime: "45 min", stock: 12, sizes: ["XS","S","M","L"], description: "Robe élégante 100% soie avec imprimé floral exclusif. Coupe midi, fermeture zippée dans le dos.", featured: true, isNew: true },
  { id: 2, name: "Trench Camel", brand: "Sandro", price: 890, originalPrice: 1200, category: "Vêtements", boutique: "Sandro Paris", emoji: "🧥", rating: 4.9, reviews: 89, deliveryTime: "35 min", stock: 5, sizes: ["S","M","L","XL"], description: "Trench iconique en laine mélangée, coupe ajustée. Ceinture amovible.", featured: true, isNew: false },
  { id: 3, name: "Sac Cuir Camel", brand: "AMI Paris", price: 890, originalPrice: null, category: "Accessoires", boutique: "AMI Paris", emoji: "👜", rating: 4.7, reviews: 56, deliveryTime: "50 min", stock: 8, sizes: ["Unique"], description: "Sac à main en cuir de veau pleine fleur, finitions dorées.", featured: true, isNew: false },
  { id: 4, name: "Sneakers Cuir Blanc", brand: "Isabel Marant", price: 450, originalPrice: null, category: "Chaussures", boutique: "Isabel Marant", emoji: "👟", rating: 4.6, reviews: 203, deliveryTime: "40 min", stock: 14, sizes: ["36","37","38","39","40","41"], description: "Sneakers en cuir nappa blanc, semelle plateforme signature.", featured: false, isNew: true },
  { id: 5, name: "Parfum Oud 50ml", brand: "By Terry", price: 280, originalPrice: null, category: "Beauté", boutique: "By Terry", emoji: "🌸", rating: 4.9, reviews: 67, deliveryTime: "30 min", stock: 20, sizes: ["50ml"], description: "Eau de parfum Oud Interdit. Notes de bois de oud, rose et ambre.", featured: false, isNew: false },
  { id: 6, name: "Blazer Structuré", brand: "Sandro", price: 295, originalPrice: 420, category: "Vêtements", boutique: "Sandro Paris", emoji: "👔", rating: 4.5, reviews: 41, deliveryTime: "45 min", stock: 3, sizes: ["XS","S","M"], description: "Blazer en laine vierge, coupe ajustée. Doublure en soie.", featured: false, isNew: false },
  { id: 7, name: "Mules Dorées", brand: "Isabel Marant", price: 380, originalPrice: null, category: "Chaussures", boutique: "Isabel Marant", emoji: "👠", rating: 4.4, reviews: 32, deliveryTime: "40 min", stock: 6, sizes: ["36","37","38","39","40"], description: "Mules en cuir doré, bout carré et talon block.", featured: false, isNew: true },
  { id: 8, name: "Crème Visage Luxe", brand: "By Terry", price: 165, originalPrice: null, category: "Beauté", boutique: "By Terry", emoji: "✨", rating: 4.8, reviews: 98, deliveryTime: "30 min", stock: 30, sizes: ["50ml"], description: "Crème hydratante au rétinol et acide hyaluronique.", featured: false, isNew: false },
  { id: 9, name: "Pull Cachemire Ivoire", brand: "Sandro", price: 390, originalPrice: null, category: "Vêtements", boutique: "Sandro Paris", emoji: "🤍", rating: 4.7, reviews: 77, deliveryTime: "45 min", stock: 9, sizes: ["XS","S","M","L","XL"], description: "Pull 100% cachemire, col rond. Douceur incomparable.", featured: false, isNew: false },
  { id: 10, name: "Ceinture Dorée", brand: "AMI Paris", price: 195, originalPrice: null, category: "Accessoires", boutique: "AMI Paris", emoji: "✨", rating: 4.5, reviews: 28, deliveryTime: "50 min", stock: 12, sizes: ["S/M","L/XL"], description: "Ceinture en cuir plongé avec boucle dorée. Pièce phare de la saison.", featured: false, isNew: true },
];

export const BOUTIQUES = [
  { id: 1, name: "Sandro Paris", category: "Mode", emoji: "🏪", rating: 4.8, deliveryTime: "35-45 min", address: "12 Rue du Faubourg Saint-Honoré, Paris 8e", products: 45 },
  { id: 2, name: "AMI Paris", category: "Luxe", emoji: "🛍️", rating: 4.7, deliveryTime: "40-50 min", address: "22 Rue de Grenelle, Paris 7e", products: 32 },
  { id: 3, name: "Isabel Marant", category: "Mode", emoji: "👑", rating: 4.9, deliveryTime: "35-45 min", address: "16 Rue de Charonne, Paris 11e", products: 28 },
  { id: 4, name: "By Terry", category: "Beauté", emoji: "💄", rating: 4.9, deliveryTime: "25-35 min", address: "1 Rue Jacob, Paris 6e", products: 18 },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([1, 3]);
  const [orders, setOrders] = useState([
    { id: "LV-00312", items: [{ name: "Robe Midi Fleurie", size: "M", qty: 1, price: 490 }], total: 490, status: "en livraison", date: "2026-04-06", boutique: "Sandro Paris", estimatedTime: "18 min" },
    { id: "LV-00290", items: [{ name: "Sac Cuir Camel", size: "Unique", qty: 1, price: 890 }], total: 890, status: "livré", date: "2026-04-01", boutique: "AMI Paris", estimatedTime: null },
  ]);
  const [points, setPoints] = useState(1240);
  const [loyaltyLevel] = useState("Argent");
  const [isPremium, setIsPremium] = useState(false);

  const login = (email) => setUser({ email, name: "Sophie M.", phone: "06 12 34 56 78", address: "12 Rue de la Paix, Paris 1er" });
  const logout = () => setUser(null);
  const register = (data) => setUser({ ...data });

  const addToCart = (product, size, qty = 1) => {
    const key = `${product.id}-${size}`;
    setCart((prev) => {
      const exists = prev.find((i) => i.key === key);
      if (exists) return prev.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, key, size, qty }];
    });
  };

  const removeFromCart = (key) => setCart((prev) => prev.filter((i) => i.key !== key));
  const updateCartQty = (key, delta) => setCart((prev) => prev.map((i) => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const clearCart = () => setCart([]);
  const toggleFavorite = (id) => setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);

  const placeOrder = (orderData) => {
    const newOrder = {
      id: `LV-${Math.floor(10000 + Math.random() * 90000)}`,
      items: [...cart],
      total: cart.reduce((a, i) => a + i.price * i.qty, 0),
      status: "en préparation",
      date: new Date().toISOString().split("T")[0],
      boutique: cart[0]?.boutique || "LIVRR",
      estimatedTime: "42 min",
      ...orderData,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setPoints((prev) => prev + Math.floor(newOrder.total / 10));
    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider value={{
      user, login, logout, register,
      cart, cartTotal: cart.reduce((a, i) => a + i.price * i.qty, 0),
      cartCount: cart.reduce((a, i) => a + i.qty, 0),
      addToCart, removeFromCart, updateCartQty, clearCart,
      favorites, toggleFavorite,
      orders, placeOrder,
      points, loyaltyLevel, isPremium, setIsPremium,
      products: MOCK_PRODUCTS, boutiques: BOUTIQUES,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
