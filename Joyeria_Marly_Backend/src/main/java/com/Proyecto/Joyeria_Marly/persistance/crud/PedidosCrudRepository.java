package com.Proyecto.Joyeria_Marly.persistance.crud;

import com.Proyecto.Joyeria_Marly.persistance.entity.Pedidos;
import com.Proyecto.Joyeria_Marly.persistance.entity.Usuarios;
import com.Proyecto.Joyeria_Marly.persistance.entity.EstadoPedidos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.List;

public interface PedidosCrudRepository extends JpaRepository<Pedidos, Integer> {

    // Buscar pedido pendiente de un usuario
    Optional<Pedidos> findByUsuarioClienteAndEstado(Usuarios usuarioCliente, EstadoPedidos estado);

    // Buscar todos los pedidos de un usuario
    List<Pedidos> findByUsuarioCliente(Usuarios usuarioCliente);

    // Buscar pedidos por estado
    List<Pedidos> findByEstado(EstadoPedidos estado);

    // Verificar si existe un pedido pendiente para el usuario
    @Query("SELECT COUNT(p) > 0 FROM Pedidos p WHERE p.usuarioCliente.idUsuario = :userId AND p.estado.nombreEstado = 'Pendiente'")
    boolean existsPendingCart(@Param("userId") Integer userId);
}