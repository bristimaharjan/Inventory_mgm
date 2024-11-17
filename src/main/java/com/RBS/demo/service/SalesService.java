package com.RBS.demo.service;

import com.RBS.demo.model.Sales;

import java.util.List;

public interface SalesService {
    Sales addSale(Sales sales);
    void deleteSaleById(int saleId);
    Sales updateSale(Sales sales, int saleId);

    List<Sales> findAll();

    List<Sales> findAllByProductId(int productId);

}



