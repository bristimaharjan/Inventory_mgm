package com.RBS.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Random;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "order_date", nullable = false) // Maps the field to "order_date" column
    private LocalDateTime orderDate;

    @Column(nullable = false)
    private String status;

    @Column(name = "total_amount", nullable = false)
    private double totalAmount;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "order_number", unique = true, nullable = false)
    private String orderNumber; // Changed to String for flexibility

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Maps the relationship to a "user_id" column
    private User user;

    public Order() {
        this.orderNumber = generateUniqueOrderNumber();
        this.orderDate = LocalDateTime.now(); // Automatically set the order date to the current date and time
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    // Method to generate a random and unique order number
    private String generateUniqueOrderNumber() {
        Random random = new Random();
        StringBuilder orderNumber = new StringBuilder();

        // Add a prefix if needed (e.g., "ORD")
        orderNumber.append("ORD-");

        // Add 4 random digits
        for (int i = 0; i < 4; i++) {
            orderNumber.append(random.nextInt(10)); // Random digit between 0-9
        }

        // Optionally, append the current timestamp for additional uniqueness
        orderNumber.append("-");
        orderNumber.append(System.currentTimeMillis());

        return orderNumber.toString();
    }
}
