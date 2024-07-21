package com.example.EmplpoyeeManagementBackend.controller;

import com.example.EmplpoyeeManagementBackend.dto.EmployeeDto;
import com.example.EmplpoyeeManagementBackend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("api/employee")
public class EmployeeController {
    private EmployeeService employeeService;
    @PreAuthorize("hasRole(\"ADMIN\")")
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }
    @PreAuthorize("hasAnyRole(\"ADMIN\", \"USER\")")
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employeeDtoList = employeeService.getAllEmployees();
        return ResponseEntity.ok().body(employeeDtoList);
    }
    @PreAuthorize("hasAnyRole(\"ADMIN\", \"USER\")")
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long id) {
        EmployeeDto employeeDto = employeeService.getEmployeeById(id);
        return ResponseEntity.ok().body(employeeDto);
    }
    @PreAuthorize("hasRole(\"ADMIN\")")
    @PutMapping("update/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@RequestBody EmployeeDto employeeDto, @PathVariable("id") Long id) {
        EmployeeDto updatedEmployee = employeeService.updateEmployee(employeeDto,id);
        return ResponseEntity.ok(updatedEmployee);
    }
    @PreAuthorize("hasRole(\"ADMIN\")")
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully!");
    }
}
