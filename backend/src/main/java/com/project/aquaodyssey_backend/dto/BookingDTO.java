package com.project.aquaodyssey_backend.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class BookingDTO {
    private String token;
    private Date bookedOn;
    private Date startingDate;
    private Date endDate;
    private double price;
    private int boatId;
}
