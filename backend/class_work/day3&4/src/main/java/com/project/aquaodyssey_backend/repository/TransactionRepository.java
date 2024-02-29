package com.project.aquaodyssey_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.aquaodyssey_backend.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer>{
    
}
