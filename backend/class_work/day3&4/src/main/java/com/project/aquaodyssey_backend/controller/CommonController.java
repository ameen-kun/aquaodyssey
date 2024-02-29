package com.project.aquaodyssey_backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.project.aquaodyssey_backend.model.Boat;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api")
public class CommonController {

    @GetMapping("/boats")
    public List<Boat> getBoats() {
        return new ArrayList<Boat>();
    }
    
    
}
