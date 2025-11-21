package com.marly.handmade.controller;

import com.marly.handmade.domain.producto.data.ProductoRequest;

import com.marly.handmade.domain.producto.data.ProductoResponse;

import com.marly.handmade.domain.producto.data.ProductoUpdate;

import com.marly.handmade.service.ProductoService;

import jakarta.validation.Valid;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "*")
@RestController

@RequestMapping("producto")

public class ProductoController {
    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {

        this.productoService = productoService;

    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductoResponse> crearProducto(
            @RequestBody @Valid ProductoRequest productoRequest,
            UriComponentsBuilder builder) {

        ProductoResponse productoResponse = productoService.crearProducto(productoRequest);

        URI uri = builder.path("/producto/{id}")
                .buildAndExpand(productoResponse.id())
                .toUri();


        return ResponseEntity.created(uri).body(productoResponse);
    }

    @GetMapping("all")

    public ResponseEntity<List<ProductoResponse>> listarProductos() {

        log.info("Listando productos...");

        return ResponseEntity.ok(productoService.listarProductos());

    }

    @GetMapping("search")

    public ResponseEntity<List<ProductoResponse>> buscarProductos(@RequestParam String q) {

        log.info("Buscando productos con término: {}", q);

        return ResponseEntity.ok(productoService.buscarPorTermino(q));

    }

    @GetMapping

    public ResponseEntity<ProductoResponse> buscar(@RequestParam(required = false) Long id,
            @RequestParam(required = false) String nombre) {

        return ResponseEntity.ok(productoService.buscar(nombre, id));

    }

    @PatchMapping("{id}")

    @PreAuthorize("hasRole('ADMIN')")

    @Transactional

    public ResponseEntity<ProductoResponse> update(@PathVariable long id, @RequestBody ProductoUpdate productoUpdate) {

        log.info("Actualizando producto: nameUpdate={}", productoUpdate.nombre());

        return ResponseEntity.ok(productoService.update(id, productoUpdate));

    }

    @DeleteMapping("{id}")
    @Transactional
    public ResponseEntity<Void> delete(@PathVariable long id) {
        productoService.delete(id);
        return ResponseEntity.ok().build();
    }

}