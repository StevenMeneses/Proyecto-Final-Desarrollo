package com.Proyecto.Joyeria_Marly.persistance.crud;

import com.Proyecto.Joyeria_Marly.persistance.entity.EstadoPedidos;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EstadoPedidosCrudRepository extends JpaRepository<EstadoPedidos, Integer> {

    // Buscar estado por nombre
    Optional<EstadoPedidos> findByNombreEstado(String nombreEstado);
}