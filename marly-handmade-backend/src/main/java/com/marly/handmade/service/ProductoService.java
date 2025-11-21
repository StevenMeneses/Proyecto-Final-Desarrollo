package com.marly.handmade.service;

import com.marly.handmade.domain.producto.data.ProductoRequest;

import com.marly.handmade.domain.producto.data.ProductoResponse;

import com.marly.handmade.domain.producto.data.ProductoUpdate;

import com.marly.handmade.domain.producto.modal.Producto;

import com.marly.handmade.domain.producto.repository.ProductoRepository;

import org.springframework.stereotype.Service;

import com.marly.handmade.util.ApacheCommonsUtils;

import java.util.List;

import java.util.Optional;

@Service

public class ProductoService {

    private ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {

        this.productoRepository = productoRepository;

    }

    public ProductoResponse crearProducto(ProductoRequest productoRequest) {

        Producto productoExistente = productoRepository.findByNombre(productoRequest.nombre());

        ApacheCommonsUtils.requireNonNullRuntime(productoExistente == null ? new Object() : null,
                "Ya existe un producto con ese nombre");

        Producto producto = Producto.builder()
                .nombre(productoRequest.nombre())
                .descripcion(productoRequest.descripcion())
                .precio(productoRequest.precio())
                .stock(productoRequest.stock())
                .fotoPrincipal(productoRequest.fotoPrincipal())
                .fotoSecundario(productoRequest.fotoSecundario())
                .fotoTerciario(productoRequest.fotoTerciario())
                .categoria(productoRequest.categoria())
                .details(productoRequest.details())
                .care(productoRequest.care())
                .shippingInfo(productoRequest.shippingInfo())
                .status(true)
                .build();

        productoRepository.save(producto);

        return new ProductoResponse(producto);

    }

    public List<ProductoResponse> listarProductos() {

        return productoRepository.findAll().stream().map(ProductoResponse::new).toList();

    }

    public List<ProductoResponse> buscarPorTermino(String searchTerm) {

        return productoRepository.buscarPorTermino(searchTerm).stream().map(ProductoResponse::new).toList();

    }

    public ProductoResponse buscar(String nombre, Long id) {

        if (id != null)
            return mostrarPorId(id);

        if (nombre != null)
            return mostrarPorNombre(nombre);

        else
            throw new RuntimeException("Debe enviar un parámetro id o nombre");

    }

    public ProductoResponse mostrarPorNombre(String nombre) {

        Producto producto = Optional.ofNullable(productoRepository.findByNombre(nombre))
                .orElseThrow(() -> new RuntimeException("El producto con ese nombre no existe"));

        return new ProductoResponse(producto);

    }

    public ProductoResponse mostrarPorId(long id) {

        return new ProductoResponse(productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("El producto con ese id no existe")));

    }

    public ProductoResponse update(long id, ProductoUpdate productoUpdate) {

        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("El producto con ese id no existe"));

        producto.update(productoUpdate);

        productoRepository.save(producto);

        return new ProductoResponse(producto);

    }

    public void delete(long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("El producto con ese id no existe"));
        producto.updateStatus();
    }
}