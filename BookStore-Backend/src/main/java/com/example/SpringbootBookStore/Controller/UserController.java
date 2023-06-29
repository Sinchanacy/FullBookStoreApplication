package com.example.SpringbootBookStore.Controller;

import com.example.SpringbootBookStore.Entity.Books;
import com.example.SpringbootBookStore.Entity.UserDetails;
import com.example.SpringbootBookStore.Model.Authenticationrequest;
import com.example.SpringbootBookStore.Model.Authenticationresponse;
import com.example.SpringbootBookStore.Model.OrdersModel;
import com.example.SpringbootBookStore.Model.RegisterRequest;
import com.example.SpringbootBookStore.Repository.BooksRepository;
import com.example.SpringbootBookStore.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;
    private final BooksRepository booksRepository;
    @PostMapping("/bookStore/userPanel/register")
    public ResponseEntity<Authenticationresponse> registering(@RequestBody RegisterRequest request)
    {
        UserDetails user=new UserDetails();
        return  ResponseEntity.ok(userService.registerUser(request));
    }
    @PostMapping("/bookStore/userPanel/authenticate")
    public ResponseEntity<Authenticationresponse> authenticating(@RequestBody Authenticationrequest request)
    {
        return  ResponseEntity.ok(userService.authenticate(request));
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
        return userService.findAllBooks();
    }
    @PostMapping("/bookStore/userPanel/addBook")
    public String addBookToOrderDetails(@RequestBody OrdersModel ordersModel)
    {
        System.out.println("here");
        String response=userService.addAndSaveOrderDetails(ordersModel);
        return response;
    }


}
