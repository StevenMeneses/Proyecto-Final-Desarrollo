package com.Proyecto.Joyeria_Marly.persistance.crud;

import org.springframework.data.repository.CrudRepository;
import com.Proyecto.Joyeria_Marly.persistance.entity.Productos;
import com.Proyecto.Joyeria_Marly.persistance.entity.CategoriasProductos;

import java.util.List;
import java.util.Optional;

public interface ProductosCrudRepository extends CrudRepository<Productos, Integer> {
    
    // Buscar productos por categoría
    List<Productos> findByCategoria(CategoriasProductos categoria);
    
    // Buscar productos por nombre (contiene)
    List<Productos> findByNombreProductoContainingIgnoreCase(String nombre);
    
    // Buscar productos ordenados por precio ascendente
    List<Productos> findAllByOrderByPrecioAsc();
    
    // Buscar productos ordenados por precio descendente
    List<Productos> findAllByOrderByPrecioDesc();
    
    // Buscar productos por nombre exacto
    Optional<Productos> findByNombreProducto(String nombreProducto);
    
    // Buscar productos con stock mayor que el valor dado
    List<Productos> findByStockGreaterThan(Integer stock);
    
    // Buscar productos por rango de precio
    List<Productos> findByPrecioBetween(Double precioMin, Double precioMax);
    
}
