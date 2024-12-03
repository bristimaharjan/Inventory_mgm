package com.RBS.demo.controller;
import com.RBS.demo.model.Payment;
import com.RBS.demo.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/add")
    public Payment addPayment(@RequestBody Payment payment){
        return paymentService.addPayment(payment);
    }

    @GetMapping("/list")
    public List<Payment> getAll(){
        return paymentService.getAll();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable int id){
        return paymentService.getPaymentByOrderid(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaymentByOrderId(@PathVariable int id) {
        boolean isDeleted = paymentService. deletePaymentByOrderid(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build(); // 204 No Content if deletion is successful
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found if payment not found
        }
    }

    // Get total sales for a specific day
    @GetMapping("/daily")
    public BigDecimal getDailySales(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return paymentService.getDailySales(date);
    }

    @GetMapping("/monthly")
    public BigDecimal getMonthlySales(@RequestParam("month") int month, @RequestParam("year") int year) {
        return paymentService.getMonthlySales(month, year);
    }

    @GetMapping("/range")
    public BigDecimal getSalesInDateRange(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return paymentService.getSalesInDateRange(startDate, endDate);
    }

}
