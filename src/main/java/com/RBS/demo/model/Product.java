package com.RBS.demo.model;

import jakarta.persistence.*;

    @Entity
    @Table(name="products")
public class Product {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "pId",nullable = false)
        private int pId;
        @Column(name = "pName")
        private String pName;
        @Column(name = "pQuantity",nullable = false)
        private int pQuantity;
        @Column( name = "pStatus", nullable = false)
        private String pStatus;
        @Column(name = "pPrice", nullable = false)
        private int pPrice;//@ManyToOne
        //private User user;
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

        public int getpPrice() {
            return pPrice;
        }

        public void setpPrice(int pPrice) {
            this.pPrice = pPrice;
        }

        public int getpQuantity() {
            return pQuantity;
        }

        public void setpQuantity(int pQuantity) {
            this.pQuantity = pQuantity;
        }

        public String getpStatus() {
            return pStatus;
        }

        public void setpStatus(String pStatus) {
            this.pStatus = pStatus;
        }

     /*   public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
        }*/
    }


