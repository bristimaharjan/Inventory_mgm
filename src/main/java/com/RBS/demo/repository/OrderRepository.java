package com.RBS.demo.repository;

import com.RBS.demo.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
    // Find all orders by a specific user ID
    List<Order> findByUser_id(int userid);

    // Find all orders with a specific status
    List<Order> findByStatus(String status);

}
