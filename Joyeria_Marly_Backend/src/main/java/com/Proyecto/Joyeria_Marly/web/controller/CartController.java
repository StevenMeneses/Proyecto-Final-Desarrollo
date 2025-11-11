package com.Proyecto.Joyeria_Marly.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Proyecto.Joyeria_Marly.domain.dto.Cart;
import com.Proyecto.Joyeria_Marly.domain.service.AuthService;
import com.Proyecto.Joyeria_Marly.domain.service.CartService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @Autowired
    private AuthService authService;
    
    /**
     * Endpoint para obtener el carrito del usuario autenticado
     * GET /api/cart
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getCart(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Integer userId = getUserIdFromToken(authHeader);
            
            if (userId == null) {
                response.put("success", false);
                response.put("message", "Usuario no autenticado");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
            
            Cart cart = cartService.getCart(userId);
            
            response.put("success", true);
            response.put("cart", cart);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al obtener el carrito: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para agregar un producto al carrito
     * POST /api/cart/add
     */
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addToCart(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, Integer> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Integer userId = getUserIdFromToken(authHeader);
            
            if (userId == null) {
                response.put("success", false);
                response.put("message", "Usuario no autenticado");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
            
            Integer productId = request.get("productId");
            Integer quantity = request.get("quantity");
            
            if (productId == null || quantity == null) {
                response.put("success", false);
                response.put("message", "productId y quantity son obligatorios");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (quantity <= 0) {
                response.put("success", false);
                response.put("message", "La cantidad debe ser mayor a 0");
                return ResponseEntity.badRequest().body(response);
            }
            
            Cart cart = cartService.addToCart(userId, productId, quantity);
            
            response.put("success", true);
            response.put("message", "Producto agregado al carrito");
            response.put("cart", cart);
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al agregar producto al carrito: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para actualizar la cantidad de un producto en el carrito
     * PUT /api/cart/update
     */
    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateCartItem(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, Integer> request) {  // ← ¿Está usando @RequestBody?
        Map<String, Object> response = new HashMap<>();
        
        try {
            Integer userId = getUserIdFromToken(authHeader);
            
            if (userId == null) {
                response.put("success", false);
                response.put("message", "Usuario no autenticado");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
            
            Integer productId = request.get("productId");
            Integer quantity = request.get("quantity");
            
            if (productId == null || quantity == null) {
                response.put("success", false);
                response.put("message", "productId y quantity son obligatorios");
                return ResponseEntity.badRequest().body(response);
            }
            
            Cart cart = cartService.updateCartItem(userId, productId, quantity);
            
            response.put("success", true);
            response.put("message", "Cantidad actualizada");
            response.put("cart", cart);
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al actualizar el carrito: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para remover un producto del carrito
     * DELETE /api/cart/remove/{productId}
     */
    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Map<String, Object>> removeFromCart(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Integer productId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Integer userId = getUserIdFromToken(authHeader);
            
            if (userId == null) {
                response.put("success", false);
                response.put("message", "Usuario no autenticado");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
            
            Cart cart = cartService.removeFromCart(userId, productId);
            
            response.put("success", true);
            response.put("message", "Producto removido del carrito");
            response.put("cart", cart);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al remover producto del carrito: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para vaciar el carrito
     * DELETE /api/cart/clear
     */
    @DeleteMapping("/clear")
    public ResponseEntity<Map<String, Object>> clearCart(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Integer userId = getUserIdFromToken(authHeader);
            
            if (userId == null) {
                response.put("success", false);
                response.put("message", "Usuario no autenticado");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
            
            Cart cart = cartService.clearCart(userId);
            
            response.put("success", true);
            response.put("message", "Carrito vaciado");
            response.put("cart", cart);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al vaciar el carrito: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para obtener la cantidad de items en el carrito
     * GET /api/cart/count
     */
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> getCartItemCount(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Integer userId = getUserIdFromToken(authHeader);
            
            if (userId == null) {
                response.put("success", false);
                response.put("message", "Usuario no autenticado");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
            
            int count = cartService.getCartItemCount(userId);
            
            response.put("success", true);
            response.put("count", count);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al obtener cantidad de items: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Método auxiliar para extraer el userId del token
     */
    private Integer getUserIdFromToken(String authHeader) {
        String token = extractToken(authHeader);
        if (token != null) {
            return authService.validateToken(token);
        }
        return null;
    }
    
    /**
     * Método auxiliar para extraer el token del header Authorization
     */
    private String extractToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return authHeader;
    }
}
