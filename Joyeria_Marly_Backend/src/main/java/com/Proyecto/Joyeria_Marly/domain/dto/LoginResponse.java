package com.Proyecto.Joyeria_Marly.domain.dto;

public class LoginResponse {
    private boolean success;
    private String message;
    private User user;
    private String token; // Para futura implementación de JWT
    
    // Constructores
    public LoginResponse() {
    }
    
    public LoginResponse(boolean success, String message, User user) {
        this.success = success;
        this.message = message;
        this.user = user;
    }
    
    // Getters y Setters
    public boolean isSuccess() {
        return success;
    }
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
}
