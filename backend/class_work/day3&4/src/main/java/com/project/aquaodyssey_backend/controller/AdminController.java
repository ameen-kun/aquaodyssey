package com.project.aquaodyssey_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.aquaodyssey_backend.dto.BlogDTO;
import com.project.aquaodyssey_backend.dto.BoatDTO;
import com.project.aquaodyssey_backend.model.Blog;
import com.project.aquaodyssey_backend.model.Booking;
import com.project.aquaodyssey_backend.model.Transaction;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @PostMapping("/boat")
    public ResponseEntity<HttpStatus> createBoat(@RequestBody BoatDTO boatDTO) {
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PutMapping("/boat/{id}")
    public ResponseEntity<HttpStatus> updateBoat(@PathVariable int id, @RequestBody BoatDTO boatDTO) {
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    
    @DeleteMapping("/boat/{id}")
    public ResponseEntity<HttpStatus> deleteBoat (@PathVariable int id){
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/blog")
    public ResponseEntity<HttpStatus> createBlog(@RequestBody BlogDTO blogDTO) {
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PutMapping("/blog/{id}")
    public ResponseEntity<HttpStatus> updateBlog(@PathVariable int id, @RequestBody BoatDTO boatDTO) {
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/blog{id}")
    public ResponseEntity<HttpStatus> deleteBlog (@PathVariable int id){
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return new ArrayList<Booking>();
    }

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return new ArrayList<>();
    }
    
    @GetMapping("/blogs")
    public List<Blog> getBlogs() {
        return new ArrayList<>();
    }
    
}
