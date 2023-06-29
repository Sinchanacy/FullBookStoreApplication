package com.example.BookStoreApplicationBackend.Service;

import com.example.BookStoreApplicationBackend.Configuration.JWTService;
import com.example.BookStoreApplicationBackend.Entity.Books;
import com.example.BookStoreApplicationBackend.Model.*;
import com.example.BookStoreApplicationBackend.Repository.AdminRepository;
import com.example.BookStoreApplicationBackend.Repository.BooksRepository;
import com.example.BookStoreApplicationBackend.Response.Authenticationresponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class adminServiceImp implements adminService{
    private final AdminRepository adminRepository;
    private final BooksRepository booksRepository;
    private final JWTService jwtService;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final AuthenticationManager authenticationManager;
    @Override
    public Object authenticate(AdminLoginModel adminLoginModel) {
        var user=adminRepository.findByUsername(adminLoginModel.getUsername()).orElse(null);
        if(user==null)
        {
            return Authenticationresponse.builder().build();
        }
        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        adminLoginModel.getUsername(),
                        adminLoginModel.getAdminpassword()
        ));
        System.out.println(authentication);
        var jwtToken=jwtService.generateToken(user);
        return Authenticationresponse.builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public ResponseEntity<String> addBook( BookDetailsModel bookDetailsModel) {
       if(booksRepository.findByTitle(bookDetailsModel.getTitle()).isPresent())
       {
           Books book1=booksRepository.findByTitle(bookDetailsModel.getTitle()).get();
           book1.setCount(book1.getCount()+1);
           book1.setAvailability("In Stock");
           booksRepository.save(book1);
            System.out.println("present");

               return ResponseEntity.ok("Book added successfully : count :- "+book1.getCount());
        }
        //System.out.println(" not present");
       else
       {
            Books book = Books.builder()
                    .author(bookDetailsModel.getAuthor())
                    .availability(bookDetailsModel.getAvailability())
                    .pages(bookDetailsModel.getPages())
                    .genre(bookDetailsModel.getGenre())
                    .price(bookDetailsModel.getPrice())
                    .title(bookDetailsModel.getTitle())
                    .description(bookDetailsModel.getDescription())
                    .count(1)
                    .language(bookDetailsModel.getLanguage())
                    .build();
            booksRepository.save(book);
            return ResponseEntity.ok("Book added successfully");
        }


    }

    @Override
    public List<Books> findAllBooks() {
        List<Books> list=booksRepository.findAll();
        return list;
    }

    @Override
    public Books updatePrice(UpdatePriceModel updatePriceModel) {
        Books book=booksRepository.findByTitle(updatePriceModel.getTitle()).get();
        book.setPrice(updatePriceModel.getPrice());
        return book;
    }

    @Override
    public Books updateAvailability(int id) {
        Books book=booksRepository.findById(id).get();
        if(book.getCount()==0)
        {
            return book;
        }
        book.setCount(book.getCount()-1);
        if(book.getCount()==0)
        {
            book.setAvailability("Out of Stock");
        }
        booksRepository.save(book);
        return book;
    }

    @Override
    public List findAllTitles() {
       List<Books> list=booksRepository.findAll();
       List li=new ArrayList();
       for(Books b:list)
       {
           li.add(b.getTitle());
       }
      return li;
    }
}
