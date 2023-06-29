package com.example.BookStoreApplicationBackend.Model;

import com.example.BookStoreApplicationBackend.Entity.Books;
import com.example.BookStoreApplicationBackend.Entity.UserDetails;
import lombok.Data;

import java.util.List;

@Data
public class OrdersModel {
    private List<Books> books;
    private String email;

}
