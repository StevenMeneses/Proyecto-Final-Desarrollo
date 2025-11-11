package com.Proyecto.Joyeria_Marly.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "estadopedido")
public class EstadoPedidos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estado")
    private Integer idEstado;
    
    @NotNull
    @Size(max = 20)
    @Column(name = "nombre_estado", nullable = false, length = 20)
    private String nombreEstado;
    
    // Constructores
    public EstadoPedidos() {
    }
    
    public EstadoPedidos(String nombreEstado) {
        this.nombreEstado = nombreEstado;
    }
    
    // Getters y Setters
    public Integer getIdEstado() {
        return idEstado;
    }
    public void setIdEstado(Integer idEstado) {
        this.idEstado = idEstado;
    }
    
    public String getNombreEstado() {
        return nombreEstado;
    }
    public void setNombreEstado(String nombreEstado) {
        this.nombreEstado = nombreEstado;
    }
    
    // toString
    @Override
    public String toString() {
        return "EstadoPedido{" +
                "idEstado=" + idEstado +
                ", nombreEstado='" + nombreEstado + '\'' +
                '}';
    }
}
