package com.RBS.demo.controller;


import com.RBS.demo.model.Product;
import com.RBS.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product){
        return productService.addProduct(product);
    }

    @GetMapping("/list")
    public List<Product> getAll(){
        return productService.getAll();
    }

    @GetMapping("/{pId}")
    public Product getProductById(@PathVariable int pId){
        return productService.getProductById(pId);
    }

    @DeleteMapping("/{pId}")
    public void deleteProductById(@PathVariable int pId){
        productService.deleteProductById(pId);
    }

    @PutMapping("/update/{pId}")
    public Product updateProduct(@RequestBody Product product, @PathVariable int pId){
        return productService.updateProduct(product,pId);
    }
}
