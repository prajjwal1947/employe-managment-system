package com.example.EmplpoyeeManagementBackend.security;

import com.example.EmplpoyeeManagementBackend.entity.User;
import com.example.EmplpoyeeManagementBackend.exception.NewBadCredentialsException;
import com.example.EmplpoyeeManagementBackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CustomAuthenticationManager implements AuthenticationManager {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication)  {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        if(isValidUser(username,password)){
            return new UsernamePasswordAuthenticationToken(username,password);
        }  else{
            throw new NewBadCredentialsException("invalid credentials") {
            } ;

        }
    }


    private boolean isValidUser(String username,String password) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NewBadCredentialsException("Invalid credentials"));
        return user.getUsername().equals(username) && passwordEncoder.matches(password,user.getPassword());
    }
}
