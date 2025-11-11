package com.Proyecto.Joyeria_Marly.persistance.crud;

import org.springframework.data.repository.CrudRepository;
import com.Proyecto.Joyeria_Marly.persistance.entity.Usuarios;
import com.Proyecto.Joyeria_Marly.persistance.entity.Roles;
import java.util.Optional;
import java.util.List;

public interface UsuariosCrudRepository extends CrudRepository<Usuarios, Integer> {
    
    // Buscar por email (único)
    Optional<Usuarios> findByEmail(String email);
    
    // Buscar por DNI (único)
    Optional<Usuarios> findByDni(String dni);
    
    // Buscar por rol
    List<Usuarios> findByRol(Roles rol);
    
    // Buscar usuarios activos
    List<Usuarios> findByActivoTrue();
    
    // Buscar usuarios inactivos
    List<Usuarios> findByActivoFalse();
    
    // Verificar si existe por email
    boolean existsByEmail(String email);
    
    // Verificar si existe por DNI
    boolean existsByDni(String dni);
    
    // Buscar por nombre y apellido (contiene)
    List<Usuarios> findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(String nombre, String apellido);
}