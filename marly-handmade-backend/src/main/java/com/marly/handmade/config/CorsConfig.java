package com.marly.handmade.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                            // FRONTEND - Tu nueva URL (tiene -1)
                            "https://proyecto-final-desarrollo-1.onrender.com",
                            
                            // BACKEND
                            "https://proyecto-final-desarrollo.onrender.com",
                            
                            // Desarrollo local
                            "http://localhost:3000",
                            "http://localhost:5173",  // Vite
                            "http://127.0.0.1:3000",
                            "http://127.0.0.1:5173"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                        .allowedHeaders("*")
                        .exposedHeaders("Authorization", "Content-Type")
                        .allowCredentials(true)  // Cambiado a TRUE para autenticación
                        .maxAge(3600);  // Cache por 1 hora
            }
        };
    }
}
