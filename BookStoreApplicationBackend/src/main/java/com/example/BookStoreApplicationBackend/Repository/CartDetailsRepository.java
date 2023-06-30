package com.example.BookStoreApplicationBackend.Repository;

import com.example.BookStoreApplicationBackend.Entity.CartDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartDetailsRepository extends JpaRepository<CartDetails,Integer> {
    Optional<CartDetails> findByBookName(String title);
}
