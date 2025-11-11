package com.Proyecto.Joyeria_Marly.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "boleta")
public class Boletas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_boleta")
    private Integer idBoleta;
    
    @NotNull
    @Size(max = 4)
    @Column(name = "serie", nullable = false, length = 4)
    private String serie;
    
    @NotNull
    @Column(name = "correlativo", nullable = false)
    private Integer correlativo;
    
    @Column(name = "fecha_emision")
    private LocalDateTime fechaEmision = LocalDateTime.now();
    
    // Constructores
    public Boletas() {
    }
    
    public Boletas(String serie, Integer correlativo, Ventas venta) {
        this.serie = serie;
        this.correlativo = correlativo;
        this.venta = venta;
    }
    
    // Getters y Setters
    public Integer getIdBoleta() {
        return idBoleta;
    }
    
    public void setIdBoleta(Integer idBoleta) {
        this.idBoleta = idBoleta;
    }
    
    public String getSerie() {
        return serie;
    }
    
    public void setSerie(String serie) {
        this.serie = serie;
    }
    
    public Integer getCorrelativo() {
        return correlativo;
    }
    
    public void setCorrelativo(Integer correlativo) {
        this.correlativo = correlativo;
    }
    
    public LocalDateTime getFechaEmision() {
        return fechaEmision;
    }
    
    public void setFechaEmision(LocalDateTime fechaEmision) {
        this.fechaEmision = fechaEmision;
    }
    
    public Ventas getVenta() {
        return venta;
    }
    
    public void setVenta(Ventas venta) {
        this.venta = venta;
    }
    
    // Relaciones
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_venta", nullable = false, unique = true)
    private Ventas venta;
    
    // toString
    @Override
    public String toString() {
        return "Boleta{" +
                "idBoleta=" + idBoleta +
                ", serie='" + serie + '\'' +
                ", correlativo=" + correlativo +
                ", fechaEmision=" + fechaEmision +
                '}';
    }
}
