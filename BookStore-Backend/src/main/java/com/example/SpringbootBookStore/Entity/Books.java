package com.example.SpringbootBookStore.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Transactional
public class Books {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String author;
    private int price;
    private int pages;
    private String language;
    private String description;
    private String genre;
    private int count;

    @Override
    public String toString() {
        return "Books{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", price=" + price +
                ", pages=" + pages +
                ", language='" + language + '\'' +
                ", description='" + description + '\'' +
                ", genre='" + genre + '\'' +
                ", count=" + count +
                ", availability='" + availability + '\'' +
                '}';
    }

    private String availability;

    @JsonIgnore
    @ManyToMany(mappedBy = "books")
    private List<OrderDetails> orderDetails;
   
}
