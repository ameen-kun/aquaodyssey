package com.project.aquaodyssey_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.aquaodyssey_backend.dao.BlogDAO;
import com.project.aquaodyssey_backend.dao.BookingDAO;
import com.project.aquaodyssey_backend.dao.TransactionDAO;
import com.project.aquaodyssey_backend.dao.UserDAO;
import com.project.aquaodyssey_backend.dto.BlogDTO;
import com.project.aquaodyssey_backend.dto.BoatDTO;
import com.project.aquaodyssey_backend.dto.UpdateUserDTO;
import com.project.aquaodyssey_backend.model.Boat;
import com.project.aquaodyssey_backend.service.AdminService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ADMIN')")
@RequiredArgsConstructor
public class AdminController {
    
    private final AdminService adminService;

    @PostMapping("/boat")
    public ResponseEntity<String> createBoat(@RequestBody BoatDTO boatDTO) {
        return adminService.addBoat(boatDTO);
    }

    @PutMapping("/boat/{id}")
    public ResponseEntity<String> updateBoat(@PathVariable int id, @RequestBody BoatDTO boatDTO) {
        return adminService.editBoat(id,boatDTO);
    }
    
    @DeleteMapping("/boat/{id}")
    public ResponseEntity<String> deleteBoat (@PathVariable int id){
        return adminService.removeBoat(id);
    }
    
    @PostMapping("/blog")
    public ResponseEntity<String> createBlog(@RequestBody BlogDTO blogDTO) {
        return adminService.addPost(blogDTO);
    }

    @PutMapping("/blog/{id}")
    public ResponseEntity<String> updateBlog(@PathVariable int id, @RequestBody BlogDTO blogDTO) {
        return adminService.editBlog(id,blogDTO);
    }

    @DeleteMapping("/blog{id}")
    public ResponseEntity<String> deleteBlog (@PathVariable int id){
        return adminService.removeBlog(id);
    }
    
    @GetMapping("/bookings")
    public List<BookingDAO> getAllBookings() {
        return adminService.getAllBookings();
    }

    @GetMapping("/transactions")
    public List<TransactionDAO> getAllTransactions() {
        return adminService.getAllTransactions();
    }
    
    @GetMapping("/blogs")
    public List<BlogDAO> getBlogs() {
        return adminService.getAllBlogs();
    }
    
    @GetMapping("/boats")
    public List<Boat> getBoats() {
        return adminService.getAllBoats();
    }

    @PutMapping("/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserDTO userUpdateDTO) {
        return adminService.editUser(userUpdateDTO);
    }

    @GetMapping("/user")
    public UserDAO getUser(@RequestBody String token) {
        return adminService.getUser(token);
    }

}
