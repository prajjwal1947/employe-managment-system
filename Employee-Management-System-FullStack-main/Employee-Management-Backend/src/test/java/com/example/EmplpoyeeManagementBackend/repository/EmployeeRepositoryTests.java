package com.example.EmplpoyeeManagementBackend.repository;

import com.example.EmplpoyeeManagementBackend.entity.Employee;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;


import static org.assertj.core.api.Assertions.assertThat;
@DataJpaTest
public class EmployeeRepositoryTests {
    @Autowired
    private EmployeeRepository employeeRepository;
    private Employee employee;
    @BeforeEach
    public void setUp() {
        employee = new Employee();
        employee.setFirstName("john");
        employee.setLastName("doe");
        employee.setEmail("john@gmail.com");
        employee.setMobileNo("7415829630");
    }
    @Test
    public void givenEmployeeObject_whenSave_thenReturnSavedEmployee() {
        Employee savedEmployee = employeeRepository.save(employee);

        // Checking - assertion
        assertThat(savedEmployee).isNotNull();
        assertThat(savedEmployee.getId()).isGreaterThan(0);
    }

    @Test
    public void givenEmployeeList_whenFindAll_thenReturnEmployeeList() {
        employeeRepository.save(employee);
        Employee employee2 = new Employee();
        employee2.setFirstName("raji");
        employee2.setLastName("doe");
        employee2.setEmail("raji@gmail.com");
        employee2.setMobileNo("7458691230");
        employeeRepository.save(employee2);
        List<Employee> employeeList = employeeRepository.findAll();

        // Checking - assertion
        assertThat(employeeList).isNotNull();
        assertThat(employeeList.size()).isEqualTo(2);
    }

    @Test
    public void givenEmployeeObject_whenFindById_thenReturnEmployeeObject() {
        Employee savedEmployee = employeeRepository.save(employee);
        Employee employeeDb = employeeRepository.findById(savedEmployee.getId()).get();
        // Checking - assertion
        assertThat(employeeDb).isNotNull();
    }

    @Test
    public void givenEmployeeObject_whenUpdateEmployee_thenReturnUpdatedEmployeeObject() {
        Employee savedEmployee = employeeRepository.save(employee);
        Employee employeeDb = employeeRepository.findById(savedEmployee.getId()).get();
        employeeDb.setEmail("johndoe@gmail.com");
        Employee updatedEmployee = employeeRepository.save(employeeDb);
        // Checking - assertion
        assertThat(updatedEmployee.getEmail()).isEqualTo("johndoe@gmail.com");
    }

    @Test
    public void givenEmployeeObject_whenDeleteEmployee_thenRemoveEmployee() {
        Employee savedEmployee = employeeRepository.save(employee);
        employeeRepository.deleteById(savedEmployee.getId());

        Optional<Employee> employeeOptional = employeeRepository.findById(savedEmployee.getId());

        // Checking - assertion
        assertThat(employeeOptional).isEmpty();
    }
}
