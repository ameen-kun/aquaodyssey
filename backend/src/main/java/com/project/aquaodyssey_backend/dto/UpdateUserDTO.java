package com.project.aquaodyssey_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
public class UpdateUserDTO {
    private String token;
    private String firstName;
    private String lastName;
    private String email;
}
