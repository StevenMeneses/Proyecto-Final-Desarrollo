import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const PedidoContext = createContext();

export function PedidoProviderWrapper({ children }) {
  const { token } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);

  const API_URL = "https://proyecto-final-desarrollo.onrender.com/pedido";

  const reportes = async () => {
    try {
      const response = await fetch(`${API_URL}/excel`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (!response.ok) throw new Error("Error al generar el reporte");

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "reporte_pedidos.xlsx";
      document.body.appendChild(a);
      a.click();

      // Limpieza
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando el reporte:", error);
    }
  };

  const listarPedidoPorestado = async (estado) => {
    try {
      const response = await fetch(`${API_URL}/estado/${estado}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener pedidos");

      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error("❌ Error descargando el reporte:", error);
    }
  };
  

  return (
    <PedidoContext.Provider
      value={{ reportes, listarPedidoPorestado, pedidos }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
