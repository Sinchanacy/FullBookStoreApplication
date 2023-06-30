package com.example.BookStoreApplicationBackend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class VerifyRegistrationToken {
    private static final int time = 60;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userid;
    private String token;
    private Date exp_time;
    @OneToOne(fetch = FetchType.EAGER, cascade
            = CascadeType.ALL)
    @JoinColumn(name = "Customer_id",
            nullable = false, foreignKey = @ForeignKey(name = "verify_reg"))
    private UserDetails userDetails;


    public VerifyRegistrationToken(String token) {
        this.token = token;
        this.exp_time = Calc(time);

    }
    public VerifyRegistrationToken(UserDetails userDetails, String token) {
        this.token = token;
        this.userDetails = userDetails;
        this.exp_time = Calc(time);
    }
    private Date Calc(int time) {
        Calendar c = Calendar.getInstance();
        c.setTimeInMillis(new Date().getTime());
        c.add(Calendar.MINUTE, time);
        return new Date(c.getTime().getTime());
    }

}
