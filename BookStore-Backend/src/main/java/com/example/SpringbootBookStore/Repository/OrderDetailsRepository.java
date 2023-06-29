package com.example.SpringbootBookStore.Repository;

import com.example.SpringbootBookStore.Entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails,Integer> {
}
