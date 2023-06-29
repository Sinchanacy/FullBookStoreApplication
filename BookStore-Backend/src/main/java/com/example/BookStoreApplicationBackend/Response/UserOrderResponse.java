package com.example.BookStoreApplicationBackend.Response;

import com.example.BookStoreApplicationBackend.Response.BookOrderResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserOrderResponse {
    private int id;
    private List<BookOrderResponse> books;
}
