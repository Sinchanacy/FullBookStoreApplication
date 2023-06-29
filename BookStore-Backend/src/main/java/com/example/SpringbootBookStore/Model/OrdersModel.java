package com.example.SpringbootBookStore.Model;

import com.example.SpringbootBookStore.Entity.Books;
import lombok.Data;

import java.util.List;

@Data
public class OrdersModel {
    private List<Books> books;
    private String email;

}
