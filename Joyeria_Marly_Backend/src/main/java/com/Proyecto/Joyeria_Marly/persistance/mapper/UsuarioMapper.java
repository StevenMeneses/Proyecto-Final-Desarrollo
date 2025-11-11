package com.Proyecto.Joyeria_Marly.persistance.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import com.Proyecto.Joyeria_Marly.domain.dto.User;
import com.Proyecto.Joyeria_Marly.persistance.entity.Usuarios;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {
    
    @Mappings({
        @Mapping(source = "idUsuario", target = "userId"),
        @Mapping(source = "nombre", target = "name"),
        @Mapping(source = "apellido", target = "lastName"),
        @Mapping(source = "dni", target = "dni"),
        @Mapping(source = "email", target = "email"),
        @Mapping(source = "password", target = "password"),
        @Mapping(source = "telefono", target = "phone"),
        @Mapping(source = "direccion", target = "address"),
        @Mapping(source = "activo", target = "active"),
        @Mapping(source = "rol.idRol", target = "roleId"),
        @Mapping(source = "rol.nombreRol", target = "roleName")
    })
    User toUser(Usuarios usuario);
    
    @InheritInverseConfiguration
    @Mapping(target = "rol", ignore = true)
    Usuarios toUsuario(User user);
}
