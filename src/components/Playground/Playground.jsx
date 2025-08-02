// src/components/Playground/Playground.jsx
import React from 'react';
import AppCard from './components/AppCard';
import './styles/Playground.css';

// Importar los metadatos de cada app (se puede automatizar luego)
import mouseMeta from './apps/MouseTracker/meta.js';
import calcMeta from './apps/finantialCalc/meta.js';
import TitlePlayground from './components/TitlePlayground.jsx';
const apps = [mouseMeta, calcMeta];

export default function Playground() {
  return (
    <section className="playground-container">
        <TitlePlayground />
      <div className="playground-grid">
        {apps.map((app, i) => (
          <AppCard key={i} {...app} />
        ))}
      </div>
    </section>
  );
}
