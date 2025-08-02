// src/components/Playground/components/AppCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AppCard.css';

export default function AppCard({ id, title, description, category, route }) {
  const navigate = useNavigate();

  return (
    <div className={`app-card app-${category}`} onClick={() => navigate(route)}>
      <div className="app-card-header">
        <h3>{title}</h3>
        <span className="app-category">{category}</span>
      </div>
      <p className="app-description">{description}</p>
    </div>
  );
}
