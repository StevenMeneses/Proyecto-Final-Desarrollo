package com.marly.handmade.infrastructure.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfigurations {
    private final SecurityFilter securityFilter;

    // ✅ Constructor simplificado - sin CorsConfigurationSource
    public SecurityConfigurations(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())  // ✅ USA la configuración por defecto (CorsConfig.java)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(req -> req
                        .requestMatchers(HttpMethod.POST, 
                                "/auth/login", 
                                "/auth/register", 
                                "/auth/forgot-password")
                        .permitAll()
                        
                        .requestMatchers(HttpMethod.GET, 
                                "/producto/all", 
                                "/producto/search", 
                                "/producto/{id}",  // ✅ AGREGADO para detalles de producto
                                "/promociones/{nombre}",
                                "/promociones/mostrar/{id}", 
                                "/promociones", 
                                "/usuario/all", 
                                "/clientes/all",
                                "/clientes/{id}",  // ✅ AGREGADO para detalles de cliente
                                "/pedido/all",     // ✅ AGREGADO para pedidos
                                "/reclamaciones",  // ✅ AGREGADO para reclamaciones
                                "/dashboard/**")   // ✅ AGREGADO para dashboard
                        .permitAll()
                        
                        .requestMatchers(HttpMethod.PATCH, "/auth/update-password")
                        .permitAll()
                        
                        // ✅ PERMITE TODOS los métodos para endpoints críticos (temporalmente)
                        .requestMatchers("/clientes/**", "/producto/**", "/pedido/**", "/reclamaciones/**")
                        .permitAll()
                        
                        .anyRequest()
                        .authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}