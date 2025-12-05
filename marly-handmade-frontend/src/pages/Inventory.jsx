import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../contexts/ProductoContext.jsx";
import { AuthContext } from "../contexts/AuthContext";

import "../styles/Inventory.css";

function Inventory() {
  const { productos, error, loading, listarProductos } = useProductos();
  const { token } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  // 🔍 Filtrar y ordenar productos activos
  const filteredProducts = productos
    .filter((item) => item.status == 1)
    .filter((item) => {
      const matchesName = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
      return matchesName && matchesCategory;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === "string") {
        return sortDirection === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }
    });

  // 🧮 Paginación
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // 🗑️ Eliminar producto
  const handleDelete = async (productId, productName) => {
    if (!window.confirm(`¿Estás seguro de eliminar el producto "${productName}"?`)) return;

    try {
      const response = await fetch(`https://proyecto-final-desarrollo.onrender.com/producto/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (!response.ok) throw new Error("Error al eliminar el producto");

      alert(`Producto "${productName}" eliminado correctamente`);
      listarProductos(); // refresca la lista
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el producto");
    }
  };

  // ⏳ Loading y errores
  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">Error al cargar productos: {error}</div>;

  return (
    <div className="admin-layout">
      <div className="admin-content">
        <main className="inventory-main">
          <div className="inventory-header">
            <h1>Inventario</h1>
            <Link to="/admin/product-gallery">
              <button className="gallery-button">Ver galería</button>
            </Link>
          </div>

          <div className="filter-panel">
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {["Todos", ...new Set(productos.map((p) => p.category))].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <div className="sort-combo">
              <label>Ordenar por:</label>
              <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                <option value="id">ID</option>
                <option value="name">Nombre</option>
                <option value="price">Precio</option>
                <option value="stock">Stock</option>
              </select>
              <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </div>
          </div>

          <div className="inventory-table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Detalles</th>
                  <th>Cuidado</th>
                  <th>Stock</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, i) => (
                  <tr key={item.id} className={i % 2 === 0 ? "even-row" : "odd-row"}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td className="price-cell">
                      S/ {typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}
                    </td>
                    <td>{item.category}</td>
                    <td>{item.details}</td>
                    <td>{item.care}</td>
                    <td>{item.stock}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/admin/inventory/edit/${item.id}`} className="btn-editar">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <button onClick={() => handleDelete(item.id, item.name)} className="btn-eliminar">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</button>
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>‹</button>
            {[...Array(totalPages).keys()].map((page) => (
              <button key={page + 1} onClick={() => setCurrentPage(page + 1)} className={currentPage === page + 1 ? "active" : ""}>
                {page + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>›</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>»</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Inventory;
