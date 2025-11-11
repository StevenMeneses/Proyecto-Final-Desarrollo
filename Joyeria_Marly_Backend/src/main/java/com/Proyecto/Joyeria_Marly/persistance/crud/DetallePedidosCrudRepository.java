package com.Proyecto.Joyeria_Marly.persistance.crud;

import com.Proyecto.Joyeria_Marly.persistance.entity.DetallePedidos;
import com.Proyecto.Joyeria_Marly.persistance.entity.Pedidos;
import com.Proyecto.Joyeria_Marly.persistance.entity.Productos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface DetallePedidosCrudRepository extends JpaRepository<DetallePedidos, Integer> {

    // Buscar detalles de un pedido
    List<DetallePedidos> findByPedido(Pedidos pedido);

    // Buscar un detalle específico por pedido y producto
    Optional<DetallePedidos> findByPedidoAndProducto(Pedidos pedido, Productos producto);

    // Eliminar detalles por pedido
    @Modifying
    @Query("DELETE FROM DetallePedidos dp WHERE dp.pedido.idPedido = :pedidoId")
    void deleteByPedidoId(@Param("pedidoId") Integer pedidoId);

    // Eliminar un detalle específico
    @Modifying
    @Query("DELETE FROM DetallePedidos dp WHERE dp.pedido.idPedido = :pedidoId AND dp.producto.idProducto = :productoId")
    void deleteByPedidoAndProducto(@Param("pedidoId") Integer pedidoId, @Param("productoId") Integer productoId);

    // Calcular subtotal de un pedido
    @Query("SELECT COALESCE(SUM(dp.subtotal), 0) FROM DetallePedidos dp WHERE dp.pedido.idPedido = :pedidoId")
    BigDecimal getTotalByPedido(@Param("pedidoId") Integer pedidoId);
}