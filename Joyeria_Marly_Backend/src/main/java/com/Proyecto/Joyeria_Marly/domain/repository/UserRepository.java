package com.Proyecto.Joyeria_Marly.domain.repository;

import com.Proyecto.Joyeria_Marly.domain.dto.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository {
    
    // Crear nuevo usuario
    User save(User user);
    
    // Buscar usuario por ID
    Optional<User> findById(Integer userId);
    
    // Buscar usuario por email
    Optional<User> findByEmail(String email);
    
    // Buscar usuario por DNI
    Optional<User> findByDni(String dni);
    
    // Obtener todos los usuarios
    List<User> findAll();
    
    // Obtener usuarios activos
    List<User> findActiveUsers();
    
    // Actualizar usuario
    User update(User user);
    
    // Eliminar usuario (lógico)
    boolean deactivate(Integer userId);
    
    // Verificar si existe email
    boolean existsByEmail(String email);
    
    // Verificar si existe DNI
    boolean existsByDni(String dni);
    
    // Validar credenciales de login
    Optional<User> validateCredentials(String email, String password);
}
