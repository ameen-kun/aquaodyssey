package com.project.aquaodyssey_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.aquaodyssey_backend.dao.BlogDAO;
import com.project.aquaodyssey_backend.dao.BookingDAO;
import com.project.aquaodyssey_backend.dao.TransactionDAO;
import com.project.aquaodyssey_backend.dao.UserDAO;
import com.project.aquaodyssey_backend.dto.BookingDTO;
import com.project.aquaodyssey_backend.dto.LikeDTO;
import com.project.aquaodyssey_backend.dto.UpdateUserDTO;
import com.project.aquaodyssey_backend.dto.UserBookingDTO;
import com.project.aquaodyssey_backend.model.Boat;
import com.project.aquaodyssey_backend.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasAuthority('USER')")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @GetMapping("/user")
    public UserDAO getUser(@RequestBody String token) {
        return userService.getUser(token);
    }
    
    @GetMapping("/blogs")
    public List<BlogDAO> getBlogs(String token) {
        return userService.getAllBlogs(token);
    }

    @GetMapping("/boats")
    public List<Boat> getAvailableBoats() {
        return userService.getAvailableBoats();
    }
    
    @GetMapping("/transactions")
    public List<TransactionDAO> getTransactions(String token) {
        return userService.getTransactions(token);
    }

    @GetMapping("/bookings")
    public List<BookingDAO> getBookings(String token) {
        return userService.getBookings(token);
    }
    
    @PostMapping("/booking")
    public ResponseEntity<String> createBooking(@RequestBody BookingDTO bookingDTO) {
        return userService.createBooking(bookingDTO);
    }
    
    @DeleteMapping("/booking")
    public ResponseEntity<String> removeBooking(@RequestBody UserBookingDTO userBookingDTO){
        return userService.deleteBooking(userBookingDTO);
    }

    @PutMapping("/booking")
    public ResponseEntity<String> confirmBooking(@RequestBody UserBookingDTO userBookingDTO) {
        return userService.confirmBooking(userBookingDTO);
    }
    
    @PutMapping("/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserDTO userUpdateDTO) {
        return userService.editUser(userUpdateDTO);
    }

    @PutMapping("/like")
    public ResponseEntity<String> likeBlog(@RequestBody LikeDTO likeDTO) {
        return userService.handleLike(likeDTO);
    }

    
    
}
