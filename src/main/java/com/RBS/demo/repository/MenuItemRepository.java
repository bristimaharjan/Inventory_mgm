package com.RBS.demo.repository;


import com.RBS.demo.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {
    MenuItem findByItemName(String itemName);
}
