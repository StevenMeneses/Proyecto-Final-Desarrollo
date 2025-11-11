package com.Proyecto.Joyeria_Marly.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Proyecto.Joyeria_Marly.domain.dto.LoginRequest;
import com.Proyecto.Joyeria_Marly.domain.dto.LoginResponse;
import com.Proyecto.Joyeria_Marly.domain.dto.User;
import com.Proyecto.Joyeria_Marly.domain.service.AuthService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    /**
     * Endpoint para iniciar sesión
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Validaciones básicas
            if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty()) {
                LoginResponse errorResponse = new LoginResponse();
                errorResponse.setSuccess(false);
                errorResponse.setMessage("El email es obligatorio");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            if (loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
                LoginResponse errorResponse = new LoginResponse();
                errorResponse.setSuccess(false);
                errorResponse.setMessage("La contraseña es obligatoria");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            // Realizar login
            LoginResponse response = authService.login(loginRequest);
            
            // No devolver la contraseña del usuario
            if (response.getUser() != null) {
                response.getUser().setPassword(null);
            }
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            LoginResponse errorResponse = new LoginResponse();
            errorResponse.setSuccess(false);
            errorResponse.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            
        } catch (Exception e) {
            LoginResponse errorResponse = new LoginResponse();
            errorResponse.setSuccess(false);
            errorResponse.setMessage("Error al iniciar sesión: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    /**
     * Endpoint para cerrar sesión
     * POST /api/auth/logout
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Extraer token del header (formato: "Bearer <token>")
            String token = extractToken(authHeader);
            
            if (token == null) {
                response.put("success", false);
                response.put("message", "Token no proporcionado");
                return ResponseEntity.badRequest().body(response);
            }
            
            boolean loggedOut = authService.logout(token);
            
            if (loggedOut) {
                response.put("success", true);
                response.put("message", "Sesión cerrada exitosamente");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Token inválido o sesión ya cerrada");
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al cerrar sesión: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para validar token
     * GET /api/auth/validate
     */
    @GetMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateToken(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String token = extractToken(authHeader);
            
            if (token == null) {
                response.put("valid", false);
                response.put("message", "Token no proporcionado");
                return ResponseEntity.badRequest().body(response);
            }
            
            boolean isAuthenticated = authService.isAuthenticated(token);
            
            if (isAuthenticated) {
                Optional<User> user = authService.getAuthenticatedUser(token);
                
                if (user.isPresent()) {
                    User authenticatedUser = user.get();
                    authenticatedUser.setPassword(null); // No devolver contraseña
                    
                    response.put("valid", true);
                    response.put("user", authenticatedUser);
                    return ResponseEntity.ok(response);
                }
            }
            
            response.put("valid", false);
            response.put("message", "Token inválido o expirado");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            
        } catch (Exception e) {
            response.put("valid", false);
            response.put("message", "Error al validar token: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
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
