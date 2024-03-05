package com.project.aquaodyssey_backend.dao;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDAO {
    private int id;
    private double price;
    private boolean status;
    private Date transactionDate;
    private String message;
    private int bookingId;
    private String paidBy;
}
