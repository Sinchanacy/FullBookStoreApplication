package com.example.SpringbootBookStore.Controller;

import com.example.SpringbootBookStore.Entity.Books;
import com.example.SpringbootBookStore.Entity.OrderDetails;
import com.example.SpringbootBookStore.Model.BookDetailsModel;
import com.example.SpringbootBookStore.Model.UpdatePriceModel;
import com.example.SpringbootBookStore.Repository.BooksRepository;
import com.example.SpringbootBookStore.Service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    private final AdminService adminservice;
    private final PasswordEncoder passwordEncoder;
    private final BooksRepository booksRepository;
    //private final OrderDetailsRepository orderDetailsRepository;

    @PostMapping("/bookStore/adminPanel/addBook")
    public ResponseEntity<String> addingBook(@RequestBody BookDetailsModel bookDetailsModel)
    {
        return adminservice.addBook(bookDetailsModel);
    }
    @GetMapping("/bookStore/adminPanel/allBooks")
    public List<Books> getAllBooks()
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
    public Books removeBooksOrUpdateBookAvailability(@RequestParam("title") String title)
    {
        return adminservice.updateAvailability(title);
    }
    @GetMapping("/bookStore/adminPanel/bookDetails")
    public Books getDetailsById(@RequestParam("id") int id){
        Books book=booksRepository.findById(id).get();
        return book;
    }
    /*
    @GetMapping("/bookStore/adminPanel/getOrderDetails")
    public  List<OrderDetails> getOrderDetails()
    {
        List<OrderDetails> orderDetails=orderDetailsRepository.findAll();
        System.out.println(orderDetails);
        return  orderDetails;
    }

     */
}


