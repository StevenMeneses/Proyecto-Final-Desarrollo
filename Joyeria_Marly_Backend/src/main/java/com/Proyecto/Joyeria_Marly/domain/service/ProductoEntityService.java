package com.Proyecto.Joyeria_Marly.domain.service;

import com.Proyecto.Joyeria_Marly.persistance.entity.Productos;
import com.Proyecto.Joyeria_Marly.persistance.crud.ProductosCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class ProductoEntityService {

    @Autowired
    private ProductosCrudRepository productosRepository;

    /**
     * Obtener producto por ID (entidad JPA)
     */
    public Optional<Productos> findById(Integer productId) {
        return productosRepository.findById(productId);
    }

    /**
     * Verificar stock disponible
     */
    public boolean hasStock(Integer productId, Integer quantity) {
        Optional<Productos> productoOpt = productosRepository.findById(productId);
        if (productoOpt.isPresent()) {
            Productos producto = productoOpt.get();
            return producto.getStock() >= quantity;
        }
        return false;
    }

    /**
     * Reducir stock (con control de transacciones)
     */
    @Transactional
    public boolean reduceStock(Integer productId, Integer quantity) {
        Optional<Productos> productoOpt = productosRepository.findById(productId);
        if (productoOpt.isPresent()) {
            Productos producto = productoOpt.get();
            if (producto.getStock() >= quantity) {
                producto.setStock(producto.getStock() - quantity);
                productosRepository.save(producto);
                return true;
            }
        }
        return false;
    }

    /**
     * Obtener precio del producto
     */
    public Optional<BigDecimal> getPrice(Integer productId) {
        return productosRepository.findById(productId)
                .map(Productos::getPrecio);
    }
}