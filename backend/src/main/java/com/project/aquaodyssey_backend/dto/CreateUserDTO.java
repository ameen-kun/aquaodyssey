package com.project.aquaodyssey_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CreateUserDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String role;
}
