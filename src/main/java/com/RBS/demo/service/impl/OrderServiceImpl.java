package com.RBS.demo.service.impl;

import com.RBS.demo.model.Order;
import com.RBS.demo.model.User;
import com.RBS.demo.repository.OrderRepository;
import com.RBS.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order add(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order getById(int id) {
        Optional<Order> optionalUser = orderRepository.findById(id);
        Order order= optionalUser.orElseThrow((()->new RuntimeException("Order not found")));
        return order;
    }

    @Override
    public List<Order> findByUserid(int userid) {
        return List.of();
    }

    @Override
    public Order updateOrder(Order order, int id) {
        getById(id);//check id
        order.setId(id);
        return orderRepository.save(order);
    }

    @Override
    public void deleteById(int id) {
        getById(id);
        orderRepository.deleteById(id);
    }

    @Override
    public List<Order> findByStatus(String status) {
        return orderRepository.findByStatus(status);

    }

    @Override
    public double calculateTotalAmount(int orderid) {
        Order order = getById(orderid); // Reuse the `getById` method to fetch the order.
        return order.getTotalAmount();
    }
}
