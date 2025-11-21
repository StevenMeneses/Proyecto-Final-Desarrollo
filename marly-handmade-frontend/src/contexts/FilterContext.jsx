import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    materials: [],
    productTypes: [],
    categories: [], // NUEVO: filtro por categoría
    priceRange: { min: '', max: '' },
    sortBy: 'best-selling'
  });

  const [searchTerm, setSearchTerm] = useState('');

  const updateFilter = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({
      materials: [],
      productTypes: [],
      categories: [], // NUEVO: limpiar categorías también
      priceRange: { min: '', max: '' },
      sortBy: 'best-selling'
    });
    setSearchTerm('');
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter, clearFilters, searchTerm, setSearchTerm }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilters = () => useContext(FilterContext);