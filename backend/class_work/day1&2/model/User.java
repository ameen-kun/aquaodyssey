package com.project.aquaodyssey_backend.model;

import java.util.Collection;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "app_user")
public class User implements UserDetails{
    @Id
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String userType;
    private String password;
    @OneToMany
    List<Blog> likedBlogs;
}
