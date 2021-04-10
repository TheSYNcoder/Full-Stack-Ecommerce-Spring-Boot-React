package com.flamup.spring.Repositories;

import com.flamup.spring.Models.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface OrderRepository extends JpaRepository<OrderItem, Long> {

    public List<OrderItem> findByCart_Id(Long cart_id);

    public Optional<OrderItem> findById(String id);
}
