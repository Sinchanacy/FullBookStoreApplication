package com.example.BookStoreApplicationBackend.Service;

import com.example.BookStoreApplicationBackend.Configuration.JWTService;
import com.example.BookStoreApplicationBackend.Entity.*;
import com.example.BookStoreApplicationBackend.Model.*;
import com.example.BookStoreApplicationBackend.Repository.*;
import com.example.BookStoreApplicationBackend.Request.Authenticationrequest;
import com.example.BookStoreApplicationBackend.Request.RegisterRequest;
import com.example.BookStoreApplicationBackend.Response.*;
import com.example.BookStoreApplicationBackend.Utlities.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class userServiceImp implements userService{
    private final CartDetailsRepository cartDetailsRepository;
    private final BooksRepository booksRepository;
    private final UserDetailsRepository userDetailsRepository;
    private final RegistrationTokenRepository registrationTokenRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    @Override
    public String getRegistrationToken(UserDetails userDetails, String applicationUrl) {
        String token= UUID.randomUUID().toString();
        VerifyRegistrationToken verifyRegistrationToken=new VerifyRegistrationToken(userDetails,token);
        registrationTokenRepository.save(verifyRegistrationToken);
        String url=applicationUrl+"/bookStore/userPanel/verifyUser?token="+ token;
        log.info("click the link to reset ur password:{}", url);
        return url;
    }

    @Override
    public String verifyRegistrationToken(String token) {
        VerifyRegistrationToken verToken=registrationTokenRepository.findByToken(token);
        if(verToken==null)
        {
            return "invalid";
        }
        Calendar calendar=Calendar.getInstance();
        if(verToken.getExp_time().getTime()-calendar.getTime().getTime()<=0)
        {
            registrationTokenRepository.delete(verToken);
            return "expired";
        }
        return "valid";
    }

    @Override
    public void addOrderDetails(String token) {
        VerifyRegistrationToken verToken=registrationTokenRepository.findByToken(token);
        UserDetails userDetails =verToken.getUserDetails();
        List<CartDetails> cartDetails=cartDetailsRepository.findAll();
        OrderDetails orderDetails= OrderDetails.builder()
                .userDetails(userDetails)
                .build();
        orderDetailsRepository.save(orderDetails);
    }


    @Override
    public void addAndSaveOrderDetails(OrdersModel ordersModel) {
        List<Books> books = new ArrayList<>();
        List<Books> orderedBooks = ordersModel.getBooks();
        OrderDetails order = new OrderDetails();

        for (Books book : orderedBooks) {
            Optional<Books> booksOptional = booksRepository.findById(book.getId());
            booksOptional.ifPresent(books::add);
        }

        String userEmail = ordersModel.getEmail();
        UserDetails user = userDetailsRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + userEmail));

        order.setUserDetails(user);
        order.setBooks(books);

        // Update the associations in the associated entities
        user.getOrderDetails().add(order);
        books.forEach(book -> book.getOrderDetails().add(order));
        orderDetailsRepository.save(order);
    }


    @Override
    public Authenticationresponse registerUser(RegisterRequest request) {
      UserDetails  user= UserDetails.builder()
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
        var user= userDetailsRepository.findByEmail(request.getEmail()).orElse(null);
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
    public List<UserOrderResponse> getUserOrderDetails(String email) {
        List<OrderDetails> userOrders = orderDetailsRepository.findByUserDetailsEmail(email);
        List<UserOrderResponse> orders = userOrders.stream()
                .map(order -> {
                    List<BookOrderResponse> bookOrderResponses = order.getBooks().stream()
                            .map(book -> BookOrderResponse.builder()
                                    .title(book.getTitle())
                                    .author(book.getAuthor())
                                    .price(book.getPrice())
                                    .build())
                            .collect(Collectors.toList());

                    return UserOrderResponse.builder()
                            .books(bookOrderResponses)
                            .id(order.getId())
                            .build();
                })
                .collect(Collectors.toList());

        System.out.println(orders);
        return  orders;

    }

    @Override
    public List<AllOrdersResponse> getOrderDetails() {
        List<OrderDetails> allOrders = orderDetailsRepository.findAll();
        return allOrders.stream()
                .map(order -> {
                    UserDetails userDetails = order.getUserDetails();
                    List<BookOrderResponse> bookOrderResponses = order.getBooks().stream()
                            .map(book -> BookOrderResponse.builder()
                                    .title(book.getTitle())
                                    .author(book.getAuthor())
                                    .price(book.getPrice())
                                    .build())
                            .collect(Collectors.toList());

                    return AllOrdersResponse.builder()
                            .id(order.getId())
                            .userDetailsOrders(UserDetailsOrders.builder()
                                    .username(userDetails.getUsername())
                                    .email(userDetails.getEmail())
                                    .build())
                            .bookOrderResponses(bookOrderResponses)
                            .build();
                })
                .collect(Collectors.toList());

    }


    //click on this link to confirm the order.
}
