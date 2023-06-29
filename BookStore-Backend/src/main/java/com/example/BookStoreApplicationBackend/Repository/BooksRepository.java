package com.example.BookStoreApplicationBackend.Repository;

import com.example.BookStoreApplicationBackend.Entity.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BooksRepository extends JpaRepository<Books,Integer> {
   Optional<Books> findByTitle(String title);
   Optional<Books> findById(int id);
}

