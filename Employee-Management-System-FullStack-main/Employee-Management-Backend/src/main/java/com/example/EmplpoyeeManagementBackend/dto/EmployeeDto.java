package com.example.EmplpoyeeManagementBackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
    private Long id;
    @NotEmpty(message = "firstname cannot be empty")
    private String firstName;
    @NotEmpty(message = "lastname cannot be empty")
    private String lastName;
    @Email(message = "invalid email")
    private String email;
    @NotEmpty(message = "mobileNo cannot be empty")
    private String mobileNo;
}
