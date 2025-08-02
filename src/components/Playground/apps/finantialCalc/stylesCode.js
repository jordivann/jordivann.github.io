const stylesCode = `
.financial-calc-box {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid var(--color-primary);
  box-shadow: 0 0 20px var(--color-primary);
  backdrop-filter: blur(10px);
  color: white;
  font-family: 'Courier New', monospace;
}

.financial-calc-box h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--color-primary);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group label {
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  color: var(--color-muted);
}

.input-group input {
  margin-top: 0.3rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: #111;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.input-group input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 5px var(--color-primary);
}

.result-box {
  margin-top: 2rem;
  text-align: center;
  font-size: 1.1rem;
  color: var(--color-info);
}

.cuota-final {
  display: block;
  margin-top: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-success, #10b981);
}

`;

export default stylesCode;
