package com.example.BookStoreApplicationBackend.Controller;

import com.example.BookStoreApplicationBackend.Entity.Admin;
import com.example.BookStoreApplicationBackend.Entity.Books;
import com.example.BookStoreApplicationBackend.Entity.OrderDetails;
import com.example.BookStoreApplicationBackend.Model.AdminLoginModel;
import com.example.BookStoreApplicationBackend.Model.BookDetailsModel;
import com.example.BookStoreApplicationBackend.Model.UpdateAvailabilityModel;
import com.example.BookStoreApplicationBackend.Model.UpdatePriceModel;
import com.example.BookStoreApplicationBackend.Repository.AdminRepository;
import com.example.BookStoreApplicationBackend.Repository.BooksRepository;
import com.example.BookStoreApplicationBackend.Repository.OrderDetailsRepository;
import com.example.BookStoreApplicationBackend.Service.adminService;
import com.example.BookStoreApplicationBackend.Utlities.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
//@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    private final adminService adminservice;
    private final PasswordEncoder passwordEncoder;
    private final AdminRepository adminRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final BooksRepository booksRepository;

    @PostMapping("/bookStore/adminPanel/addBook")
    public ResponseEntity<String> addingBook(@RequestBody BookDetailsModel bookDetailsModel)
    {
        return adminservice.addBook(bookDetailsModel);
    }
    @GetMapping("/bookStore/adminPanel/allBooks")
    public List<Books>  getAllBooks()
    {
        return adminservice.findAllBooks();
    }
    @GetMapping("/bookStore/adminPanel/allTitles")
    public List getAllTitles()
    {
        List list=adminservice.findAllTitles();
        return list;
    }
    @PostMapping("/bookStore/adminPanel/updatePrice")
    public Books updateBookPrice(@RequestBody UpdatePriceModel updatePriceModel)
    {
        return adminservice.updatePrice(updatePriceModel);
    }
    @PostMapping("/bookStore/adminPanel/removeBook")
    public Books removeBooksOrUpdateBookAvailability(@RequestParam("id") int id)
    {
        System.out.println("here");
        return adminservice.updateAvailability(id);
    }
    @GetMapping("/bookStore/adminPanel/OrderDetails")
    public  List<OrderDetails> getOrderDetails()
    {
        List<OrderDetails> orderDetails=orderDetailsRepository.findAll();
        System.out.println(orderDetails);
        return  orderDetails;
    }
    @GetMapping("/bookStore/adminPanel/bookDetails")
    public Books getDetailsById(@RequestParam("id") int id){
        Books book=booksRepository.findById(id).get();
        return book;
    }
}

