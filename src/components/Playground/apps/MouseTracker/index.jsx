// src/components/Playground/apps/MouseTracker/index.jsx
import React, { useEffect, useState } from 'react';
import './MouseTracker.css';

export default function MouseTracker() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="mouse-tracker-container">
      <div className="mouse-tracker-box">
        <h3>🖱 Posición del Mouse</h3>
        <p>
          <span className="label">X:</span> <span className="value">{pos.x}</span>
        </p>
        <p>
          <span className="label">Y:</span> <span className="value">{pos.y}</span>
        </p>
      </div>

      <div
        className="mouse-glow"
        style={{ left: pos.x, top: pos.y }}
      />
    </div>
  );
}
