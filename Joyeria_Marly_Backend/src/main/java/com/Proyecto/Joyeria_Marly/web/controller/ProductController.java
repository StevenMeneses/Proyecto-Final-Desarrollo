package com.Proyecto.Joyeria_Marly.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Proyecto.Joyeria_Marly.domain.dto.Product;
import com.Proyecto.Joyeria_Marly.domain.service.ProductService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    /**
     * Endpoint para obtener todos los productos
     * GET /api/products
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllProducts() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Product> products = productService.getAllProducts();
            
            response.put("success", true);
            response.put("products", products);
            response.put("total", products.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al obtener productos: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para obtener detalle de un producto
     * GET /api/products/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getProductDetail(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Product product = productService.getProductDetail(id);
            
            response.put("success", true);
            response.put("product", product);
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al obtener el producto: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para buscar productos por categoría
     * GET /api/products/category/{categoryId}
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Map<String, Object>> getProductsByCategory(@PathVariable Integer categoryId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Product> products = productService.getProductsByCategory(categoryId);
            
            response.put("success", true);
            response.put("products", products);
            response.put("total", products.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al obtener productos por categoría: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para buscar productos por nombre
     * GET /api/products/search?name={name}
     */
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchProducts(@RequestParam String name) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Product> products = productService.searchProductsByName(name);
            
            response.put("success", true);
            response.put("products", products);
            response.put("total", products.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al buscar productos: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para crear un nuevo producto
     * POST /api/products
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createProduct(@RequestBody Product product) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Product createdProduct = productService.createProduct(product);
            
            response.put("success", true);
            response.put("message", "Producto creado exitosamente");
            response.put("product", createdProduct);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al crear el producto: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para actualizar un producto
     * PUT /api/products/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateProduct(
            @PathVariable Integer id,
            @RequestBody Product product) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            product.setProductId(id);
            Product updatedProduct = productService.updateProduct(product);
            
            response.put("success", true);
            response.put("message", "Producto actualizado exitosamente");
            response.put("product", updatedProduct);
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al actualizar el producto: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para eliminar un producto
     * DELETE /api/products/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteProduct(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean deleted = productService.deleteProduct(id);
            
            if (!deleted) {
                response.put("success", false);
                response.put("message", "Producto no encontrado");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            response.put("success", true);
            response.put("message", "Producto eliminado exitosamente");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al eliminar el producto: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
