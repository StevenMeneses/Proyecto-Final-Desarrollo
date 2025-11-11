package com.Proyecto.Joyeria_Marly.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "factura")
public class Facturas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_factura")
    private Integer idFactura;
    
    @NotNull
    @Size(max = 11)
    @Column(name = "ruc", nullable = false, length = 11)
    private String ruc;
    
    @NotNull
    @Size(max = 150)
    @Column(name = "razon_social", nullable = false, length = 150)
    private String razonSocial;
    
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
    public Facturas() {
    }
    
    public Facturas(String ruc, String razonSocial, String serie, Integer correlativo, Ventas venta) {
        this.ruc = ruc;
        this.razonSocial = razonSocial;
        this.serie = serie;
        this.correlativo = correlativo;
        this.venta = venta;
    }
    
    // Getters y Setters
    public Integer getIdFactura() {
        return idFactura;
    }
    
    public void setIdFactura(Integer idFactura) {
        this.idFactura = idFactura;
    }
    
    public String getRuc() {
        return ruc;
    }
    
    public void setRuc(String ruc) {
        this.ruc = ruc;
    }
    
    public String getRazonSocial() {
        return razonSocial;
    }
    
    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
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
        return "Factura{" +
                "idFactura=" + idFactura +
                ", ruc='" + ruc + '\'' +
                ", razonSocial='" + razonSocial + '\'' +
                ", serie='" + serie + '\'' +
                ", correlativo=" + correlativo +
                ", fechaEmision=" + fechaEmision +
                '}';
    }
}
