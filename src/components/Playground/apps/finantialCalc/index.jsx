import React, { useState } from 'react';
import './FinantialCalc.css'; // asegurate de tener este archivo

export default function FinancialCalc() {
  const [amount, setAmount] = useState(10000);
  const [interest, setInterest] = useState(20);
  const [months, setMonths] = useState(12);

  const monthlyRate = interest / 100 / 12;
  const cuota =
    amount && interest && months
      ? (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
      : 0;

  return (
    <div className="financial-calc-box">
      <h3>📈 Calculadora de Cuotas</h3>

      <div className="input-group">
        <label>
          Monto total:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </label>

        <label>
          Interés anual (%):
          <input
            type="number"
            value={interest}
            onChange={(e) => setInterest(Number(e.target.value))}
          />
        </label>

        <label>
          Cantidad de cuotas:
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="result-box">
        💸 Cuota mensual estimada:
        <span className="cuota-final">${cuota.toFixed(2)}</span>
      </div>
    </div>
  );
}
