package com.RBS.demo.controller;

import com.RBS.demo.model.MenuItem;
import com.RBS.demo.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu_items")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @PostMapping("/add")
    public MenuItem addMenuItem(@RequestBody MenuItem menuItem){
        return menuItemService.addMenuItem(menuItem);
    }

    @GetMapping("/list")
    public List<MenuItem> getAll(){
        return menuItemService.getAll();
    }

    @GetMapping("/{itemId}")
    public MenuItem getMenuItemById(@PathVariable int itemId){
        return menuItemService.getMenuItemById(itemId);
    }

    @DeleteMapping("/{itemId}")
    public void deleteMenuItemById(@PathVariable int itemId){
        menuItemService.deleteMenuItemById(itemId);
    }

    @PutMapping("/update/{itemId}")
    public MenuItem updateMenuItem(@RequestBody MenuItem menuItem, @PathVariable int itemId){
        return menuItemService.updateMenuItem(menuItem,itemId);
    }
}