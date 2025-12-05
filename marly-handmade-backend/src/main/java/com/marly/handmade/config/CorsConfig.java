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
                            // ✅ NUEVO FRONTEND Vercel (URL EXACTA)
                            "https://marly-handmade-frontend-kqoy1x34o-stevens-projects-40c9f4b3.vercel.app",
                            
                            // ✅ BACKEND
                            "https://proyecto-final-desarrollo.onrender.com",
                            
                            // ✅ Desarrollo local
                            "http://localhost:5173",
                            "http://localhost:3000"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                        .allowedHeaders("*")
                        .exposedHeaders("Authorization", "Content-Type")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}