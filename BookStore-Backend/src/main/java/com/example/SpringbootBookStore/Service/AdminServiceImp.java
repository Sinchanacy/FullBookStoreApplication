package com.example.SpringbootBookStore.Service;

import com.example.SpringbootBookStore.Entity.Books;
import com.example.SpringbootBookStore.Model.BookDetailsModel;
import com.example.SpringbootBookStore.Model.UpdatePriceModel;
import com.example.SpringbootBookStore.Repository.BooksRepository;
import com.example.SpringbootBookStore.Repository.UserDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImp implements AdminService{
    private final BooksRepository booksRepository;
    private final UserDetailsRepository userDetailsRepository;
    @Override
    public ResponseEntity<String> addBook(BookDetailsModel bookDetailsModel) {
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
    public Books updateAvailability(String title) {
        Books book = booksRepository.findByTitle(title).get();
        if (book.getCount() == 0) {
            return book;
        }
        book.setCount(book.getCount() - 1);
        if (book.getCount() == 0) {
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
