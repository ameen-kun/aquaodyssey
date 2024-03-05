package com.project.aquaodyssey_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.aquaodyssey_backend.model.Transaction;
import com.project.aquaodyssey_backend.model.User;

import java.util.List;


@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer>{
    List<Transaction> findByPaidBy(User paidBy);
}
