package com.marly.handmade.controller;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.usuario.data.responst.ClienteConUsuarioResponse;
import com.marly.handmade.domain.usuario.modal.Usuario;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteRepository clienteRepository;

    // nuevo endpoint
    @GetMapping("/all")
    public List<ClienteConUsuarioResponse> listarClientesRol1() {
        return clienteRepository.listarClientesConRol1();
    }

    @GetMapping("/perfil")
    public ResponseEntity<?> obtenerPerfilActual() {
        try {
            // Verificar que hay autenticación
            var authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body("No autenticado");
            }
            
            Object principal = authentication.getPrincipal();
            System.out.println("=== DEBUG PERFIL ===");
            System.out.println("Principal obtenido: " + principal);
            System.out.println("Tipo de principal: " + principal.getClass().getName());
            
            // Verificar que el principal es un Usuario
            if (principal instanceof String) {
                return ResponseEntity.status(401).body("Token no válido o sesión expirada");
            }
            
            if (!(principal instanceof Usuario)) {
                return ResponseEntity.badRequest().body("Usuario no autenticado correctamente. Tipo: " + principal.getClass().getName());
            }
            
            Usuario usuario = (Usuario) principal;
            System.out.println("Usuario ID: " + usuario.getId());
            System.out.println("Usuario Username: " + usuario.getUsername());
            System.out.println("Usuario Rol: " + usuario.getRol());
            
            // Buscar cliente solo si es un usuario con rol CLIENTE
            Cliente cliente = null;
            if (usuario.getRol() != null && usuario.getRol().name().equals("CLIENTE")) {
                cliente = clienteRepository.findByUsuario_Id(usuario.getId());
                System.out.println("Cliente encontrado: " + (cliente != null ? cliente.getId() : "null"));
            } else {
                System.out.println("Usuario es ADMIN - no tiene registro en tabla Clientes");
            }
            
            // Si no hay cliente (porque es admin o no se ha creado el registro)
            if (cliente == null) {
                System.out.println("Devolviendo datos básicos del usuario (sin cliente)");
                return ResponseEntity.ok().body(new ClienteResponse(
                    null,
                    "",
                    "",
                    "",
                    "",
                    "",
                    usuario.getUsername()
                ));
            }
            
            ClienteResponse response = new ClienteResponse(
                cliente.getId(),
                cliente.getNombres(),
                cliente.getApellidos(),
                cliente.getCorreo(),
                cliente.getTelefono(),
                cliente.getDireccion(),
                usuario.getUsername()
            );
            
            System.out.println("Response enviado: " + response);
            System.out.println("===================");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("ERROR en obtenerPerfilActual:");
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al obtener perfil: " + e.getMessage());
        }
    }

    // DTO para la respuesta del perfil
    record ClienteResponse(
        Long id,
        String nombres,
        String apellidos,
        String correo,
        String telefono,
        String direccion,
        String username
    ) {}
}

