package com.project.aquaodyssey_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AuthRequestDTO {
    private String username;
    private String password;
}
