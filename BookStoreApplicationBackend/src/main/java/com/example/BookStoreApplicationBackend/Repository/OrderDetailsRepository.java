package com.example.BookStoreApplicationBackend.Repository;

import com.example.BookStoreApplicationBackend.Entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails,Integer> {
//    OrderDetails findById(int id);
    List<OrderDetails> findByUserDetailsEmail(String email);


}
