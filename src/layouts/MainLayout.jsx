// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import './styles/MainLayout.css'; // Estilos propios del layout

export default function MainLayout() {
  return (
    <div className="layout">
      <Header />

      <main className="layout-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
