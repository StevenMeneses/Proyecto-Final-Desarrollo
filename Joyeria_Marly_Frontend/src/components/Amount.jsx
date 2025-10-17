import React, { useState } from "react";

const Amount = () => {
  const [cantidad, setCantidad] = useState(1); // ← Aquí se define el estado inicial

  const incrementar = () => setCantidad((prev) => prev + 1); // ← Función para sumar
  const decrementar = () => {
    if (cantidad > 1) setCantidad((prev) => prev - 1); // ← Evita que baje de 1
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <button onClick={decrementar}>–</button>
      <input
        type="text"
        value={cantidad}
        readOnly
        style={{ width: "40px", textAlign: "center" }}
      />
      <button onClick={incrementar}>+</button>
    </div>
  );
};

export default Amount;
