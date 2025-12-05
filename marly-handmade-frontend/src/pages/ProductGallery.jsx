import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductGallery.css";

const getProductsData = async () => {
  const response = await fetch("https://proyecto-final-desarrollo.onrender.com/producto/all");
  if (!response.ok) throw new Error("Error al obtener productos");
  return await response.json();
};

function ProductGallery() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    getProductsData()
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((p) => p.categoria === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortField) {
      filtered.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === "string") {
          return sortDirection === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        } else {
          return sortDirection === "asc" ? valA - valB : valB - valA;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortField, sortDirection, products]);

  const uniqueCategories = ["Todos", ...new Set(products.map((p) => p.categoria))];

  if (loading) {
    return <div className="gallery-loading">Cargando productos...</div>;
  }

  return (
      <div className="gallery-container">
      <main className="gallery-main">
        <div className="gallery-header">
          <h1 className="gallery-title">Product Gallery</h1>
          <Link to="/admin/inventory">
            <button className="gallery-button">Inventory</button>
          </Link>
        </div>

        <div className="gallery-filters">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="id">ID</option>
            <option value="nombre">Nombre</option>
            <option value="precio">Precio</option>
            <option value="stock">Stock</option>
          </select>
          <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>

        <div className="gallery-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="gallery-card">
              {[product.fotoPrincipal, product.fotoSecundario, product.fotoTerciario].map((img, index) =>
                img ? (
                  <img
                    key={index}
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    className="gallery-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.insertAdjacentHTML("afterend", `<div class='gallery-placeholder'>Sin imagen</div>`);
                    }}
                  />
                ) : (
                  <div key={index} className="gallery-placeholder">Sin imagen</div>
                )
              )}

              <h3 className="gallery-name">{product.nombre}</h3>
              <p className="gallery-description">{product.descripcion}</p>
              <p className="gallery-price">S/ {product.precio.toFixed(2)}</p>
              <p className="gallery-category"><strong>Categoría:</strong> {product.categoria}</p>

              <div className="gallery-footer">
                <span className={`gallery-stock ${product.stock <= 10 ? "low" : "ok"}`}>
                  {product.stock <= 10 ? "⚠ Stock bajo" : `✓ ${product.stock} en stock`}
                </span>
                <Link to={`/admin/inventory/edit/${product.id}`} className="gallery-edit-button">
                  Editar
                </Link>
                <button onClick={() => alert(`Editar producto: ${product.nombre}`)} className="gallery-edit-button" > Eliminar </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductGallery;
