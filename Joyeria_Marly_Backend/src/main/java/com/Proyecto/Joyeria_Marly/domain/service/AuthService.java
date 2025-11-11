package com.Proyecto.Joyeria_Marly.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Proyecto.Joyeria_Marly.domain.dto.LoginRequest;
import com.Proyecto.Joyeria_Marly.domain.dto.LoginResponse;
import com.Proyecto.Joyeria_Marly.domain.dto.User;
import com.Proyecto.Joyeria_Marly.domain.repository.UserRepository;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    // Simulación de tokens en memoria (en producción usar JWT o Redis)
    private final ConcurrentHashMap<String, Integer> activeTokens = new ConcurrentHashMap<>();
    
    /**
     * Autentica un usuario y genera un token de sesión
     * @param loginRequest Credenciales de login
     * @return Respuesta con token y datos del usuario
     * @throws IllegalArgumentException si las credenciales son inválidas
     */
    public LoginResponse login(LoginRequest loginRequest) {
        // Validar credenciales
        Optional<User> userOpt = userRepository.validateCredentials(
                loginRequest.getEmail(), 
                loginRequest.getPassword()
        );
        
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("Email o contraseña incorrectos");
        }
        
        User user = userOpt.get();
        
        // Verificar que el usuario esté activo
        if (user.getActive() == null || !user.getActive()) {
            throw new IllegalArgumentException("Usuario inactivo");
        }
        
        // Generar token único
        String token = UUID.randomUUID().toString();
        activeTokens.put(token, user.getUserId());
        
        // Crear respuesta con el objeto User completo
        LoginResponse response = new LoginResponse();
        response.setSuccess(true);
        response.setMessage("Login exitoso");
        response.setToken(token);
        response.setUser(user);
        
        return response;
    }
    
    /**
     * Cierra la sesión de un usuario
     * @param token Token de sesión a invalidar
     * @return true si se cerró la sesión correctamente
     */
    public boolean logout(String token) {
        if (token == null || token.isEmpty()) {
            return false;
        }
        
        return activeTokens.remove(token) != null;
    }
    
    /**
     * Valida si un token es válido y está activo
     * @param token Token a validar
     * @return ID del usuario si el token es válido, null en caso contrario
     */
    public Integer validateToken(String token) {
        return activeTokens.get(token);
    }
    
    /**
     * Verifica si un usuario está autenticado
     * @param token Token de sesión
     * @return true si el token es válido
     */
    public boolean isAuthenticated(String token) {
        return token != null && activeTokens.containsKey(token);
    }
    
    /**
     * Obtiene el usuario autenticado por su token
     * @param token Token de sesión
     * @return Usuario autenticado
     */
    public Optional<User> getAuthenticatedUser(String token) {
        Integer userId = validateToken(token);
        if (userId != null) {
            return userRepository.findById(userId);
        }
        return Optional.empty();
    }
    
}
