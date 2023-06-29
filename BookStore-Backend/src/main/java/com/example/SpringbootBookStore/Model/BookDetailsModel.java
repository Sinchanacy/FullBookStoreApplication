package com.example.SpringbootBookStore.Model;

import lombok.Data;

@Data
public class BookDetailsModel {
    private String title;
    private String author;
    private int price;
    private int pages;
    private String language;
    private String description;
    private String genre;
    private String availability;
}
