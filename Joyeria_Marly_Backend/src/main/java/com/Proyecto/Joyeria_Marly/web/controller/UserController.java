package com.Proyecto.Joyeria_Marly.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Proyecto.Joyeria_Marly.domain.dto.User;
import com.Proyecto.Joyeria_Marly.domain.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * Endpoint para registrar un nuevo usuario
     * POST /api/users/register
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validaciones básicas
            if (user.getEmail() == null || user.getEmail().isEmpty()) {
                response.put("success", false);
                response.put("message", "El email es obligatorio");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                response.put("success", false);
                response.put("message", "La contraseña es obligatoria");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (user.getDni() == null || user.getDni().isEmpty()) {
                response.put("success", false);
                response.put("message", "El DNI es obligatorio");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Registrar usuario
            User registeredUser = userService.registerUser(user);
            
            // No devolver la contraseña en la respuesta
            registeredUser.setPassword(null);
            
            response.put("success", true);
            response.put("message", "Usuario registrado exitosamente");
            response.put("user", registeredUser);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al registrar el usuario: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para obtener un usuario por ID
     * GET /api/users/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUserById(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            User user = userService.getUserById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
            
            // No devolver la contraseña
            user.setPassword(null);
            
            response.put("success", true);
            response.put("user", user);
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al obtener el usuario: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para actualizar un usuario
     * PUT /api/users/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateUser(
            @PathVariable Integer id,
            @RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            user.setUserId(id);
            User updatedUser = userService.updateUser(user);
            
            if (updatedUser == null) {
                response.put("success", false);
                response.put("message", "Usuario no encontrado");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            // No devolver la contraseña
            updatedUser.setPassword(null);
            
            response.put("success", true);
            response.put("message", "Usuario actualizado exitosamente");
            response.put("user", updatedUser);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al actualizar el usuario: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para desactivar un usuario
     * DELETE /api/users/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deactivateUser(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean deactivated = userService.deactivateUser(id);
            
            if (!deactivated) {
                response.put("success", false);
                response.put("message", "Usuario no encontrado");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            response.put("success", true);
            response.put("message", "Usuario desactivado exitosamente");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al desactivar el usuario: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
