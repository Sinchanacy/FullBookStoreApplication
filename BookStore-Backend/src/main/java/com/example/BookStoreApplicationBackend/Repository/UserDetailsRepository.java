package com.example.BookStoreApplicationBackend.Repository;

import com.example.BookStoreApplicationBackend.Entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDetailsRepository extends JpaRepository<UserDetails,Integer> {
    Optional<UserDetails> findByEmail(String email);
}
