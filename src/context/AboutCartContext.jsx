import { createContext, useState, useEffect, useContext } from 'react';

const AboutCartContext = createContext();

export function AboutCartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('about_cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('about_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      return [...prev, { ...product, inCart: true }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <AboutCartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </AboutCartContext.Provider>
  );
}

export function useAboutCart() {
  return useContext(AboutCartContext);
}
