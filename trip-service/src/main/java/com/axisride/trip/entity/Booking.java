package com.axisride.trip.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings", indexes = {
    @Index(name = "idx_trip_id", columnList = "trip_id"),
    @Index(name = "idx_passenger_id", columnList = "passenger_id"),
    @Index(name = "idx_status", columnList = "status")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;
    
    @Column(name = "passenger_id", nullable = false)
    private String passengerId;
    
    @Column(name = "seats_booked", nullable = false)
    private Integer seatsBooked;
    
    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private BookingStatus status = BookingStatus.PENDING;
    
    @Column(name = "pickup_address", length = 500)
    private String pickupAddress;
    
    @Column(name = "dropoff_address", length = 500)
    private String dropoffAddress;
    
    @Column(name = "passenger_notes", length = 1000)
    private String passengerNotes;
    
    @Column(name = "payment_id")
    private String paymentId;
    
    @Column(name = "payment_status", length = 20)
    private String paymentStatus;
    
    @Column(name = "cancelled_by")
    private String cancelledBy;
    
    @Column(name = "cancellation_reason", length = 1000)
    private String cancellationReason;
    
    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;
    
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
    
    public enum BookingStatus {
        PENDING,
        CONFIRMED,
        IN_PROGRESS,
        COMPLETED,
        CANCELLED
    }
}
