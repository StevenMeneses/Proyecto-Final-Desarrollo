import React, { useEffect, useState } from "react";
import "../styles/ComplaintsBookAdmin.css";

const ComplaintsBookAdmin = () => {
  const [reclamaciones, setReclamaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://proyecto-final-desarrollo.onrender.com/reclamaciones";

  useEffect(() => {
    const fetchReclamaciones = async () => {
      try {
        const stored = localStorage.getItem("token");
        const parsed = stored ? JSON.parse(stored) : null;
        const tokenValue = parsed?.token || parsed;

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener reclamaciones");
        const data = await response.json();
        setReclamaciones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReclamaciones();
  }, []);

  if (loading) return <div className="complaints-loading">Cargando reclamaciones...</div>;
  if (error) return <div className="complaints-error">Error: {error}</div>;

  return (
    <main className="complaints-container">
      <div className="complaints-main">
        <div className="complaints-header">
          <h2 className="complaints-title">Libro de Reclamaciones</h2>
        </div>

        {reclamaciones.length === 0 ? (
          <p className="complaints-empty">No hay reclamaciones registradas.</p>
        ) : (
          <div className="complaints-table-wrapper">
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Mensaje</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {reclamaciones.map((r, index) => (
                  <tr key={r.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                    <td>{r.id}</td>
                    <td>{r.clienteNombre}</td>
                    <td>{r.descripcion}</td>
                    <td>{new Date(r.fechaReclamo).toLocaleString("es-PE")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default ComplaintsBookAdmin;
