package com.flamup.spring.Models;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "clothes")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Product {

    public enum sex{
        MALE,
        FEMALE
    }

    @Id
    Long id;
    @Enumerated(EnumType.STRING)
    sex sex;
    String dresstype;
    String image;
    String price;
    String arrival;
    int discount;


}
