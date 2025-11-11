package com.Proyecto.Joyeria_Marly.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Proyecto.Joyeria_Marly.domain.dto.Cart;
import com.Proyecto.Joyeria_Marly.domain.dto.CartItem;
import com.Proyecto.Joyeria_Marly.persistance.entity.*;
import com.Proyecto.Joyeria_Marly.persistance.crud.*;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    @Autowired
    private PedidosCrudRepository pedidosRepository;

    @Autowired
    private DetallePedidosCrudRepository detallePedidosRepository;

    @Autowired
    private EstadoPedidosCrudRepository estadoPedidosRepository;

    @Autowired
    private UsuariosCrudRepository usuariosRepository;

    @Autowired
    private ProductoEntityService productoEntityService;

    /**
     * Obtener o crear carrito (Pedido con estado "Pendiente")
     */
    public Cart getCart(Integer userId) {
        Usuarios usuario = usuariosRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        EstadoPedidos estadoPendiente = estadoPedidosRepository.findByNombreEstado("Pendiente")
                .orElseThrow(() -> new IllegalArgumentException("Estado 'Pendiente' no configurado en la base de datos"));

        // Buscar carrito existente o crear uno nuevo
        Pedidos carrito = pedidosRepository.findByUsuarioClienteAndEstado(usuario, estadoPendiente)
                .orElseGet(() -> {
                    Pedidos nuevoCarrito = new Pedidos();
                    nuevoCarrito.setUsuarioCliente(usuario);
                    nuevoCarrito.setEstado(estadoPendiente);
                    nuevoCarrito.setMontoTotal(BigDecimal.ZERO);
                    return pedidosRepository.save(nuevoCarrito);
                });

        return convertToCart(carrito);
    }

    /**
     * Agregar producto al carrito
     */
    public Cart addToCart(Integer userId, Integer productId, Integer quantity) {
        // Validaciones
        if (quantity <= 0) {
            throw new IllegalArgumentException("La cantidad debe ser mayor a 0");
        }

        if (!productoEntityService.hasStock(productId, quantity)) {
            throw new IllegalArgumentException("Stock insuficiente");
        }

        // Obtener entidades
        Usuarios usuario = usuariosRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Productos producto = productoEntityService.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

        EstadoPedidos estadoPendiente = estadoPedidosRepository.findByNombreEstado("Pendiente")
                .orElseThrow(() -> new IllegalArgumentException("Estado 'Pendiente' no configurado"));

        // Obtener o crear carrito
        Pedidos carrito = pedidosRepository.findByUsuarioClienteAndEstado(usuario, estadoPendiente)
                .orElseGet(() -> {
                    Pedidos nuevoCarrito = new Pedidos();
                    nuevoCarrito.setUsuarioCliente(usuario);
                    nuevoCarrito.setEstado(estadoPendiente);
                    nuevoCarrito.setMontoTotal(BigDecimal.ZERO);
                    return pedidosRepository.save(nuevoCarrito);
                });

        // Buscar si el producto ya está en el carrito
        Optional<DetallePedidos> detalleExistente = detallePedidosRepository.findByPedidoAndProducto(carrito, producto);

        if (detalleExistente.isPresent()) {
            // Actualizar cantidad existente
            DetallePedidos detalle = detalleExistente.get();
            int nuevaCantidad = detalle.getCantidad() + quantity;

            if (!productoEntityService.hasStock(productId, nuevaCantidad)) {
                throw new IllegalArgumentException("Stock insuficiente para la cantidad solicitada");
            }

            detalle.setCantidad(nuevaCantidad);
            detalle.setSubtotal(producto.getPrecio().multiply(BigDecimal.valueOf(nuevaCantidad)));
            detallePedidosRepository.save(detalle);
        } else {
            // Crear nuevo detalle
            DetallePedidos nuevoDetalle = new DetallePedidos();
            nuevoDetalle.setPedido(carrito);
            nuevoDetalle.setProducto(producto);
            nuevoDetalle.setCantidad(quantity);
            nuevoDetalle.setPrecioUnitario(producto.getPrecio());
            nuevoDetalle.setSubtotal(producto.getPrecio().multiply(BigDecimal.valueOf(quantity)));
            detallePedidosRepository.save(nuevoDetalle);
        }

        // Actualizar monto total del carrito
        actualizarMontoTotalCarrito(carrito.getIdPedido());

        return getCart(userId);
    }

    /**
     * Actualizar cantidad en el carrito
     */
    public Cart updateCartItem(Integer userId, Integer productId, Integer quantity) {
        if (quantity < 0) {
            throw new IllegalArgumentException("La cantidad no puede ser negativa");
        }

        if (quantity == 0) {
            return removeFromCart(userId, productId);
        }

        if (!productoEntityService.hasStock(productId, quantity)) {
            throw new IllegalArgumentException("Stock insuficiente");
        }

        Usuarios usuario = usuariosRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Productos producto = productoEntityService.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

        EstadoPedidos estadoPendiente = estadoPedidosRepository.findByNombreEstado("Pendiente")
                .orElseThrow(() -> new IllegalArgumentException("Estado 'Pendiente' no configurado"));

        Pedidos carrito = pedidosRepository.findByUsuarioClienteAndEstado(usuario, estadoPendiente)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no encontrado"));

        DetallePedidos detalle = detallePedidosRepository.findByPedidoAndProducto(carrito, producto)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado en el carrito"));

        detalle.setCantidad(quantity);
        detalle.setSubtotal(producto.getPrecio().multiply(BigDecimal.valueOf(quantity)));
        detallePedidosRepository.save(detalle);

        actualizarMontoTotalCarrito(carrito.getIdPedido());

        return getCart(userId);
    }

    /**
     * Eliminar producto del carrito
     */
    public Cart removeFromCart(Integer userId, Integer productId) {
        Usuarios usuario = usuariosRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        EstadoPedidos estadoPendiente = estadoPedidosRepository.findByNombreEstado("Pendiente")
                .orElseThrow(() -> new IllegalArgumentException("Estado 'Pendiente' no configurado"));

        Pedidos carrito = pedidosRepository.findByUsuarioClienteAndEstado(usuario, estadoPendiente)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no encontrado"));

        detallePedidosRepository.deleteByPedidoAndProducto(carrito.getIdPedido(), productId);

        actualizarMontoTotalCarrito(carrito.getIdPedido());

        return getCart(userId);
    }

    /**
     * Vaciar carrito
     */
    public Cart clearCart(Integer userId) {
        Usuarios usuario = usuariosRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        EstadoPedidos estadoPendiente = estadoPedidosRepository.findByNombreEstado("Pendiente")
                .orElseThrow(() -> new IllegalArgumentException("Estado 'Pendiente' no configurado"));

        Pedidos carrito = pedidosRepository.findByUsuarioClienteAndEstado(usuario, estadoPendiente)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no encontrado"));

        detallePedidosRepository.deleteByPedidoId(carrito.getIdPedido());

        actualizarMontoTotalCarrito(carrito.getIdPedido());

        return getCart(userId);
    }

    /**
     * Obtener cantidad de items en el carrito
     */
    public int getCartItemCount(Integer userId) {
        Cart cart = getCart(userId);
        return cart.getTotalItems();
    }

    /**
     * Métodos auxiliares privados
     */
    private void actualizarMontoTotalCarrito(Integer pedidoId) {
        BigDecimal total = detallePedidosRepository.getTotalByPedido(pedidoId);
        Pedidos carrito = pedidosRepository.findById(pedidoId)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no encontrado"));
        carrito.setMontoTotal(total);
        pedidosRepository.save(carrito);
    }

    private Cart convertToCart(Pedidos pedido) {
        Cart cart = new Cart(pedido.getUsuarioCliente().getIdUsuario());

        // Obtener detalles del pedido
        detallePedidosRepository.findByPedido(pedido).forEach(detalle -> {
            CartItem item = new CartItem();
            item.setProductId(detalle.getProducto().getIdProducto());
            item.setProductName(detalle.getProducto().getNombreProducto());
            item.setPrice(detalle.getPrecioUnitario());
            item.setQuantity(detalle.getCantidad());
            item.setSubtotal(detalle.getSubtotal());
            item.setImageUrl(detalle.getProducto().getImagenUrl());

            cart.addItem(item);
        });

        return cart;
    }
}