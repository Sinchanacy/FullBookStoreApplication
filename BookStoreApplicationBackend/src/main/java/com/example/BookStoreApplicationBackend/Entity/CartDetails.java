package com.example.BookStoreApplicationBackend.Entity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.BookStoreApplicationBackend.Entity.Books;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CartDetailsBooks")
public class CartDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartId;
    private String bookName;
    private int bookPrice;
    private int bookCount;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderDetails orderDetails;
}
