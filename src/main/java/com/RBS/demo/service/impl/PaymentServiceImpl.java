package com.RBS.demo.service.impl;
import com.RBS.demo.model.Payment;
import com.RBS.demo.repository.PaymentRepository;
import com.RBS.demo.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Override
    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentByOrderid(int id) {
        List<Payment> payments = paymentRepository.findByOrder_id(id); // Find list of payments by orderId
        return payments.stream()
                .findFirst() // Get the first payment if exists
                .orElseThrow(() -> new RuntimeException("Payment not found for Order ID: " + id)); // Throw exception if no payment found
    }

    @Override
    public boolean deletePaymentByOrderid(int id) {
        // Fetch the payment to ensure it exists
        Payment payment = getPaymentByOrderid(id);
        paymentRepository.delete(payment);
        return true;
    }

    @Override
    //Get sales for a specific day
    public BigDecimal getDailySales(LocalDate date) {
        BigDecimal sales = paymentRepository.calculateDailySales(date);
        return sales != null ? sales : BigDecimal.ZERO; // Return 0 if no sales    }
    }

    @Override
    //Get sales for a specific month
    public BigDecimal getMonthlySales(int month, int year) {
        BigDecimal sales = paymentRepository.calculateMonthlySales(month, year);
        return sales != null ? sales : BigDecimal.ZERO; // Return 0 if no sales
    }

    @Override
    public BigDecimal getSalesInDateRange(LocalDate startDate, LocalDate endDate) {
        BigDecimal sales = paymentRepository.calculateSalesInDateRange(startDate, endDate);
        return sales != null ? sales : BigDecimal.ZERO;    }
}
