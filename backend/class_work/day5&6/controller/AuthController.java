package com.project.aquaodyssey_backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.project.aquaodyssey_backend.dao.AuthResponseDAO;
import com.project.aquaodyssey_backend.dto.AuthRequestDTO;
import com.project.aquaodyssey_backend.dto.CreateUserDTO;
import com.project.aquaodyssey_backend.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody CreateUserDTO createUserDTO) {
        return authService.addUser(createUserDTO);
    }
    
    @PostMapping("/signin")
    public AuthResponseDAO signIn(@RequestBody AuthRequestDTO authRequestDTO) {
        return authService.authenticateUser(authRequestDTO);
    }
    
}
