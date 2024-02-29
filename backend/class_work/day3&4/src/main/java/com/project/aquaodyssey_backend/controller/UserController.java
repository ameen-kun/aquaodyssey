package com.project.aquaodyssey_backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.aquaodyssey_backend.dto.UserBlogDTO;
import com.project.aquaodyssey_backend.model.Boat;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/user")
public class UserController {
    
    @GetMapping("/blogs")
    public List<UserBlogDTO> getBlogs() {
        return new ArrayList<>();
    }

    @GetMapping("/boats")
    public List<Boat> getAvailableBoats() {
        return new ArrayList<>();
    }
    
    @GetMapping("path")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    

    
}
