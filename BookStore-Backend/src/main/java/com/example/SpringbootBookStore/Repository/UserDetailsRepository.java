package com.example.SpringbootBookStore.Repository;

import com.example.SpringbootBookStore.Entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDetailsRepository extends JpaRepository<UserDetails,Integer> {
    Optional<UserDetails> findByEmail(String email);
}
