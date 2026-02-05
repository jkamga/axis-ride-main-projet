package com.axisride.trip.repository;

import com.axisride.trip.entity.Trip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, String> {
    
    List<Trip> findByDriverId(String driverId);
    
    Page<Trip> findByDriverId(String driverId, Pageable pageable);
    
    List<Trip> findByStatus(Trip.TripStatus status);
    
    Page<Trip> findByStatus(Trip.TripStatus status, Pageable pageable);
    
    @Query("SELECT t FROM Trip t WHERE t.departureCity = :departureCity " +
           "AND t.arrivalCity = :arrivalCity " +
           "AND t.departureTime >= :fromDate " +
           "AND t.status = 'PLANNED' " +
           "AND t.availableSeats >= :minSeats " +
           "ORDER BY t.departureTime ASC")
    Page<Trip> searchTrips(
        @Param("departureCity") String departureCity,
        @Param("arrivalCity") String arrivalCity,
        @Param("fromDate") LocalDateTime fromDate,
        @Param("minSeats") Integer minSeats,
        Pageable pageable
    );
    
    @Query("SELECT t FROM Trip t WHERE t.driverId = :driverId " +
           "AND t.status IN ('PLANNED', 'ACTIVE') " +
           "ORDER BY t.departureTime ASC")
    List<Trip> findUpcomingTripsByDriver(@Param("driverId") String driverId);
}
