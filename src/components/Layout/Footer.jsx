// src/components/Layout/Footer.jsx
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Jordi Van Norden. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="https://github.com/jordivann" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/van-norden-jordi" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="/contact">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
