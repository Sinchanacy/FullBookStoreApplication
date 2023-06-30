package com.example.BookStoreApplicationBackend.Controller;

import com.example.BookStoreApplicationBackend.Entity.Books;
import com.example.BookStoreApplicationBackend.Entity.UserDetails;
import com.example.BookStoreApplicationBackend.Model.*;
import com.example.BookStoreApplicationBackend.Repository.BooksRepository;
import com.example.BookStoreApplicationBackend.Request.Authenticationrequest;
import com.example.BookStoreApplicationBackend.Request.RegisterRequest;
import com.example.BookStoreApplicationBackend.Response.AllOrdersResponse;
import com.example.BookStoreApplicationBackend.Response.Authenticationresponse;
import com.example.BookStoreApplicationBackend.Response.UserOrderResponse;
import com.example.BookStoreApplicationBackend.Service.adminService;
import com.example.BookStoreApplicationBackend.Service.userService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
//@CrossOrigin(origins = "http://localhost:3000")
public class UserInterfaceController {
    private final BooksRepository booksRepository;
    private final userService userServ;
    private final adminService adminservice;
    @PostMapping("/bookStore/userPanel/register")
    public ResponseEntity<Authenticationresponse> registering(@RequestBody RegisterRequest req)
    {
        UserDetails user=new UserDetails();
        return  ResponseEntity.ok(userServ.registerUser(req));
    }
    @PostMapping("/bookStore/userPanel/authenticate")
    public ResponseEntity<Authenticationresponse> authenticating(@RequestBody Authenticationrequest request)
    {
        return  ResponseEntity.ok(userServ.authenticate(request));
    }
    @GetMapping("/bookStore/userPanel/details")
    public Books getDetails(@RequestParam("title") String title){
        Books book=booksRepository.findByTitle(title).get();
        return book;
    }
    @GetMapping("/bookStore/userPanel/bookDetails")
    public Books getDetailsById(@RequestParam("id") int id){
        Books book=booksRepository.findById(id).get();
        return book;
    }
    @GetMapping("/bookStore/userPanel/allBooks")
    public List<Books> getAllBooks()
    {
        return adminservice.findAllBooks();
    }

    //new methods

    @PostMapping("/bookStore/userPanel/addBook")
    public String addBookToOrderDetails(@RequestBody OrdersModel ordersModel)
    {
        System.out.println("here");
        userServ.addAndSaveOrderDetails(ordersModel);
         return null;
    }
    @GetMapping("/bookStore/userPanel/getUserOrderDetails")
    public List<UserOrderResponse> UserOrderDetails(@RequestParam("email") String email)
    {
        System.out.println("here");
        List<UserOrderResponse> responses= userServ.getUserOrderDetails(email);
        return responses;
    }
    @GetMapping("/bookStore/adminPanel/getOrderDetails")
    public List<AllOrdersResponse> OrderDetails()
    {
        System.out.println("here");
        List<AllOrdersResponse> responses= userServ.getOrderDetails();
        return responses;
    }

}
