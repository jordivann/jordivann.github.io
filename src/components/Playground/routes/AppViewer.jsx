// src/components/Playground/routes/AppViewer.jsx
import React, { useState } from 'react';
import './AppViewer.css'

import { useParams } from 'react-router-dom';
import CodeViewer from '../components/CodeViewer';

// Importar apps manualmente por ahora
import MouseTracker from '../apps/MouseTracker/index.jsx';
import mouseCode from '../apps/MouseTracker/code.js';
import mouseMeta from '../apps/MouseTracker/meta.js';
import mouseStyles from '../apps/MouseTracker/stylesCode.js';

import FinancialCalc from '../apps/finantialCalc/index.jsx';
import calcCode from '../apps/finantialCalc/code.js';
import calcMeta from '../apps/finantialCalc/meta.js'
import calcStyles from '../apps/finantialCalc/stylesCode.js';



const apps = {
  mousetracker: {
    Component: MouseTracker,
    code: mouseCode,
    meta: mouseMeta,
    styles: mouseStyles,
  },
  financialcalc: {
    Component: FinancialCalc,
    code: calcCode,
    meta: calcMeta,
    styles: calcStyles,
    
  }
};

export default function AppViewer() {
  const { id } = useParams();
  const [showCode, setShowCode] = useState(false);
    const [tab, setTab] = useState('code'); // 'code' o 'styles'

  const app = apps[id];

  if (!app) return <p>🚫 App no encontrada</p>;

  const { Component, code, meta } = app;

  return (
    <section className="app-viewer">
      <h2>{meta.title}</h2>
      <p>{meta.description}</p>

      <div className="demo-box">
        <Component />
      </div>

      <div className="tabs-toggle">
        <button
            className={tab === 'code' ? 'active' : ''}
            onClick={() => setTab('code')}
        >
            Código JSX
        </button>
        <button
            className={tab === 'styles' ? 'active' : ''}
            onClick={() => setTab('styles')}
        >
            Estilos CSS
        </button>
        </div>

        <CodeViewer
        title={`${meta.title} – ${tab === 'code' ? 'JSX' : 'CSS'}`}
        code={tab === 'code' ? code : app.styles}
        language={tab === 'code' ? 'jsx' : 'css'}
        />

    </section>
  );
}
