package com.RBS.demo.repository;

import com.RBS.demo.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findByOrder_id(int id);

    @Query("SELECT SUM(p.amountPaid) FROM Payment p WHERE DATE(p.paymentDate) = :date")
    BigDecimal calculateDailySales(@Param("date") LocalDate date);

    @Query("SELECT SUM(p.amountPaid) FROM Payment p WHERE FUNCTION('MONTH', p.paymentDate) = :month AND FUNCTION('YEAR', p.paymentDate) = :year")
    BigDecimal calculateMonthlySales(@Param("month") int month, @Param("year") int year);

    // Sales in a date range
    @Query("SELECT COALESCE(SUM(p.amountPaid), 0) FROM Payment p WHERE p.paymentDate BETWEEN :startDate AND :endDate")
    BigDecimal calculateSalesInDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
