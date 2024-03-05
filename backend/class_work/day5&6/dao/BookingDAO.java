package com.project.aquaodyssey_backend.dao;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDAO {
    private int id;
    private Date bookedOn;
    private Date startingDate;
    private Date endDate;
    private double price;
    private int status;
    private String bookedBy;
    private String boatName;
}
