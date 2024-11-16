package com.RBS.demo.service;

import com.RBS.demo.model.Product;

import java.util.List;


public interface ProductService {
    Product addProduct(Product product);
    List<Product> getAll();
    Product getProductById(int pId);
    void deleteProductById(int pId);
    Product updateProduct(Product product, int pId);
    Product findByPName(String pName);
}
