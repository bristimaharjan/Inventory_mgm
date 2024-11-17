package com.RBS.demo.controller;

import com.RBS.demo.model.Product;
import com.RBS.demo.model.Sales;
import com.RBS.demo.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sales")
public class SalesController {

    @Autowired
    private SalesService salesService;

    // Add a new sale
    @PostMapping("/add")
    public Sales addSale(@RequestBody Sales sales) {
        return salesService.addSale(sales);  // Returns the created sale
    }

    // Get all sales
    @GetMapping("/list")
    public List<Sales> findAll() {
        return salesService.findAll();  // Returns the list of all sales
    }
    @GetMapping("/product")
    public List<Sales>findAllByProductId(@RequestParam int productId) {
        return salesService.findAllByProductId(productId);  // Returns the sale with the given ID
    }







    // Delete sale by ID
    @DeleteMapping("/{saleId}")
    public void deleteSaleById(@PathVariable int saleId) {
        salesService.deleteSaleById(saleId);  // Deletes the sale with the given ID
    }

    // Update a sale (Optional - if needed)
    @PutMapping("/update/{saleId}")
    public Sales updateSale(@RequestBody Sales sales, @PathVariable int saleId) {
        return salesService.updateSale(sales, saleId);  // Updates the sale with the given ID and returns the updated sale
    }
}
