import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/SidebarProducts";
import ProductGrid from "../components/ProductGrid";
import { useProductos } from "../contexts/ProductoContext";
import { useFilters } from "../contexts/FilterContext";

function Shop() {
  const { productos, loading, error, listarProductos } = useProductos();
  const { searchTerm } = useFilters();

  // Si no hay búsqueda activa, cargar todos los productos
  useEffect(() => {
    if (!searchTerm) {
      listarProductos();
    }
  }, [searchTerm]);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif text-[#040F2E] mb-6 text-center">
            {searchTerm ? `Resultados de búsqueda` : 'Todos los productos'}
          </h1>
        </div>

        <div className="flex min-h-screen">
          <Sidebar />

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-center text-[#997C71]">Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-center text-red-500">{error}</p>
            </div>
          ) : (
            <ProductGrid products={productos} />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Shop;
