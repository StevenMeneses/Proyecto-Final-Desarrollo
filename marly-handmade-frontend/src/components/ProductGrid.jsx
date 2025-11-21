import ProductCard from "./ProductCard";
import { useFilters } from "../contexts/FilterContext";

export default function ProductGrid({ products = [] }) {
  const { filters, searchTerm } = useFilters();
  
  console.log("ProductGrid - productos recibidos:", products);
  console.log("ProductGrid - filtros activos:", filters);
  
  // 1. Filtrar solo productos activos
  let activeProducts = products.filter((p) => p.status === true || p.status === 1 || p.status === "1");

  // 2. Aplicar filtros
  let filteredProducts = activeProducts.filter(product => {
    // Filtro por tipo de producto (búsqueda conservadora)
    if (filters.productTypes.length > 0) {
      const productName = product.name.toLowerCase();
      const matchesType = filters.productTypes.some(type => {
        const typeLower = type.toLowerCase();
        
        // Solo búsquedas directas sin palabras cruzadas
        if (typeLower === 'collar') {
          return productName.includes('collar') || productName.includes('gargantilla');
        } else if (typeLower === 'pendiente') {
          return productName.includes('pendiente') || productName.includes('arete');
        } else {
          return productName.includes(typeLower);
        }
      });
      
      if (!matchesType) {
        return false;
      }
    }

    // Filtro por categoría (comparación exacta en minúsculas)
    if (filters.categories.length > 0) {
      const productCategory = product.category?.toLowerCase().trim();
      const matchesCategory = filters.categories.some(filterCategory => {
        const filterCatLower = filterCategory.toLowerCase().trim();
        
        // Mapeo de categorías con variaciones
        const categoryMappings = {
          'artesania': ['artesania', 'artesanía', 'artesanal', 'handmade'],
          'accesorio': ['accesorio', 'accesorios', 'accessory'],
          'decoracion': ['decoracion', 'decoración', 'decorativo', 'decoration'],
          'regalo': ['regalo', 'gift', 'presente'],
          'personalizado': ['personalizado', 'personalizada', 'custom']
        };
        
        const searchTerms = categoryMappings[filterCatLower] || [filterCatLower];
        return searchTerms.some(term => productCategory === term || productCategory?.includes(term));
      });
      
      if (!matchesCategory) {
        return false;
      }
    }

    // Filtro por material (buscar en descripción o detalles)
    if (filters.materials.length > 0) {
      const productText = `${product.description || ''} ${product.details || ''} ${product.name || ''}`.toLowerCase();
      const matchesMaterial = filters.materials.some(material => {
        const materialLower = material.toLowerCase();
        
        // Mapeo de materiales con variaciones
        const materialMappings = {
          'arcilla polimérica': ['arcilla polimérica', 'arcilla polimerica', 'polymer clay'],
          'alambre de cobre': ['alambre de cobre', 'copper wire', 'alambre cobre'],
          'resina': ['resina', 'resin'],
          'textil': ['textil', 'tela', 'textile', 'fibra'],
          'madera': ['madera', 'wood', 'wooden'],
          'cerámica': ['cerámica', 'ceramica', 'ceramic']
        };
        
        const searchTerms = materialMappings[materialLower] || [materialLower];
        return searchTerms.some(term => productText.includes(term));
      });
      
      if (!matchesMaterial) {
        return false;
      }
    }

    // Filtro por precio
    if (filters.priceRange.min !== '' || filters.priceRange.max !== '') {
      const minPrice = filters.priceRange.min ? Number(filters.priceRange.min) : 0;
      const maxPrice = filters.priceRange.max ? Number(filters.priceRange.max) : Infinity;
      
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
    }

    return true;
  });

  // 3. Aplicar ordenamiento
  let sortedProducts = [...filteredProducts];
  
  switch (filters.sortBy) {
    case 'price-low-high':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high-low':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'best-selling':
    default:
      // Mantener el orden original
      break;
  }

  console.log("ProductGrid - productos filtrados:", sortedProducts);

  if (!sortedProducts.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#997C71] font-light text-sm p-6">
        {searchTerm 
          ? `No se encontraron productos con "${searchTerm}"` 
          : "No se encontraron productos con los filtros aplicados."}
      </div> 
    );
  }

  return (
    <div className="flex-1 px-3 sm:px-4 md:px-6 pt-16 md:pt-24 mb-8">
      {searchTerm && (
        <div className="mb-4 text-center">
          <p className="text-[#040F2E] text-sm">
            Mostrando {sortedProducts.length} resultado{sortedProducts.length !== 1 ? 's' : ''} para: <span className="font-semibold">"{searchTerm}"</span>
          </p>
        </div>
      )}
      
      {/* Mostrar info de filtros aplicados */}
      {(filters.productTypes.length > 0 || filters.categories.length > 0 || filters.materials.length > 0 || filters.priceRange.min !== '' || filters.priceRange.max !== '') && (
        <div className="mb-4 text-center">
          <p className="text-[#040F2E] text-sm">
            {sortedProducts.length} producto{sortedProducts.length !== 1 ? 's' : ''} filtrado{sortedProducts.length !== 1 ? 's' : ''}
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
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}