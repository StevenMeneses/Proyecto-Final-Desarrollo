import React, { useEffect, useState } from "react";
import "../styles/Orders.css";

const Orders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://proyecto-final-desarrollo.onrender.com/pedido";

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const stored = localStorage.getItem("token");
        const parsed = stored ? JSON.parse(stored) : null;
        const tokenValue = parsed?.token || parsed;

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener pedidos");
        const data = await response.json();
        setPedidos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) return <div className="orders-loading">Cargando pedidos...</div>;
  if (error) return <div className="orders-error">Error: {error}</div>;

  return (
    <main className="orders-container">
      <div className="orders-main">
        <div className="orders-header">
          <h2 className="orders-title">Pedidos Registrados</h2>
        </div>

        {pedidos.length === 0 ? (
          <p className="orders-empty">No hay pedidos registrados.</p>
        ) : (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Dirección</th>
                  <th>Estado</th>
                  <th>Productos</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((p, index) => {
                  const productosTexto = p.detallesPedido
                    .map((d) => `${d.nombreProducto} (${d.cantidad} u)`)
                    .join(", ");

                  const estadoTexto = p.estado ? "Confirmado" : "Pendiente";

                  return (
                    <tr key={p.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                      <td>{p.id}</td>
                      <td>{p.cliente.nombres} {p.cliente.apellidos}</td>
                      <td>{new Date(p.fechaPedido).toLocaleDateString("es-PE")}</td>
                      <td>{p.direccionEnvio}</td>
                      <td>{estadoTexto}</td>
                      <td>{productosTexto}</td>
                      <td>S/ {p.total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;
