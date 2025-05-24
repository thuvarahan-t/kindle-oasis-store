
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  cover: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (book: CartItem) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (book: CartItem) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev; // Don't add duplicates
      }
      return [...prev, book];
    });
  };

  const removeFromCart = (bookId: string) => {
    setItems(prev => prev.filter(item => item.id !== bookId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;

  const value = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    total,
    itemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
