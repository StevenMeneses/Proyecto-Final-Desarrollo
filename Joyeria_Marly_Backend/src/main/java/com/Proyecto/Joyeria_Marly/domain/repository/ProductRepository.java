package com.Proyecto.Joyeria_Marly.domain.repository;

import com.Proyecto.Joyeria_Marly.domain.dto.Product;
import java.util.List;
import java.util.Optional;

public interface ProductRepository {
    
    // Obtener todos los productos
    List<Product> findAll();
    
    // Buscar producto por ID
    Optional<Product> findById(Integer productId);
    
    // Buscar productos por categoría
    List<Product> findByCategory(Integer categoryId);
    
    // Buscar productos por nombre (búsqueda)
    List<Product> findByNameContaining(String name);
    
    // Guardar producto
    Product save(Product product);
    
    // Actualizar producto
    Product update(Product product);
    
    // Eliminar producto
    boolean delete(Integer productId);
    
    // Actualizar stock del producto
    boolean updateStock(Integer productId, Integer newStock);
}
