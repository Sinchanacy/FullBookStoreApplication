package com.example.BookStoreApplicationBackend.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AllOrdersResponse {
    private int id;
    private UserDetailsOrders userDetailsOrders;
    private List<BookOrderResponse> bookOrderResponses;
}
