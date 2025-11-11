package com.Proyecto.Joyeria_Marly.persistance.crud;

import org.springframework.data.repository.CrudRepository;
import com.Proyecto.Joyeria_Marly.persistance.entity.Roles;

import java.util.Optional;

public interface RolesCrudRepository extends CrudRepository<Roles, Integer> {
    
    // Método personalizado para buscar por nombre de rol
    Optional<Roles> findByNombreRol(String nombreRol);
    
    // Método para verificar si existe un rol por nombre
    boolean existsByNombreRol(String nombreRol);
}