package com.RBS.demo.service;


import com.RBS.demo.model.Payment;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface PaymentService {
    Payment addPayment(Payment payment);
    List<Payment> getAll();
    Payment getPaymentByOrderid(int id);
    boolean deletePaymentByOrderid(int id);
    BigDecimal getDailySales(LocalDate date);
    BigDecimal getMonthlySales(int month, int year);
    BigDecimal getSalesInDateRange(LocalDate startDate, LocalDate endDate);
}
