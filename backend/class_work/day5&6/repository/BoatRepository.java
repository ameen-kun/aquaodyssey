package com.project.aquaodyssey_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.aquaodyssey_backend.model.Boat;
import java.util.List;


@Repository
public interface BoatRepository extends JpaRepository<Boat,Integer>{
    List<Boat> findByAvailable(boolean available);
}
