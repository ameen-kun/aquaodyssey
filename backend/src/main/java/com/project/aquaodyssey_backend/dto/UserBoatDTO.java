package com.project.aquaodyssey_backend.dto;

import com.project.aquaodyssey_backend.model.Boat;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserBoatDTO {
    private Boat boat;
    private double bookingPrice;
}
