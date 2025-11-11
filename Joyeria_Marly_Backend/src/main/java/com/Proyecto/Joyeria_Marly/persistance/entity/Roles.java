package com.Proyecto.Joyeria_Marly.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "rol")
public class Roles {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Integer idRol;
    
    @NotNull
    @Size(max = 20)
    @Column(name = "nombre_rol", nullable = false, length = 20)
    private String nombreRol;
    
    // Constructores
    public Roles() {
    }
    public Roles(String nombreRol) {
        this.nombreRol = nombreRol;
    }
    
    // Getters y Setters
    public Integer getIdRol() {
        return idRol;
    }
    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
    }
    
    public String getNombreRol() {
        return nombreRol;
    }
    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }
    
    // toString
    @Override
    public String toString() {
        return "Roles{" +
                "idRol=" + idRol +
                ", nombreRol='" + nombreRol + '\'' +
                '}';
    }
    
    // equals y hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Roles roles = (Roles) o;
        return idRol != null && idRol.equals(roles.idRol);
    }
    
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
