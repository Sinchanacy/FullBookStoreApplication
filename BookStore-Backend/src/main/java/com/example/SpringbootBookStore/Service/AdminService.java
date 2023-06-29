package com.example.SpringbootBookStore.Service;

import com.example.SpringbootBookStore.Entity.Books;
import com.example.SpringbootBookStore.Model.BookDetailsModel;
import com.example.SpringbootBookStore.Model.UpdatePriceModel;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminService {
    ResponseEntity<String> addBook(BookDetailsModel bookDetailsModel);

    List<Books> findAllBooks();
    Books updatePrice(UpdatePriceModel updatePriceModel);

    Books updateAvailability(String title);

    List findAllTitles();
}
