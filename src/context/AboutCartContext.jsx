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
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const adjustQuantity = (id, delta) => {
    setCart(prev =>
      prev
        .map(p => (p.id === id ? { ...p, quantity: p.quantity + delta } : p))
        .filter(p => p.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <AboutCartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart , adjustQuantity}}>
      {children}
    </AboutCartContext.Provider>
  );
}

export function useAboutCart() {
  return useContext(AboutCartContext);
}
