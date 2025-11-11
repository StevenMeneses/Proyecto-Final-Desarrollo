package com.Proyecto.Joyeria_Marly.persistance.crud;

import org.springframework.data.repository.CrudRepository;
import com.Proyecto.Joyeria_Marly.persistance.entity.CategoriasProductos;

import java.util.Optional;
import java.util.List;

public interface CategoriasProductosCrudRepository extends CrudRepository<CategoriasProductos, Integer> {
    
    // Buscar por nombre de categoría
    Optional<CategoriasProductos> findByNombreCategoria(String nombreCategoria);
    
    // Buscar categorías que contengan un texto (para búsqueda)
    List<CategoriasProductos> findByNombreCategoriaContainingIgnoreCase(String nombreCategoria);
    
    // Verificar si existe una categoría por nombre
    boolean existsByNombreCategoria(String nombreCategoria);
}