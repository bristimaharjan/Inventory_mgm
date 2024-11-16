package com.RBS.demo.controller;

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
    public List<Sales> getAllSales() {
        return salesService.getAllSales();  // Returns the list of all sales
    }

    // Get sale by ID
    @GetMapping("/{saleId}")
    public Sales getSaleById(@PathVariable int saleId) {
        return salesService.getSaleById(saleId);  // Returns the sale with the given ID
    }

    // Get sales by product name
    @GetMapping("/product/{pName}")
    public List<Sales> getSalesByProductName(@PathVariable String pName) {
        return salesService.getSalesByProductName(pName);  // Returns sales for the given product name
    }

    // Get sales by category
    @GetMapping("/category/{category}")
    public List<Sales> getSalesByCategory(@PathVariable String category) {
        return salesService.getSalesByCategory(category);  // Returns sales for the given category
    }

    // Get count of sales for a specific product ID
    @GetMapping("/count/{pId}")
    public long countSalesByProductId(@PathVariable int pId) {
        return salesService.countSalesByProductId(pId);  // Returns the count of sales for the given product ID
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
