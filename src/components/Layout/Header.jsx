// src/components/Layout/Header.jsx
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import '../styles/Header.css';

export default function Header() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      const progress = e.detail.progress;
      setHide(progress > 0 && progress < 1);
    };

    window.addEventListener("hero3d-scroll", handleScroll);
    return () => window.removeEventListener("hero3d-scroll", handleScroll);
  }, []);
  return (
    <header id="main-header" className={`header ${hide ? 'hide-header' : ''}`}>
      <div className="header-container">
        <NavLink to="/" className="logo">
          Jordi.
        </NavLink>
        <div className="header-right">
          <ThemeToggle />
        </div>

        <nav className="nav">
          <NavLink to="/" className="nav-link">Inicio</NavLink>
          <NavLink to="/about" className="nav-link">Sobre mí</NavLink>
          <NavLink to="/projects" className="nav-link">Proyectos</NavLink>
          <NavLink to="/contact" className="nav-link">Contacto</NavLink>
        </nav>
      </div>
    </header>
  );
}
