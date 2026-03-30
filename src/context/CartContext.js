import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('livrr_cart') || '[]'); } catch { return []; }
  });
  const [promoCode, setPromoCode] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem('livrr_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1, size = null) => {
    setItems(prev => {
      const key = `${product._id}-${size}`;
      const existing = prev.find(i => `${i._id}-${i.selectedSize}` === key);
      if (existing) {
        return prev.map(i => `${i._id}-${i.selectedSize}` === key ? { ...i, qty: i.qty + quantity } : i);
      }
      return [...prev, { ...product, qty: quantity, selectedSize: size }];
    });
    toast.success('Ajouté au panier');
  };

  const removeItem = (productId, size) => {
    setItems(prev => prev.filter(i => !(i._id === productId && i.selectedSize === size)));
  };

  const updateQty = (productId, size, qty) => {
    if (qty <= 0) { removeItem(productId, size); return; }
    setItems(prev => prev.map(i =>
      i._id === productId && i.selectedSize === size ? { ...i, qty } : i
    ));
  };

  const clearCart = () => setItems([]);

  const applyPromo = async (code) => {
    const validCodes = { 'LIVRR15': 15, 'WELCOME10': 10, 'VIP20': 20 };
    const discount = validCodes[code.toUpperCase()];
    if (discount) {
      setPromoCode(code.toUpperCase());
      setPromoDiscount(discount);
      toast.success(`Code appliqué : -${discount}%`);
      return true;
    }
    toast.error('Code promo invalide');
    return false;
  };

  const removePromo = () => { setPromoCode(null); setPromoDiscount(0); };

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmount = Math.round(subtotal * promoDiscount / 100);
  const total = subtotal - discountAmount;
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      promoCode, promoDiscount, discountAmount, applyPromo, removePromo,
      subtotal, total, itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
