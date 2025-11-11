package com.Proyecto.Joyeria_Marly.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Proyecto.Joyeria_Marly.domain.dto.User;
import com.Proyecto.Joyeria_Marly.domain.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Registra un nuevo usuario en el sistema
     * @param user Datos del usuario a registrar
     * @return Usuario registrado
     * @throws IllegalArgumentException si el email ya existe
     */
    public User registerUser(User user) {
        // Validar que el email no exista
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }
        
        // Validar que el DNI no exista
        if (userRepository.existsByDni(user.getDni())) {
            throw new IllegalArgumentException("El DNI ya está registrado");
        }
        
        // Establecer el usuario como activo por defecto
        user.setActive(true);
        
        // Si no se especifica un rol, asignar rol de cliente (2)
        if (user.getRoleId() == null) {
            user.setRoleId(2); // Cliente por defecto
        }
        
        // Guardar usuario (la contraseña debería estar hasheada antes de llegar aquí)
        return userRepository.save(user);
    }
    
    /**
     * Obtiene un usuario por su ID
     * @param userId ID del usuario
     * @return Usuario encontrado
     */
    public Optional<User> getUserById(Integer userId) {
        return userRepository.findById(userId);
    }
    
    /**
     * Obtiene un usuario por su email
     * @param email Email del usuario
     * @return Usuario encontrado
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    /**
     * Actualiza los datos de un usuario
     * @param user Datos actualizados del usuario
     * @return Usuario actualizado
     */
    public User updateUser(User user) {
        return userRepository.update(user);
    }
    
    /**
     * Desactiva un usuario (borrado lógico)
     * @param userId ID del usuario a desactivar
     * @return true si se desactivó correctamente
     */
    public boolean deactivateUser(Integer userId) {
        return userRepository.deactivate(userId);
    }
}
