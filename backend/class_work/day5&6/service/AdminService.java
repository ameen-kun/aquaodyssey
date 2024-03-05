package com.project.aquaodyssey_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.aquaodyssey_backend.dao.BlogDAO;
import com.project.aquaodyssey_backend.dao.BookingDAO;
import com.project.aquaodyssey_backend.dao.TransactionDAO;
import com.project.aquaodyssey_backend.dao.UserDAO;
import com.project.aquaodyssey_backend.dto.BlogDTO;
import com.project.aquaodyssey_backend.dto.BoatDTO;
import com.project.aquaodyssey_backend.dto.UpdateUserDTO;
import com.project.aquaodyssey_backend.exception.BlogNotFoundException;
import com.project.aquaodyssey_backend.exception.BoatNotFoundException;
import com.project.aquaodyssey_backend.model.Blog;
import com.project.aquaodyssey_backend.model.Boat;
import com.project.aquaodyssey_backend.model.Booking;
import com.project.aquaodyssey_backend.model.Transaction;
import com.project.aquaodyssey_backend.model.User;
import com.project.aquaodyssey_backend.repository.BlogRepository;
import com.project.aquaodyssey_backend.repository.BoatRepository;
import com.project.aquaodyssey_backend.repository.BookingRepository;
import com.project.aquaodyssey_backend.repository.TransactionRepository;
import com.project.aquaodyssey_backend.repository.UserRepository;
import com.project.aquaodyssey_backend.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final BlogRepository blogRepository;
    private final BoatRepository boatRepository;
    private final BookingRepository bookingRepository;
    private final TransactionRepository transactionRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public ResponseEntity<String> addBoat(BoatDTO boatDTO) {
        try{
            Boat boat=Boat.builder()
            .available(boatDTO.isAvailable())
            .capacity(boatDTO.getCapacity())
            .imageloc(boatDTO.getImageloc())
            .name(boatDTO.getName())
            .price(boatDTO.getPrice())
            .type(boatDTO.getType())
            .build();
            boatRepository.save(boat);
            return new ResponseEntity<>("Boat Added!",HttpStatus.ACCEPTED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.toString(),HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> editBoat(int id, BoatDTO boatDTO) {
        try{
            Boat boat=boatRepository.findById(id).orElseThrow(()-> new BoatNotFoundException("Boat Not Found!"));
            boat.setAvailable(boatDTO.isAvailable());
            boat.setCapacity(boatDTO.getCapacity());
            boat.setImageloc(boatDTO.getImageloc());
            boat.setName(boatDTO.getName());
            boat.setPrice(boatDTO.getPrice());
            boat.setType(boatDTO.getType());
            boatRepository.save(boat);
            return new ResponseEntity<>("Boat Updated!",HttpStatus.ACCEPTED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.toString(),HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> removeBoat(int id) {
        try{
            boatRepository.deleteById(id);
            return new ResponseEntity<>("Boat Deleted!",HttpStatus.ACCEPTED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.toString(),HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> addPost(BlogDTO blogDTO) {
        try{
            Blog blog=Blog.builder()
            .caption(blogDTO.getCaption())
            .src(blogDTO.getSrc())
            .type(blogDTO.getType())
            .postedBy(userRepository.findByUsername(jwtService.extractUsername(blogDTO.getToken())).orElseThrow(()->new UsernameNotFoundException("Invalid Username!")))
            .build();
            blogRepository.save(blog);
            return new ResponseEntity<>("Blog Added!",HttpStatus.ACCEPTED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.toString(),HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> editBlog(int id, BlogDTO blogDTO) {
        try{
            Blog blog=blogRepository.findById(id).orElseThrow(()->new BlogNotFoundException("Blog Not Found!"));
            blog.setCaption(blogDTO.getCaption());
            blog.setSrc(blogDTO.getSrc());
            blog.setType(blogDTO.getType());
            blog.setPostedBy(userRepository.findByUsername(jwtService.extractUsername(blogDTO.getToken())).orElseThrow(()->new UsernameNotFoundException("Invalid Username!")));
            blogRepository.save(blog);
            return new ResponseEntity<>("Blog Updated!",HttpStatus.ACCEPTED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.toString(),HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> removeBlog(int id) {
        try{
            blogRepository.deleteById(id);
            return new ResponseEntity<>("Blog Deleted!",HttpStatus.ACCEPTED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.toString(),HttpStatus.BAD_REQUEST);
        }
    }

    public List<BookingDAO> getAllBookings() {
        List<Booking> allBookings=bookingRepository.findAll();
        List<BookingDAO> bookingDAOs=new ArrayList<>();
        for(Booking i:allBookings){
            bookingDAOs.add(BookingDAO.builder()
            .bookedOn(i.getBookedOn())
            .bookedBy(i.getBookedBy().getUsername())
            .id(i.getId())
            .boatName(i.getBoat().getName())
            .startingDate(i.getStartingDate())
            .endDate(i.getEndDate())
            .price(i.getPrice())
            .status(i.getStatus())
            .build());
        }
        return bookingDAOs;
    }

    public List<TransactionDAO> getAllTransactions() {
        List<Transaction> allTransactions=transactionRepository.findAll();
        List<TransactionDAO> transactionDAOs=new ArrayList<>();
        for(Transaction i:allTransactions){
            transactionDAOs.add(TransactionDAO.builder()
            .bookingId(i.getBooking().getId())
            .id(i.getId())
            .message(i.getMessage())
            .paidBy(i.getPaidBy().getUsername())
            .status(i.isStatus())
            .transactionDate(i.getTransactionDate())
            .price(i.getPrice())
            .build());
        }
        return transactionDAOs;
    }

    public List<BlogDAO> getAllBlogs() {
        List<Blog> allBlogs=blogRepository.findAll();
        List<BlogDAO> blogDAOs=new ArrayList<>();
        for(Blog i:allBlogs){
            blogDAOs.add(BlogDAO.builder()
            .caption(i.getCaption())
            .createdBy(i.getPostedBy().getUsername())
            .src(i.getSrc())
            .type(i.getType())
            .id(i.getId())
            .build());
        }
        return blogDAOs;
    }

    public List<Boat> getAllBoats() {
        return boatRepository.findAll();
    }

    public UserDAO getUser(String token) {
        User user=userRepository.findByUsername(jwtService.extractUsername(token)).orElseThrow(()->new UsernameNotFoundException("Invalid User!"));
        return UserDAO.builder()
        .email(user.getEmail())
        .firstName(user.getFirstName())
        .lastName(user.getLastName())
        .build();
    }

    public ResponseEntity<String> editUser(UpdateUserDTO userUpdateDTO) {
        try{
            User user=userRepository.findByUsername(jwtService.extractUsername(userUpdateDTO.getToken())).orElseThrow(()->new UsernameNotFoundException("Invalid User"));
            user.setEmail(userUpdateDTO.getEmail());
            user.setFirstName(userUpdateDTO.getFirstName());
            user.setLastName(userUpdateDTO.getLastName());
            userRepository.save(user);
            return new ResponseEntity<>("User Updated!",HttpStatus.ACCEPTED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.toString(),HttpStatus.BAD_REQUEST);
        }
    }


    
}
