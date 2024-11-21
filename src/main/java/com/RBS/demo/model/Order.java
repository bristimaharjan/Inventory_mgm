package com.RBS.demo.model;

import jakarta.persistence.*;
import java.util.Random;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String orderdate;
    private String status;
    private double totalamount;
    private int quantity;
    private String ordernumber; // Change to String for flexibility
    @ManyToOne
    private User user;

    public Order() {
        this.ordernumber = generateUniqueOrderNumber();
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

    public void setTotalamount(double totalamount) {
        this.totalamount = totalamount;
    }

    public double getTotalAmount() {
        return totalamount;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getOrdernumber() {
        return ordernumber;
    }

    public void setOrdernumber(String ordernumber) {
        this.ordernumber = ordernumber;
    }

    public String getOrderdate() {
        return orderdate;
    }

    public void setOrderdate(String orderdate) {
        this.orderdate = orderdate;
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
