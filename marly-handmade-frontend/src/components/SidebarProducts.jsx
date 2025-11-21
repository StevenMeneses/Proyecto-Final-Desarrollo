import { useState, useEffect } from "react";
import { Plus, Minus, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useFilters } from "../contexts/FilterContext"; 

function SidebarProducts() {
  const { filters, updateFilter, clearFilters } = useFilters();

  const [openSections, setOpenSections] = useState({
    price: false,
    material: false,
    productType: false,
    category: false,
    sortBy: true,
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  // Materiales en español
  const materiales = ["Arcilla Polimérica", "Alambre de Cobre", "Resina", "Textil", "Madera", "Cerámica"];
  
  // Tipos de producto
  const tiposProducto = ["Pulsera", "Pendiente", "Collar", "Anillo"];
  
  // Categorías con múltiples acepciones para evitar errores de tipeo
  const categorias = [
    "artesania", 
    "accesorio", 
    "decoracion", 
    "regalo", 
    "personalizado"
  ];

  // Mapeo para mostrar nombres bonitos en la UI
  const categoriaNombres = {
    "artesania": "Artesanía",
    "accesorio": "Accesorio",
    "decoracion": "Decoración", 
    "regalo": "Regalo",
    "personalizado": "Personalizado"
  };

  // Sync local state with context 
  useEffect(() => {
    updateFilter("priceRange", filters.priceRange);
  }, [filters.priceRange]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMaterialChange = (material) => {
    const newMaterials = filters.materials.includes(material)
      ? filters.materials.filter((m) => m !== material)
      : [...filters.materials, material];
    updateFilter("materials", newMaterials);
  };

  const handleProductTypeChange = (type) => {
    const newTypes = filters.productTypes.includes(type)
      ? filters.productTypes.filter((t) => t !== type)
      : [...filters.productTypes, type];
    updateFilter("productTypes", newTypes);
  };

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    updateFilter("categories", newCategories);
  };

  const handlePriceChange = (key, value) => {
    updateFilter("priceRange", { ...filters.priceRange, [key]: value });
  };

  const handleSortChange = (value) => {
    updateFilter("sortBy", value);
  };

  return (
    <>
      {/* Botón móvil */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <span className="text-[#997C71] font-medium text-sm">Filtros</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md border border-gray-200"
        >
          <Filter className="w-5 h-5" style={{ color: "#997C71" }} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileOpen
            ? "fixed inset-0 bg-white z-40 p-6 overflow-y-auto"
            : "hidden md:block md:w-72"
        } bg-white px-6 py-10 md:relative flex-shrink-0 transition-all duration-300`}
      >
        {/* Botón cerrar para móvil */}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 text-sm text-[#997C71]"
          >
            Cerrar ✕
          </button>
        )}

        {/* Migas de pan */}
        <nav className="text-xs text-gray-400 mb-12 tracking-wide flex flex-wrap items-center">
          <Link
            to="/"
            className="hover:text-gray-600 cursor-pointer"
            style={{ color: "#997C71" }}
          >
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="uppercase" style={{ color: "#997C71" }}>
            COLECCIÓN MAR
          </span>
        </nav>

        {/* Filtro de Precio */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full text-left py-2 mb-4"
          >
            <span className="text-base font-light" style={{ color: "#997C71" }}>
              Precio
            </span>
            {openSections.price ? (
              <Minus className="w-4 h-4 stroke-[1.5]" style={{ color: "#997C71" }} />
            ) : (
              <Plus className="w-4 h-4 stroke-[1.5]" style={{ color: "#997C71" }} />
            )}
          </button>

          {openSections.price && (
            <div className="pl-1 mt-5">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-xs mb-2" style={{ color: "#997C71" }}>
                    Mín
                  </label>
                  <input
                    type="number"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceChange("min", e.target.value)}
                    placeholder="$0"
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-300"
                    style={{ color: "#997C71" }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs mb-2" style={{ color: "#997C71" }}>
                    Máx
                  </label>
                  <input
                    type="number"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceChange("max", e.target.value)}
                    placeholder="$200"
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-300"
                    style={{ color: "#997C71" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filtro de Material */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection("material")}
            className="flex items-center justify-between w-full text-left py-2 mb-4"
          >
            <span className="text-base font-light" style={{ color: "#997C71" }}>
              Material
            </span>
            {openSections.material ? (
              <Minus className="w-4 h-4 stroke-[1.5]" style={{ color: "#997C71" }} />
            ) : (
              <Plus className="w-4 h-4 stroke-[1.5]" style={{ color: "#997C71" }} />
            )}
          </button>

          {openSections.material && (
            <div className="space-y-3 pl-1 mt-5">
              {materiales.map((material) => (
                <label key={material} className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.materials.includes(material)}
                    onChange={() => handleMaterialChange(material)}
                    className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                    style={{ accentColor: "#997C71" }}
                  />
                  <span className="ml-3 text-sm font-light" style={{ color: "#997C71" }}>
                    {material}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filtro de Tipo de Producto */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection("productType")}
            className="flex items-center justify-between w-full text-left py-2 mb-4"
          >
            <span className="text-base font-light" style={{ color: "#997C71" }}>
              Tipo de Producto
            </span>
            {openSections.productType ? (
              <Minus className="w-4 h-4 stroke-[1.5]" style={{ color: "#997C71" }} />
            ) : (
              <Plus className="w-4 h-4 stroke-[1.5]" style={{ color: "#997C71" }} />
            )}
          </button>

          {openSections.productType && (
            <div className="space-y-3 pl-1 mt-5">
              {tiposProducto.map((type) => (
                <label key={type} className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.productTypes.includes(type)}
                    onChange={() => handleProductTypeChange(type)}
                    className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                    style={{ accentColor: "#997C71" }}
                  />
                  <span className="ml-3 text-sm font-light" style={{ color: "#997C71" }}>
                    {type}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filtro de Categoría */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center justify-between w-full text-left py-2 mb-4"
          >
            <span className="text-base font-light" style={{ color: "#997C71" }}>
              Categoría
            </span>
            {openSections.category ? (
              <Minus className="w-4 h-4 stroke-[1.5]" style={{ color: "#997C71" }} />
            ) : (
              <Plus className="w-4 h-4 stroke-[1.5]" style={{ color: "#997C71" }} />
            )}
          </button>

          {openSections.category && (
            <div className="space-y-3 pl-1 mt-5">
              {categorias.map((category) => (
                <label key={category} className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                    style={{ accentColor: "#997C71" }}
                  />
                  <span className="ml-3 text-sm font-light" style={{ color: "#997C71" }}>
                    {categoriaNombres[category]}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Ordenar por */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection("sortBy")}
            className="flex items-center justify-between w-full text-left py-2 mb-4"
          >
            <span className="text-base font-light" style={{ color: "#997C71" }}>
              Ordenar por
            </span>
            {openSections.sortBy ? (
              <Minus className="w-4 h-4 stroke-[1.5]" style={{ color: "#997C71" }} />
            ) : (
              <Plus className="w-4 h-4 stroke-[1.5]" style={{ color: "#997C71" }} />
            )}
          </button>

          {openSections.sortBy && (
            <div className="space-y-4 pl-1 mt-5">
              {[
                { value: "best-selling", label: "Más vendidos" },
                { value: "price-low-high", label: "Precio: menor a mayor" },
                { value: "price-high-low", label: "Precio: mayor a menor" },
              ].map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={filters.sortBy === option.value}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="appearance-none w-5 h-5 border-2 rounded-full cursor-pointer transition-all"
                      style={{
                        borderColor:
                          filters.sortBy === option.value ? "#997C71" : "#d1d5db",
                        backgroundColor:
                          filters.sortBy === option.value ? "#997C71" : "transparent",
                      }}
                    />
                    {filters.sortBy === option.value && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <span className="ml-3 text-sm font-light" style={{ color: "#997C71" }}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Limpiar filtros */}
        <button
          onClick={clearFilters}
          className="mt-4 text-sm underline text-[#997C71]"
        >
          Limpiar todos los filtros
        </button>
      </aside>
    </>
  );
}

export default SidebarProducts;