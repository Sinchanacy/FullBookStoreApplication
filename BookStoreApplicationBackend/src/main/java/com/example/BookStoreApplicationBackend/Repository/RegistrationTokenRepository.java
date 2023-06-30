package com.example.BookStoreApplicationBackend.Repository;

import com.example.BookStoreApplicationBackend.Entity.VerifyRegistrationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationTokenRepository extends JpaRepository<VerifyRegistrationToken,Integer> {
         VerifyRegistrationToken findByToken(String token);
}
