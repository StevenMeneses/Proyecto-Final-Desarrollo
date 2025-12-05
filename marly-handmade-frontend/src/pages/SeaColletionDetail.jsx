import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/SidebarProducts";
import ProductGrid from "../components/ProductGrid";
import { useProductos } from "../contexts/ProductoContext";
import { Search } from "lucide-react";

import SeaCollection from "/src/assets/SeaCollectionHover.png";

function SeaCollectionDetail() {
  // Acceder al contexto
  const { productos, loading, error } = useProductos();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // DEBUG: Ver qué hay en productos
  useEffect(() => {
    console.log("🔍 DEBUG - SeaCollectionDetail:");
    console.log("🔍 productos array:", productos);
    console.log("🔍 Número de productos:", productos?.length);
    console.log("🔍 Loading:", loading);
    console.log("🔍 Error:", error);
    
    if (productos?.length > 0) {
      console.log("🔍 Primer producto:", productos[0]);
      console.log("🔍 Keys del primer producto:", Object.keys(productos[0]));
      console.log("🔍 ¿Tiene 'nombre'?:", productos[0].nombre ? "Sí" : "No");
      console.log("🔍 ¿Tiene 'name'?:", productos[0].name ? "Sí" : "No");
      console.log("🔍 ¿Tiene 'nombre_producto'?:", productos[0].nombre_producto ? "Sí" : "No");
    }
  }, [productos, loading, error]);

  // Filtrar productos cuando cambia el término de búsqueda
  useEffect(() => {
    if (productos.length === 0) return;
    
    if (searchTerm.trim() === "") {
      setFilteredProducts(productos);
    } else {
      const searchLower = searchTerm.toLowerCase();
      
      // BUSCAR EN DIFERENTES CAMPOS POSIBLES
      const filtered = productos.filter(producto => {
        // Opción 1: Si tiene 'nombre'
        if (producto.nombre && producto.nombre.toLowerCase().includes(searchLower)) {
          return true;
        }
        // Opción 2: Si tiene 'name' (inglés)
        if (producto.name && producto.name.toLowerCase().includes(searchLower)) {
          return true;
        }
        // Opción 3: Si tiene 'nombre_producto'
        if (producto.nombre_producto && producto.nombre_producto.toLowerCase().includes(searchLower)) {
          return true;
        }
        // Opción 4: Si tiene 'title'
        if (producto.title && producto.title.toLowerCase().includes(searchLower)) {
          return true;
        }
        return false;
      });
      
      console.log("🔍 Búsqueda:", searchTerm);
      console.log("🔍 Productos encontrados:", filtered.length);
      console.log("🔍 Ejemplo encontrado:", filtered[0]);
      
      setFilteredProducts(filtered);
    }
  }, [searchTerm, productos]);

  // Inicializar con todos los productos
  useEffect(() => {
    if (productos.length > 0) {
      setFilteredProducts(productos);
      console.log("✅ Productos inicializados:", productos.length);
    }
  }, [productos]);

  return (
    <>
      <Header />

      <section className="relative w-full h-[90vh]">
        <img
          src={SeaCollection}
          alt="Sea Collection Banner"
          className="w-full h-full object-cover"
        />
      </section>

      <div className="flex min-h-screen container mx-auto px-4 py-8">
        <Sidebar />

        {/* Contenido principal */}
        <div className="flex-1 ml-0 md:ml-6">
          {/* Buscador pequeño */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              {searchTerm && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                  {filteredProducts.length} found
                </span>
              )}
            </div>
            
            {/* DEBUG: Mostrar información de ayuda */}
            {productos.length > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                <p>Tip: Try searching for product names like: "{productos[0].nombre || productos[0].name || productos[0].nombre_producto || 'product-name'}"</p>
              </div>
            )}
          </div>

          {/* Mostrar estado de carga / error */}
          {loading ? (
            <div className="text-center m-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            <p className="text-center m-4 text-red-500">{error}</p>
          ) : productos.length === 0 ? (
            <div className="text-center m-4">
              <div className="text-4xl mb-4">📦</div>
              <p className="text-gray-600 text-lg">No products available in database</p>
              <p className="text-gray-500 text-sm mt-2">The products list is empty</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center m-4">
              <p className="text-gray-600">
                {searchTerm ? `No products found for "${searchTerm}"` : "No products to display"}
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                >
                  Clear search
                </button>
              )}
              
              {/* Mostrar algunos nombres de productos como sugerencia */}
              {productos.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Available products include:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {productos.slice(0, 5).map((p, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {p.nombre || p.name || p.nombre_producto || `Product ${idx + 1}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Información de resultados */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredProducts.length} of {productos.length} products
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
              
              {/* Grid de productos */}
              <ProductGrid products={filteredProducts} />
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SeaCollectionDetail;