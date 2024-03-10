package com.project.aquaodyssey_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionUpdateDTO {
    private String token;
    private int tid;
    private String referenceId;
}
