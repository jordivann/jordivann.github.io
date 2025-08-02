const stylesCode = `
.mouse-tracker-box {
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border: 2px solid var(--color-primary, #00ffe0);
  border-radius: 12px;
  color: #fff;
  font-family: 'Courier New', monospace;
  box-shadow: 0 0 20px var(--color-primary, #00ffe0);
}

.mouse-glow {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(0,255,255,0.8) 0%, rgba(0,255,255,0.1) 70%);
}
`;

export default stylesCode;
