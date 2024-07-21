package com.example.EmplpoyeeManagementBackend.controller;

import com.example.EmplpoyeeManagementBackend.dto.JwtAuthResponse;
import com.example.EmplpoyeeManagementBackend.dto.LoginRequestDto;
import com.example.EmplpoyeeManagementBackend.dto.RegisterDto;
import com.example.EmplpoyeeManagementBackend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("api/auth")
public class AuthController {
    private AuthService authService;


    @PostMapping("login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginRequestDto requestDto) {
        JwtAuthResponse jwtAuthResponse = authService.login(requestDto);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        String response = authService.register(registerDto);

        return ResponseEntity.ok(response);
    }
}
