package com.Proyecto.Joyeria_Marly.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "categoriaproducto")
public class CategoriasProductos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Integer idCategoria;
    
    @NotNull
    @Size(max = 100)
    @Column(name = "nombre_categoria", nullable = false, length = 100)
    private String nombreCategoria;
    
    // Constructores
    public CategoriasProductos() {
    }
    
    public CategoriasProductos(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }
    
    // Getters y Setters
    public Integer getIdCategoria() {
        return idCategoria;
    }
    
    public void setIdCategoria(Integer idCategoria) {
        this.idCategoria = idCategoria;
    }
    
    public String getNombreCategoria() {
        return nombreCategoria;
    }
    
    public void setNombreCategoria(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }
    
    // toString
    @Override
    public String toString() {
        return "CategoriasProductos{" +
                "idCategoria=" + idCategoria +
                ", nombreCategoria='" + nombreCategoria + '\'' +
                '}';
    }
}
