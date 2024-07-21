package com.example.EmplpoyeeManagementBackend.service;

import com.example.EmplpoyeeManagementBackend.dto.JwtAuthResponse;
import com.example.EmplpoyeeManagementBackend.dto.LoginRequestDto;
import com.example.EmplpoyeeManagementBackend.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    JwtAuthResponse login(LoginRequestDto loginRequestDto);
}
