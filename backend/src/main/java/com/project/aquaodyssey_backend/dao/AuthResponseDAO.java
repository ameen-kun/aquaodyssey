package com.project.aquaodyssey_backend.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class AuthResponseDAO {
    private String token;
    private String role;
}
