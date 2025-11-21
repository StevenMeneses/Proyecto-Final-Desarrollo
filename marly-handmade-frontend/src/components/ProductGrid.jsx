import ProductCard from "./ProductCard";
import { useFilters } from "../contexts/FilterContext";

export default function ProductGrid({ products = [] }) {
  const { searchTerm } = useFilters();
  
  console.log("ProductGrid - productos recibidos:", products);
  
  // Filtrar solo productos activos
  // Nota: Si hay searchTerm, los productos ya vienen filtrados del backend
  let activeProducts = products.filter((p) => p.status === true || p.status === 1 || p.status === "1");

  console.log("ProductGrid - productos activos:", activeProducts);

  if (!activeProducts.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#997C71] font-light text-sm p-6">
        {searchTerm ? `No se encontraron productos con "${searchTerm}"` : "No products found."}
      </div> 
    );
  }

  return (
    <div className="flex-1 px-3 sm:px-4 md:px-6 pt-16 md:pt-24 mb-8">
      {searchTerm && (
        <div className="mb-4 text-center">
          <p className="text-[#040F2E] text-sm">
            Mostrando {activeProducts.length} resultado{activeProducts.length !== 1 ? 's' : ''} para: <span className="font-semibold">"{searchTerm}"</span>
          </p>
        </div>
      )}
      <div
        className="
          grid
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5
          gap-4
          sm:gap-6
        "
      >
        {activeProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
