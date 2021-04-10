package com.flamup.spring.Models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.flamup.spring.DTO.OrderDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;


@Entity
@Table(name = "item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    private String id;

    @OneToOne
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name ="cart_id" , nullable = false)
    @JsonIgnore
    private ShoppingCart cart;

    private int quantity;

    public void fromDto(Product p, ShoppingCart cart, int quantity ){
        id = UUID.randomUUID().toString().replace("-", "");
        product = p;
        this.cart = cart;
        this.quantity = quantity;

    }

}
