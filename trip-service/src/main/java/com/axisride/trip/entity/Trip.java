package com.axisride.trip.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trips", indexes = {
    @Index(name = "idx_driver_id", columnList = "driver_id"),
    @Index(name = "idx_status", columnList = "status"),
    @Index(name = "idx_departure_time", columnList = "departure_time")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trip {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(name = "driver_id", nullable = false)
    private String driverId;
    
    @Column(name = "departure_address", nullable = false, length = 500)
    private String departureAddress;
    
    @Column(name = "departure_city", nullable = false, length = 100)
    private String departureCity;
    
    @Column(name = "departure_location", columnDefinition = "geography(Point,4326)")
    private Point departureLocation;
    
    @Column(name = "arrival_address", nullable = false, length = 500)
    private String arrivalAddress;
    
    @Column(name = "arrival_city", nullable = false, length = 100)
    private String arrivalCity;
    
    @Column(name = "arrival_location", columnDefinition = "geography(Point,4326)")
    private Point arrivalLocation;
    
    @Column(name = "departure_time", nullable = false)
    private LocalDateTime departureTime;
    
    @Column(name = "arrival_time")
    private LocalDateTime arrivalTime;
    
    @Column(name = "available_seats", nullable = false)
    private Integer availableSeats;
    
    @Column(name = "total_seats", nullable = false)
    private Integer totalSeats;
    
    @Column(name = "price_per_seat", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerSeat;
    
    @Column(name = "currency", nullable = false, length = 3)
    private String currency = "XOF";
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private TripStatus status = TripStatus.PLANNED;
    
    @Column(length = 1000)
    private String description;
    
    @Column(name = "luggage_allowed")
    @Builder.Default
    private Boolean luggageAllowed = true;
    
    @Column(name = "pets_allowed")
    @Builder.Default
    private Boolean petsAllowed = false;
    
    @Column(name = "smoking_allowed")
    @Builder.Default
    private Boolean smokingAllowed = false;
    
    @Column(name = "music_allowed")
    @Builder.Default
    private Boolean musicAllowed = true;
    
    @Column(name = "instant_booking")
    @Builder.Default
    private Boolean instantBooking = false;
    
    @Column(name = "vehicle_type", length = 50)
    private String vehicleType;
    
    @Column(name = "vehicle_model", length = 100)
    private String vehicleModel;
    
    @Column(name = "vehicle_color", length = 50)
    private String vehicleColor;
    
    @Column(name = "license_plate", length = 20)
    private String licensePlate;
    
    @Column(name = "distance_km", precision = 10, scale = 2)
    private BigDecimal distanceKm;
    
    @Column(name = "duration_minutes")
    private Integer durationMinutes;
    
    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Booking> bookings = new ArrayList<>();
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum TripStatus {
        PLANNED,
        ACTIVE,
        COMPLETED,
        CANCELLED
    }
}
