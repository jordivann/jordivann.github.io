// src/components/Layout/Header.jsx
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo">
          Jordi Dev
        </NavLink>

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
