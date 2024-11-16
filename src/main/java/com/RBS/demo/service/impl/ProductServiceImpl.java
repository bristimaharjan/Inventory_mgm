package com.RBS.demo.service.impl;

import com.RBS.demo.model.Product;
import com.RBS.demo.repository.ProductRepository;
import com.RBS.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(int pId) {
        Optional<Product> optionalProduct = productRepository.findById(pId);
        Product product = optionalProduct.orElseThrow((() -> new RuntimeException("Product not found")));
        return product;
    }

    @Override
    public void deleteProductById(int pId) {
        getProductById(pId);
        productRepository.deleteById(pId);
    }

    @Override
    public Product updateProduct(Product product, int pId) {
        getProductById(pId);
        product.setpId(pId);
        return productRepository.save(product);
    }

    @Override
    public Product findByPName(String pName) {
        return productRepository.findByPName(pName);
    }
}
