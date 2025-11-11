package com.Proyecto.Joyeria_Marly.persistance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.Proyecto.Joyeria_Marly.domain.dto.Product;
import com.Proyecto.Joyeria_Marly.domain.repository.ProductRepository;
import com.Proyecto.Joyeria_Marly.persistance.crud.ProductosCrudRepository;
import com.Proyecto.Joyeria_Marly.persistance.crud.CategoriasProductosCrudRepository;
import com.Proyecto.Joyeria_Marly.persistance.entity.Productos;
import com.Proyecto.Joyeria_Marly.persistance.mapper.ProductoMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Repository
public class ProductoRepository implements ProductRepository {
    
    @Autowired
    private ProductosCrudRepository productosCrudRepository;
    
    @Autowired
    private CategoriasProductosCrudRepository categoriasCrudRepository;
    
    @Autowired
    private ProductoMapper productoMapper;
    
    @Override
    public List<Product> findAll() {
        return StreamSupport.stream(productosCrudRepository.findAll().spliterator(), false)
                .map(productoMapper::toProduct)
                .collect(Collectors.toList());
    }
    
    @Override
    public Optional<Product> findById(Integer productId) {
        return productosCrudRepository.findById(productId)
                .map(productoMapper::toProduct);
    }
    
    @Override
    public List<Product> findByCategory(Integer categoryId) {
        return categoriasCrudRepository.findById(categoryId)
                .map(categoria -> productosCrudRepository.findByCategoria(categoria).stream()
                        .map(productoMapper::toProduct)
                        .collect(Collectors.toList()))
                .orElse(List.of());
    }
    
    @Override
    public List<Product> findByNameContaining(String name) {
        return productosCrudRepository.findByNombreProductoContainingIgnoreCase(name).stream()
                .map(productoMapper::toProduct)
                .collect(Collectors.toList());
    }
    
    @Override
    public Product save(Product product) {
        Productos producto = productoMapper.toProductos(product);
        
        if (product.getCategoryId() != null) {
            categoriasCrudRepository.findById(product.getCategoryId())
                    .ifPresent(producto::setCategoria);
        }
        
        Productos savedProducto = productosCrudRepository.save(producto);
        return productoMapper.toProduct(savedProducto);
    }
    
    @Override
    public Product update(Product product) {
        return productosCrudRepository.findById(product.getProductId())
                .map(existingProducto -> {
                    existingProducto.setNombreProducto(product.getName());
                    existingProducto.setDescripcion(product.getDescription());
                    existingProducto.setPrecio(product.getPrice());
                    existingProducto.setStock(product.getStock());
                    existingProducto.setImagenUrl(product.getImageUrl());
                    
                    if (product.getCategoryId() != null) {
                        categoriasCrudRepository.findById(product.getCategoryId())
                                .ifPresent(existingProducto::setCategoria);
                    }
                    
                    return productoMapper.toProduct(productosCrudRepository.save(existingProducto));
                })
                .orElse(null);
    }
    
    @Override
    public boolean delete(Integer productId) {
        return productosCrudRepository.findById(productId)
                .map(producto -> {
                    productosCrudRepository.delete(producto);
                    return true;
                })
                .orElse(false);
    }
    
    @Override
    public boolean updateStock(Integer productId, Integer newStock) {
        return productosCrudRepository.findById(productId)
                .map(producto -> {
                    producto.setStock(newStock);
                    productosCrudRepository.save(producto);
                    return true;
                })
                .orElse(false);
    }
}

