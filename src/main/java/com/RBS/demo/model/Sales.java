package com.RBS.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sales")
public class Sales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "saleId", nullable = false)
    private int saleId;

    @ManyToOne
    private Product product;



    @ManyToOne
    private User user;

    @Column( nullable = false)
    private int quantitySold;

    @Column( nullable = false)
    private int salePrice;

    @Column(nullable = false)
    private String soldDate;

    @Column( nullable = false)
    private String paymentStatus; // Payment Status (Paid, Unpaid, Pending, etc.)



    // Getters and Setters
    public int getSaleId() {
        return saleId;
    }

    public void setSaleId(int saleId) {
        this.saleId = saleId;
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

    public String getSoldDate() {
        return soldDate;
    }

    public void setSoldDate(String soldDate) {
        this.soldDate = soldDate;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus; // Values like "Paid", "Unpaid", "Pending", etc.
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
