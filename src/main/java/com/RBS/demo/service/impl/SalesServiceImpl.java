package com.RBS.demo.service.impl;

import com.RBS.demo.model.Sales;
import com.RBS.demo.repository.SalesRepository;
import com.RBS.demo.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalesServiceImpl implements SalesService {

    private final SalesRepository salesRepository;

    @Autowired
    public SalesServiceImpl(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }

    @Override
    public Sales addSale(Sales sales) {
        return salesRepository.save(sales);
    }

    @Override
    public List<Sales> getAllSales() {
        return salesRepository.findAll();
    }

    @Override
    public Sales getSaleById(int saleId) {
        Optional<Sales> sale = salesRepository.findById(saleId);
        return sale.orElse(null); // or throw an exception if needed
    }

    @Override
    public void deleteSaleById(int saleId) {
        salesRepository.deleteById(saleId);
    }

    @Override
    public Sales updateSale(Sales sales, int saleId) {
        if (salesRepository.existsById(saleId)) {
            sales.setSaleId(saleId); // Ensure the saleId remains the same
            return salesRepository.save(sales);
        }
        return null; // or throw an exception if needed
    }

    @Override
    public List<Sales> getSalesByProductName(String pName) {
        return salesRepository.findByPName(pName);
    }

    @Override
    public List<Sales> getSalesByCategory(String category) {
        return salesRepository.findByCategory(category);
    }

    @Override
    public long countSalesByProductId(int pId) {
        return salesRepository.countByPId(pId);
    }
}

