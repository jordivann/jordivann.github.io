// src/components/PageLoader.jsx
import './PageLoader.css';

export default function PageLoader() {
  return (
    <div className="page-loader">
      <div className="spinner" />
      <p>Cargando página... 🤖</p>
    </div>
  );
}
