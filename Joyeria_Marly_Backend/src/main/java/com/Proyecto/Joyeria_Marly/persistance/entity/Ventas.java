package com.Proyecto.Joyeria_Marly.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "venta")
public class Ventas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_venta")
    private Integer idVenta;
    
    @Column(name = "fecha_venta")
    private LocalDateTime fechaVenta = LocalDateTime.now();
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "monto_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal montoTotal;
    
    @NotNull
    @Size(max = 50)
    @Column(name = "metodo_pago", nullable = false, length = 50)
    private String metodoPago;
    
    @NotNull
    @Size(max = 10)
    @Column(name = "tipo_venta", nullable = false, length = 10)
    private String tipoVenta;
    
    // Constructores
    public Ventas() {
    }
    
    public Ventas(BigDecimal montoTotal, String metodoPago, String tipoVenta, Pedidos pedido, Usuarios vendedor) {
        this.montoTotal = montoTotal;
        this.metodoPago = metodoPago;
        this.tipoVenta = tipoVenta;
        this.pedido = pedido;
        this.vendedor = vendedor;
    }
    
    // Getters y Setters
    public Integer getIdVenta() {
        return idVenta;
    }
    public void setIdVenta(Integer idVenta) {
        this.idVenta = idVenta;
    }
    
    public LocalDateTime getFechaVenta() {
        return fechaVenta;
    } 
    public void setFechaVenta(LocalDateTime fechaVenta) {
        this.fechaVenta = fechaVenta;
    }
    
    public BigDecimal getMontoTotal() {
        return montoTotal;
    } 
    public void setMontoTotal(BigDecimal montoTotal) {
        this.montoTotal = montoTotal;
    }
    
    public String getMetodoPago() {
        return metodoPago;
    }
    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }
    
    public String getTipoVenta() {
        return tipoVenta;
    }
    public void setTipoVenta(String tipoVenta) {
        this.tipoVenta = tipoVenta;
    }
    
    public Pedidos getPedido() {
        return pedido;
    }
    public void setPedido(Pedidos pedido) {
        this.pedido = pedido;
    }
    
    public Usuarios getVendedor() {
        return vendedor;
    }
    public void setVendedor(Usuarios vendedor) {
        this.vendedor = vendedor;
    }
    
    // Relaciones
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido", nullable = false, unique = true)
    private Pedidos pedido;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_vendedor")
    private Usuarios vendedor;
    
    // toString
    @Override
    public String toString() {
        return "Venta{" +
                "idVenta=" + idVenta +
                ", fechaVenta=" + fechaVenta +
                ", montoTotal=" + montoTotal +
                ", metodoPago='" + metodoPago + '\'' +
                ", tipoVenta='" + tipoVenta + '\'' +
                '}';
    }
}
