package com.example.EmplpoyeeManagementBackend.exception;

import org.springframework.security.core.AuthenticationException;

public class NewBadCredentialsException extends AuthenticationException {
    private String message;
    public NewBadCredentialsException(String message) {
        super(message);
    }
}
