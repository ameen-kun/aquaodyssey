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
import com.project.aquaodyssey_backend.dto.BookingDTO;
import com.project.aquaodyssey_backend.dto.LikeDTO;
import com.project.aquaodyssey_backend.dto.UpdateUserDTO;
import com.project.aquaodyssey_backend.dto.UserBookingDTO;
import com.project.aquaodyssey_backend.exception.BlogNotFoundException;
import com.project.aquaodyssey_backend.exception.BoatNotFoundException;
import com.project.aquaodyssey_backend.exception.BookingNotFOundException;
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
public class UserService {
    
    private final BlogRepository blogRepository;
    private final BoatRepository boatRepository;
    private final BookingRepository bookingRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserDAO getUser(String token) {
        User user=userRepository.findByUsername(jwtService.extractUsername(token)).orElseThrow(()->new UsernameNotFoundException("Invalid User!"));
        return UserDAO.builder()
        .email(user.getEmail())
        .firstName(user.getFirstName())
        .lastName(user.getLastName())
        .build();
    }

    public List<BlogDAO> getAllBlogs(String token) {
        User user=userRepository.findByUsername(jwtService.extractUsername(token)).orElseThrow(()->new UsernameNotFoundException("Invalid User!"));
        List<Blog> likedBlogs=user.getLikedBlogs();
        List<Blog> allBlogs=blogRepository.findAll();
        List<BlogDAO> blogDAOs=new ArrayList<>();
        for(Blog i:allBlogs){
            blogDAOs.add(BlogDAO.builder()
            .caption(i.getCaption())
            .createdBy(i.getPostedBy().getUsername())
            .src(i.getSrc())
            .type(i.getType())
            .id(i.getId())
            .liked(likedBlogs.contains(i))
            .build());
        }
        return blogDAOs;
    }

    public List<Boat> getAvailableBoats() {
        return boatRepository.findByAvailable(true);
    }

    public List<TransactionDAO> getTransactions(String token) {
        User user=userRepository.findByUsername(jwtService.extractUsername(token)).orElseThrow(()->new UsernameNotFoundException("Invalid User!"));
        List<Transaction> transactionsByUser=transactionRepository.findByPaidBy(user);
        List<TransactionDAO> transactionDAOs=new ArrayList<>();
        for(Transaction i:transactionsByUser){
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

    public List<BookingDAO> getBookings(String token) {
        User user=userRepository.findByUsername(jwtService.extractUsername(token)).orElseThrow(()->new UsernameNotFoundException("Invalid User!"));
        List<Booking> bookingsByUser=bookingRepository.findByBookedBy(user);
        List<BookingDAO> bookingDAOs=new ArrayList<>();
        for(Booking i:bookingsByUser){
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

    public ResponseEntity<String> createBooking(BookingDTO bookingDTO) {
        try{
            Boat boat=boatRepository.findById(bookingDTO.getBoatId()).orElseThrow(()-> new BoatNotFoundException("Boat Not Found!"));
            User user=userRepository.findByUsername(jwtService.extractUsername(bookingDTO.getToken())).orElseThrow(()->new UsernameNotFoundException("Invalid User!"));
            Booking booking=Booking.builder()
            .boat(boat)
            .bookedBy(user)
            .bookedOn(bookingDTO.getBookedOn())
            .startingDate(bookingDTO.getStartingDate())
            .endDate(bookingDTO.getEndDate())
            .price(bookingDTO.getPrice())
            .status(0)
            .build();
            bookingRepository.save(booking);
            return new ResponseEntity<>("Booking Created!",HttpStatus.ACCEPTED);
        }
        catch(Exception e){
            return new ResponseEntity<>("Booking Failed!",HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> confirmBooking(UserBookingDTO userBookingDTO) {
        try{
            Booking booking=bookingRepository.findById(userBookingDTO.getBookingId()).orElseThrow(()-> new BookingNotFOundException("Invalid Booking!"));
            User user=userRepository.findByUsername(jwtService.extractUsername(userBookingDTO.getToken())).orElseThrow(()->new UsernameNotFoundException("Invalid User!"));
            if(booking.getBookedBy().equals(user)){
                booking.setStatus(1);
                bookingRepository.save(booking);
                return new ResponseEntity<>("Booking Confirmed!",HttpStatus.ACCEPTED);
            }
            else{
                return new ResponseEntity<>("Booking Does Not Belong to You!",HttpStatus.BAD_REQUEST);
            }
        }
        catch(Exception e){
            return new ResponseEntity<>("Booking Confirmation Failed!",HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> deleteBooking(UserBookingDTO userBookingDTO) {
        try{
            Booking booking=bookingRepository.findById(userBookingDTO.getBookingId()).orElseThrow(()-> new BookingNotFOundException("Invalid Booking!"));
            User user=userRepository.findByUsername(jwtService.extractUsername(userBookingDTO.getToken())).orElseThrow(()->new UsernameNotFoundException("Invalid User!"));
            if(booking.getBookedBy().equals(user)){
                bookingRepository.deleteById(booking.getId());
                return new ResponseEntity<>("Booking Deleted!",HttpStatus.ACCEPTED);
            }
            else{
                return new ResponseEntity<>("Booking Does Not Belong to You!",HttpStatus.BAD_REQUEST);
            }
        }
        catch(Exception e){
            return new ResponseEntity<>("Booking Deletion Failed!",HttpStatus.BAD_REQUEST);
        }
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
            return new ResponseEntity<>("User Updation Failed!",HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> handleLike(LikeDTO likeDTO) {
        try{
            User user=userRepository.findByUsername(jwtService.extractUsername(likeDTO.getToken())).orElseThrow(()->new UsernameNotFoundException("Invalid User"));
            Blog blog=blogRepository.findById(likeDTO.getBlogId()).orElseThrow(()-> new BlogNotFoundException("Blog Not Found!"));
            List<Blog> likedByUser=user.getLikedBlogs();
            if(likedByUser.contains(blog)){
                likedByUser.remove(blog);
                user.setLikedBlogs(likedByUser);
                userRepository.save(user);
                return new ResponseEntity<>("Blog Disliked!",HttpStatus.ACCEPTED);
            }
            else{
                likedByUser.add(blog);
                user.setLikedBlogs(likedByUser);
                userRepository.save(user);
                return new ResponseEntity<>("Blog Liked!",HttpStatus.ACCEPTED);
            }
        }
        catch(Exception e){
            return new ResponseEntity<>("Blog Like Failed!",HttpStatus.BAD_REQUEST);
        }
    }



    
}
