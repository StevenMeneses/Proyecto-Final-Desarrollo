package com.Proyecto.Joyeria_Marly.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Proyecto.Joyeria_Marly.domain.dto.Product;
import com.Proyecto.Joyeria_Marly.domain.repository.ProductRepository;

import java.util.List;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    /**
     * Obtiene todos los productos
     * @return Lista de todos los productos
     */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    /**
     * Obtiene los detalles de un producto por su ID
     * @param productId ID del producto
     * @return Producto encontrado
     * @throws IllegalArgumentException si el producto no existe
     */
    public Product getProductDetail(Integer productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
    }
    
    /**
     * Obtiene productos por categoría
     * @param categoryId ID de la categoría
     * @return Lista de productos de la categoría
     */
    public List<Product> getProductsByCategory(Integer categoryId) {
        return productRepository.findByCategory(categoryId);
    }
    
    
    /**
     * Busca productos por nombre
     * @param name Nombre o parte del nombre del producto
     * @return Lista de productos que coinciden con el nombre
     */
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContaining(name);
    }
    
    /**
     * Crea un nuevo producto
     * @param product Datos del producto
     * @return Producto creado
     */
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
    
    /**
     * Actualiza un producto existente
     * @param product Datos actualizados del producto
     * @return Producto actualizado
     * @throws IllegalArgumentException si el producto no existe
     */
    public Product updateProduct(Product product) {
        Product updated = productRepository.update(product);
        if (updated == null) {
            throw new IllegalArgumentException("Producto no encontrado");
        }
        return updated;
    }
    
    /**
     * Elimina un producto
     * @param productId ID del producto a eliminar
     * @return true si se eliminó correctamente
     */
    public boolean deleteProduct(Integer productId) {
        return productRepository.delete(productId);
    }
    
    /**
     * Verifica si hay stock disponible de un producto
     * @param productId ID del producto
     * @param quantity Cantidad solicitada
     * @return true si hay stock suficiente
     */
    public boolean hasStock(Integer productId, Integer quantity) {
        Product product = getProductDetail(productId);
        return product.getStock() >= quantity;
    }
    
    /**
     * Reduce el stock de un producto
     * @param productId ID del producto
     * @param quantity Cantidad a reducir
     * @return true si se redujo el stock correctamente
     * @throws IllegalArgumentException si no hay stock suficiente
     */
    public boolean reduceStock(Integer productId, Integer quantity) {
        Product product = getProductDetail(productId);
        
        if (product.getStock() < quantity) {
            throw new IllegalArgumentException("Stock insuficiente");
        }
        
        int newStock = product.getStock() - quantity;
        return productRepository.updateStock(productId, newStock);
    }
}
