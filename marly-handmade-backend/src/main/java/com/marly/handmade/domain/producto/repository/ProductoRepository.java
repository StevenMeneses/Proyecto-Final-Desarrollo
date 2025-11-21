package com.marly.handmade.domain.producto.repository;

import com.marly.handmade.domain.producto.modal.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Producto findByNombre(String nombre);

    @Query("SELECT p.stock FROM Producto p WHERE p.idProducto = :id")
    int buscarCantidadStock(Long id);

    @Query("SELECT p FROM Producto p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(p.descripcion) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Producto> buscarPorTermino(String searchTerm);
}
