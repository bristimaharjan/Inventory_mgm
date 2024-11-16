package com.RBS.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sales")
public class Sales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "saleId", nullable = false)
    private int saleId;

    @Column(name = "pId", nullable = false)
    private int pId; // Foreign Key: Product ID (simple reference)

    @Column(name = "pName", nullable = false)
    private String pName; // Product Name

    @Column(name = "category", nullable = false)
    private String category; // Product Category

    @Column(name = "userId", nullable = false)
    private int userId; // Foreign Key: User ID (salesperson ID)

    @Column(name = "quantitySold", nullable = false)
    private int quantitySold;

    @Column(name = "salePrice", nullable = false)
    private int salePrice;

    @Column(name = "saleDate", nullable = false)
    private String saleDate;

    @Column(name = "paymentStatus", nullable = false)
    private String paymentStatus; // Payment Status (Paid, Unpaid, Pending, etc.)

    @Column(name = "customerName", nullable = false)
    private String customerName; // Bought By (Customer Name)

    // Getters and Setters
    public int getSaleId() {
        return saleId;
    }

    public void setSaleId(int saleId) {
        this.saleId = saleId;
    }

    public int getpId() {
        return pId;
    }

    public void setpId(int pId) {
        this.pId = pId;
    }

    public String getpName() {
        return pName;
    }

    public void setpName(String pName) {
        this.pName = pName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getQuantitySold() {
        return quantitySold;
    }

    public void setQuantitySold(int quantitySold) {
        this.quantitySold = quantitySold;
    }

    public int getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(int salePrice) {
        this.salePrice = salePrice;
    }

    public String getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(String saleDate) {
        this.saleDate = saleDate;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus; // Values like "Paid", "Unpaid", "Pending", etc.
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
}
