import './styles/WorkingSection.css';
import { Link } from 'react-router-dom';

export default function WorkingSection() {
  return (
    <div className="construction-container">
      <div className="construction-card">
        <h1>🚧 Sección en construcción</h1>
        <p>Estamos trabajando en esta parte del sitio para que tengas la mejor experiencia.</p>
        <p>¡Gracias por tu paciencia! ⏳</p>

        <Link to="/" className="btn-volver">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
