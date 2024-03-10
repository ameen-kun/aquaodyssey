package com.project.aquaodyssey_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.aquaodyssey_backend.model.Booking;
import com.project.aquaodyssey_backend.model.User;

import java.util.List;


@Repository
public interface BookingRepository extends JpaRepository<Booking,Integer>{
    List<Booking> findByBookedBy(User bookedBy);
}
