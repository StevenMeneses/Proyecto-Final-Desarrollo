package com.Proyecto.Joyeria_Marly.domain.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Cart {
    private Integer userId;
    private List<CartItem> items;
    private BigDecimal total;
    private Integer totalItems;
    
    // Constructores
    public Cart() {
        this.items = new ArrayList<>();
        this.total = BigDecimal.ZERO;
        this.totalItems = 0;
    }
    
    public Cart(Integer userId) {
        this.userId = userId;
        this.items = new ArrayList<>();
        this.total = BigDecimal.ZERO;
        this.totalItems = 0;
    }
    
    // Getters y Setters
    public Integer getUserId() {
        return userId;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    
    public List<CartItem> getItems() {
        return items;
    }
    public void setItems(List<CartItem> items) {
        this.items = items;
        calculateTotals();
    }
    
    public BigDecimal getTotal() {
        return total;
    } 
    public void setTotal(BigDecimal total) {
        this.total = total;
    }
    
    public Integer getTotalItems() {
        return totalItems;
    }
    public void setTotalItems(Integer totalItems) {
        this.totalItems = totalItems;
    }
    
    // Métodos auxiliares
    public void addItem(CartItem item) {
        this.items.add(item);
        calculateTotals();
    }
    
    public void removeItem(Integer productId) {
        this.items.removeIf(item -> item.getProductId().equals(productId));
        calculateTotals();
    }
    
    public void updateItemQuantity(Integer productId, Integer quantity) {
        for (CartItem item : items) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(quantity);
                break;
            }
        }
        calculateTotals();
    }
    
    public void clear() {
        this.items.clear();
        this.total = BigDecimal.ZERO;
        this.totalItems = 0;
    }
    
    private void calculateTotals() {
        this.total = items.stream()
                .map(CartItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        this.totalItems = items.stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
    }
}
