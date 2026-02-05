package com.axisride.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // Auth Service
                .route("auth-service", r -> r
                        .path("/api/auth/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://auth-service"))
                
                // User Service
                .route("user-service", r -> r
                        .path("/api/users/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://user-service"))
                
                // Trip Service
                .route("trip-service", r -> r
                        .path("/api/trips/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://trip-service"))
                
                // Payment Service
                .route("payment-service", r -> r
                        .path("/api/payments/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://payment-service"))
                
                // Chat Service
                .route("chat-service", r -> r
                        .path("/api/chat/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://chat-service"))
                
                // Geolocation Service
                .route("geolocation-service", r -> r
                        .path("/api/geolocation/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://geolocation-service"))
                
                // Notification Service
                .route("notification-service", r -> r
                        .path("/api/notifications/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://notification-service"))
                
                // Loyalty Service
                .route("loyalty-service", r -> r
                        .path("/api/loyalty/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://loyalty-service"))
                
                // Analytics Service
                .route("analytics-service", r -> r
                        .path("/api/analytics/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://analytics-service"))
                
                // Content Service
                .route("content-service", r -> r
                        .path("/api/content/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://content-service"))
                
                .build();
    }
}
