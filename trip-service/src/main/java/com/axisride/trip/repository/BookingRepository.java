package com.axisride.trip.repository;

import com.axisride.trip.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    
    List<Booking> findByPassengerId(String passengerId);
    
    Page<Booking> findByPassengerId(String passengerId, Pageable pageable);
    
    List<Booking> findByTripId(String tripId);
    
    Optional<Booking> findByIdAndPassengerId(String id, String passengerId);
    
    @Query("SELECT b FROM Booking b WHERE b.trip.id = :tripId AND b.status IN ('PENDING', 'CONFIRMED')")
    List<Booking> findActivebookingsByTrip(@Param("tripId") String tripId);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.trip.id = :tripId AND b.status IN ('CONFIRMED', 'IN_PROGRESS')")
    Long countConfirmedBookingsByTrip(@Param("tripId") String tripId);
    
    @Query("SELECT SUM(b.seatsBooked) FROM Booking b WHERE b.trip.id = :tripId AND b.status IN ('CONFIRMED', 'IN_PROGRESS')")
    Integer sumBookedSeatsByTrip(@Param("tripId") String tripId);
}
