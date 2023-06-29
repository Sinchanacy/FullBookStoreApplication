package com.example.BookStoreApplicationBackend.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookOrderResponse {
    private String title;
    private String author;
    private int price;

}
