package com.Proyecto.Joyeria_Marly.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Table(name = "detallepedido")
public class DetallePedidos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_pedido")
    private Integer idDetallePedido;
    
    @NotNull
    @Min(1)
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "precio_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;
    
    // Constructores
    public DetallePedidos() {
    }
    
    public DetallePedidos(Integer cantidad, BigDecimal precioUnitario, BigDecimal subtotal, Pedidos pedido, Productos producto) {
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.subtotal = subtotal;
        this.pedido = pedido;
        this.producto = producto;
    }
    
    // Getters y Setters
    public Integer getIdDetallePedido() {
        return idDetallePedido;
    }
    public void setIdDetallePedido(Integer idDetallePedido) {
        this.idDetallePedido = idDetallePedido;
    }
    
    public Integer getCantidad() {
        return cantidad;
    } 
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
    
    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }
    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }
    
    public BigDecimal getSubtotal() {
        return subtotal;
    }
    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }
    
    public Pedidos getPedido() {
        return pedido;
    }
    public void setPedido(Pedidos pedido) {
        this.pedido = pedido;
    }

    public Productos getProducto() {
        return producto;
    }
    public void setProducto(Productos producto) {
        this.producto = producto;
    }
    
    // Relaciones
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedidos pedido;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto", nullable = false)
    private Productos producto;
    
    // toString
    @Override
    public String toString() {
        return "DetallePedidos{" +
                "idDetallePedido=" + idDetallePedido +
                ", cantidad=" + cantidad +
                ", precioUnitario=" + precioUnitario +
                ", subtotal=" + subtotal +
                '}';
    }
}
