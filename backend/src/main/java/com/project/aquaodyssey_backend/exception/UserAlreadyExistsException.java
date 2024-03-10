package com.project.aquaodyssey_backend.exception;

public class UserAlreadyExistsException extends Exception{
    public UserAlreadyExistsException(String i){
        super(i);
    }
}
