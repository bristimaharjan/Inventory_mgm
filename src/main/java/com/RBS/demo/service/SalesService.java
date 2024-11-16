package com.RBS.demo.service;

import com.RBS.demo.model.Sales;

import java.util.List;

public interface SalesService {
    Sales addSale(Sales sales);
    List<Sales> getAllSales();
    Sales getSaleById(int saleId);
    void deleteSaleById(int saleId);
    Sales updateSale(Sales sales, int saleId);
    List<Sales> getSalesByProductName(String pName);
    List<Sales> getSalesByCategory(String category);
    long countSalesByProductId(int pId);
}



