package com.Proyecto.Joyeria_Marly.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

@Entity
@Table(name = "producto")
public class Productos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Integer idProducto;
    
    @NotNull
    @Size(max = 150)
    @Column(name = "nombre_producto", nullable = false, length = 150)
    private String nombreProducto;
    
    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "precio", nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;
    
    @Min(0)
    @Column(name = "stock", nullable = false)
    private Integer stock = 0;
    
    @Size(max = 255)
    @Column(name = "imagen_url", length = 255)
    private String imagenUrl;
    
    // Constructores
    public Productos() {
    }
    
    public Productos(String nombreProducto, BigDecimal precio, CategoriasProductos categoria) {
        this.nombreProducto = nombreProducto;
        this.precio = precio;
        this.categoria = categoria;
    }
    
    // Getters y Setters
    public Integer getIdProducto() {
        return idProducto;
    }
    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }
    
    public String getNombreProducto() {
        return nombreProducto;
    }
    
    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public BigDecimal getPrecio() {
        return precio;
    }
    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }
    
    public Integer getStock() {
        return stock;
    }
    public void setStock(Integer stock) {
        this.stock = stock;
    }
    
    public String getImagenUrl() {
        return imagenUrl;
    }
    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }
    
    public CategoriasProductos getCategoria() {
        return categoria;
    }
    public void setCategoria(CategoriasProductos categoria) {
        this.categoria = categoria;
    }
    
    // Relaciones
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria", nullable = false)
    private CategoriasProductos categoria;
    
    // toString
    @Override
    public String toString() {
        return "Productos{" +
                "idProducto=" + idProducto +
                ", nombreProducto='" + nombreProducto + '\'' +
                ", precio=" + precio +
                ", stock=" + stock +
                '}';
    }
}
