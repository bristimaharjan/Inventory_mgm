package com.RBS.demo.service.impl;


import com.RBS.demo.model.MenuItem;
import com.RBS.demo.repository.MenuItemRepository;
import com.RBS.demo.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuItemServiceImpl implements MenuItemService {
    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public MenuItem addMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    @Override
    public List<MenuItem> getAll() {
        return menuItemRepository.findAll();
    }

    @Override
    public MenuItem getMenuItemById(int itemId) {
        Optional<MenuItem> optionalMenuItem = menuItemRepository.findById(itemId);
        MenuItem menuItem = optionalMenuItem.orElseThrow((() -> new RuntimeException("Item not found")));
        return menuItem;
    }

    @Override
    public void deleteMenuItemById(int itemId) {
        getMenuItemById(itemId);
        menuItemRepository.deleteById(itemId);
    }

    @Override
    public MenuItem updateMenuItem(MenuItem menuItem, int itemId) {
        getMenuItemById(itemId);
        menuItem.setItemId(itemId);
        return menuItemRepository.save(menuItem);
    }
}
