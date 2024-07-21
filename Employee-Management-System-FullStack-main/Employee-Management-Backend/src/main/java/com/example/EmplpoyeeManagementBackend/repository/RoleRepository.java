package com.example.EmplpoyeeManagementBackend.repository;

import com.example.EmplpoyeeManagementBackend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByName(String name);
}
