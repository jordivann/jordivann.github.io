// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import './styles/NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">La página que buscás no existe o fue movida.</p>
      <Link to="/" className="notfound-button">
        Volver al inicio
      </Link>
    </div>
  );
}
