package com.example.SpringbootBookStore.Service;

import com.example.SpringbootBookStore.Configuration.JWTService;
import com.example.SpringbootBookStore.Entity.Books;
import com.example.SpringbootBookStore.Entity.OrderDetails;
import com.example.SpringbootBookStore.Entity.UserDetails;
import com.example.SpringbootBookStore.Model.Authenticationrequest;
import com.example.SpringbootBookStore.Model.Authenticationresponse;
import com.example.SpringbootBookStore.Model.OrdersModel;
import com.example.SpringbootBookStore.Model.RegisterRequest;
import com.example.SpringbootBookStore.Repository.BooksRepository;
import com.example.SpringbootBookStore.Repository.OrderDetailsRepository;
import com.example.SpringbootBookStore.Repository.UserDetailsRepository;
import com.example.SpringbootBookStore.Utlities.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService{
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsRepository userDetailsRepository;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    private final BooksRepository booksRepository;
    private final OrderDetailsRepository orderDetailsRepository;

    @Override
    public Authenticationresponse registerUser(RegisterRequest request) {
        UserDetails user=UserDetails.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userDetailsRepository.save(user);
        var jwtToken=jwtService.generateToken(user);
        return Authenticationresponse.builder()
                .token(jwtToken)
                .build();

    }

    @Override
    public Authenticationresponse authenticate(Authenticationrequest request) {
        var user=userDetailsRepository.findByEmail(request.getEmail()).orElse(null);
        if(user==null)
        {
            return Authenticationresponse.builder().build();
        }
        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword())
        );
        System.out.println(authentication);
        var jwtToken=jwtService.generateToken(user);
        return Authenticationresponse.builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public List<Books> findAllBooks() {
        List<Books> list=booksRepository.findAll();
        return list;
    }

    @Override
    public String addAndSaveOrderDetails(OrdersModel ordersModel) {
        List<Books> books = new ArrayList<>();
        List<Books> orderedBooks = ordersModel.getBooks();
        OrderDetails order = new OrderDetails();

        for (Books book : orderedBooks) {
            Optional<Books> booksOptional = booksRepository.findById(book.getId());
            booksOptional.ifPresent(books::add);
            // Book count is reduced in frontend
        }

        String userEmail = ordersModel.getEmail();
        UserDetails user = userDetailsRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + userEmail));

        order.setUserDetails(user);
        order.setBooks(books);

        // Update the associations in the associated entities
       // user.getOrderDetails().add(order);
        books.forEach(book -> book.getOrderDetails().add(order));
        orderDetailsRepository.save(order);
        return "Book added successfully";
    }
}
