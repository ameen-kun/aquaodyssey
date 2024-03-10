package com.project.aquaodyssey_backend.service;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.aquaodyssey_backend.dao.AuthResponseDAO;
import com.project.aquaodyssey_backend.dto.AuthRequestDTO;
import com.project.aquaodyssey_backend.dto.CreateUserDTO;
import com.project.aquaodyssey_backend.exception.UserAlreadyExistsException;
import com.project.aquaodyssey_backend.model.User;
import com.project.aquaodyssey_backend.repository.UserRepository;
import com.project.aquaodyssey_backend.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public ResponseEntity<String> addUser(CreateUserDTO userDTO) {
        try{
            if(userRepository.existsById(userDTO.getUsername())){
                throw new UserAlreadyExistsException("User Already Exists!");
            }
            User user=User.builder()
            .firstName(userDTO.getFirstName())
            .lastName(userDTO.getLastName())
            .email(userDTO.getEmail())
            .role(userDTO.getRole())
            .username(userDTO.getUsername())
            .password(passwordEncoder.encode(userDTO.getPassword()))
            .likedBlogs(new ArrayList<>())
            .build();
            userRepository.save(user);
            return new ResponseEntity<>("User Created!",HttpStatus.ACCEPTED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.toString(),HttpStatus.NOT_ACCEPTABLE);
        }
    }
    public AuthResponseDAO authenticateUser(AuthRequestDTO authRequestDTO) {
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));
        if(authentication.isAuthenticated()){
            return AuthResponseDAO.builder()
            .token(jwtService.generateToken(authRequestDTO.getUsername()))
            .role(userRepository.findByUsername(authRequestDTO.getUsername()).get().getRole())
            .build();
        }
        else{
             throw new UsernameNotFoundException("Invalid User Request!"); 
        }


    }

    
}
