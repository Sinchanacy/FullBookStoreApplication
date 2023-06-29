package com.example.SpringbootBookStore.Service;

import com.example.SpringbootBookStore.Entity.Books;
import com.example.SpringbootBookStore.Model.Authenticationrequest;
import com.example.SpringbootBookStore.Model.Authenticationresponse;
import com.example.SpringbootBookStore.Model.OrdersModel;
import com.example.SpringbootBookStore.Model.RegisterRequest;

import java.util.List;

public interface UserService {
    Authenticationresponse registerUser(RegisterRequest request);

    Authenticationresponse authenticate(Authenticationrequest request);

    List<Books> findAllBooks();

    String addAndSaveOrderDetails(OrdersModel ordersModel);
}
