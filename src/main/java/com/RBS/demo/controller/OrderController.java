package com.RBS.demo.controller;

import com.RBS.demo.model.Order;
import com.RBS.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    // Get all orders
    @GetMapping("/list")
    public List<Order> getAllOrders() {
        return orderService.getAll();
    }

    // Add a new order
    @PostMapping("/add")
    public Order addOrder(@RequestBody Order order) {
        return orderService.add(order);
    }

    // Update an existing order
    @PutMapping("/update/{id}")
    public Order updateOrder(@RequestBody Order order, @PathVariable int id) {
        return orderService.updateOrder(order, id);
    }

    // Get a specific order by ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable int id) {
        return orderService.getById(id);
    }

    // Delete an order by ID
    @DeleteMapping("/{id}")
    public void deleteOrderById(@PathVariable int id) {
        orderService.deleteById(id);
    }

    // Get all orders by status
    @GetMapping("/status/{status}")
    public List<Order> getOrdersByStatus(@PathVariable String status) {
        return orderService.findByStatus(status);
    }

    // Get all orders placed by a specific user
    @GetMapping("/user/{userid}")
    public List<Order> getOrdersByUserId(@PathVariable int userid) {
        return orderService.findByUserid(userid);
    }

    // Calculate the total amount for a specific order
    @GetMapping("/calculate/{orderid}")
    public double calculateTotalAmount(@PathVariable int orderid) {
        return orderService.calculateTotalAmount(orderid);
    }
}

