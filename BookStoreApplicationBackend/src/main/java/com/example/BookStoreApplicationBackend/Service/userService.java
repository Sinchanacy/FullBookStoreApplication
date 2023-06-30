package com.example.BookStoreApplicationBackend.Service;

import com.example.BookStoreApplicationBackend.Entity.UserDetails;
import com.example.BookStoreApplicationBackend.Model.*;
import com.example.BookStoreApplicationBackend.Request.Authenticationrequest;
import com.example.BookStoreApplicationBackend.Request.RegisterRequest;
import com.example.BookStoreApplicationBackend.Response.AllOrdersResponse;
import com.example.BookStoreApplicationBackend.Response.Authenticationresponse;
import com.example.BookStoreApplicationBackend.Response.UserOrderResponse;

import java.util.List;

public interface userService {

    String getRegistrationToken(UserDetails userDetails, String applicationUrl);

    String verifyRegistrationToken(String token);

    void addOrderDetails(String token);


    void addAndSaveOrderDetails(OrdersModel ordersModel);

    Authenticationresponse registerUser(RegisterRequest req);

    Authenticationresponse authenticate(Authenticationrequest request);

    List<UserOrderResponse> getUserOrderDetails(String email);

    List<AllOrdersResponse> getOrderDetails();
}
