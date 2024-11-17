package com.RBS.demo.service.impl;



import com.RBS.demo.model.Sales;
import com.RBS.demo.repository.SalesRepository;
import com.RBS.demo.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SalesServiceImpl implements SalesService {


  @Autowired
  private SalesRepository salesRepository;
    @Override
    public Sales addSale(Sales sales) {
        return salesRepository.save(sales);
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
    public List<Sales> findAll() {
        return List.of();
    }

    @Override
    public List<Sales> findAllByProductId(int productId) {
        return List.of();
    }


}

