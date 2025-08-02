import { createContext, useContext, useState, useEffect } from 'react';
import { themes } from '../data/themes';
import { applyTheme } from '../utils/applyTheme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    const saved = localStorage.getItem('theme-key') || 'default';
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const changeTheme = (name) => {
    applyTheme(name);
    setTheme(name);
    localStorage.setItem('theme-key', name);
    window.dispatchEvent(new CustomEvent('theme-changed')); // 👈 importante
    };

  const changeRandomTheme = () => {
    const keys = Object.keys(themes).filter(k => k !== theme);
    const random = keys[Math.floor(Math.random() * keys.length)];
    changeTheme(random);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, changeRandomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
