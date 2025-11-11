package com.Proyecto.Joyeria_Marly.persistance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.Proyecto.Joyeria_Marly.domain.dto.User;
import com.Proyecto.Joyeria_Marly.domain.repository.UserRepository;
import com.Proyecto.Joyeria_Marly.persistance.crud.UsuariosCrudRepository;
import com.Proyecto.Joyeria_Marly.persistance.crud.RolesCrudRepository;
import com.Proyecto.Joyeria_Marly.persistance.entity.Usuarios;
import com.Proyecto.Joyeria_Marly.persistance.entity.Roles;
import com.Proyecto.Joyeria_Marly.persistance.mapper.UsuarioMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Repository
public class UsuarioRepository implements UserRepository {
    
    @Autowired
    private UsuariosCrudRepository usuariosCrudRepository;
    
    @Autowired
    private RolesCrudRepository rolesCrudRepository;
    
    @Autowired
    private UsuarioMapper usuarioMapper;
    
    @Override
    public User save(User user) {
        Usuarios usuario = usuarioMapper.toUsuario(user);
        
        // Asignar rol por defecto (Cliente) si no tiene
        if (user.getRoleId() == null) {
            Optional<Roles> rolCliente = rolesCrudRepository.findByNombreRol("Cliente");
            rolCliente.ifPresent(usuario::setRol);
        } else {
            rolesCrudRepository.findById(user.getRoleId()).ifPresent(usuario::setRol);
        }
        
        usuario.setActivo(true);
        Usuarios savedUsuario = usuariosCrudRepository.save(usuario);
        return usuarioMapper.toUser(savedUsuario);
    }
    
    @Override
    public Optional<User> findById(Integer userId) {
        return usuariosCrudRepository.findById(userId)
                .map(usuarioMapper::toUser);
    }
    
    @Override
    public Optional<User> findByEmail(String email) {
        return usuariosCrudRepository.findByEmail(email)
                .map(usuarioMapper::toUser);
    }
    
    @Override
    public Optional<User> findByDni(String dni) {
        return usuariosCrudRepository.findByDni(dni)
                .map(usuarioMapper::toUser);
    }
    
    @Override
    public List<User> findAll() {
        return StreamSupport.stream(usuariosCrudRepository.findAll().spliterator(), false)
                .map(usuarioMapper::toUser)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<User> findActiveUsers() {
        return usuariosCrudRepository.findByActivoTrue().stream()
                .map(usuarioMapper::toUser)
                .collect(Collectors.toList());
    }
    
    @Override
    public User update(User user) {
        return usuariosCrudRepository.findById(user.getUserId())
                .map(existingUsuario -> {
                    existingUsuario.setNombre(user.getName());
                    existingUsuario.setApellido(user.getLastName());
                    existingUsuario.setTelefono(user.getPhone());
                    existingUsuario.setDireccion(user.getAddress());
                    
                    if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                        existingUsuario.setPassword(user.getPassword());
                    }
                    
                    return usuarioMapper.toUser(usuariosCrudRepository.save(existingUsuario));
                })
                .orElse(null);
    }
    
    @Override
    public boolean deactivate(Integer userId) {
        return usuariosCrudRepository.findById(userId)
                .map(usuario -> {
                    usuario.setActivo(false);
                    usuariosCrudRepository.save(usuario);
                    return true;
                })
                .orElse(false);
    }
    
    @Override
    public boolean existsByEmail(String email) {
        return usuariosCrudRepository.existsByEmail(email);
    }
    
    @Override
    public boolean existsByDni(String dni) {
        return usuariosCrudRepository.existsByDni(dni);
    }
    
    @Override
    public Optional<User> validateCredentials(String email, String password) {
        return usuariosCrudRepository.findByEmail(email)
                .filter(usuario -> usuario.getPassword().equals(password))
                .filter(usuario -> usuario.getActivo())
                .map(usuarioMapper::toUser);
    }
}
