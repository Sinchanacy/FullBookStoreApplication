package com.example.BookStoreApplicationBackend.Service;

import com.example.BookStoreApplicationBackend.Entity.Books;
import com.example.BookStoreApplicationBackend.Model.AdminLoginModel;
import com.example.BookStoreApplicationBackend.Model.BookDetailsModel;
import com.example.BookStoreApplicationBackend.Model.UpdateAvailabilityModel;
import com.example.BookStoreApplicationBackend.Model.UpdatePriceModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

public interface adminService {
    Object authenticate(AdminLoginModel adminLoginModel);

    ResponseEntity<String> addBook( BookDetailsModel bookDetailsModel);

    List<Books> findAllBooks();

    Books updatePrice(UpdatePriceModel updatePriceModel);

    Books updateAvailability(int id);

    List findAllTitles();
}
