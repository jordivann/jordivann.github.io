// src/components/Playground/components/CodeViewer.jsx
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/CodeViewer.css';

export default function CodeViewer({ code, title, language = 'jsx' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-viewer">
      <div className="code-header">
        <h4>{title} – Código fuente</h4>
        <button onClick={handleCopy} className="copy-btn">
          {copied ? '✅ Copiado!' : '📋 Copiar'}
        </button>
      </div>

      <SyntaxHighlighter language={language} style={vscDarkPlus}>
        {code}
      </SyntaxHighlighter>

      <p className="code-note">⚠️ Este código es de solo lectura. Probalo en tu entorno local.</p>
    </div>
  );
}
