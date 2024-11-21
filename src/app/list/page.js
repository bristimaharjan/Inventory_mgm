"use client";

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { fetchMenuItems } from '../util/api';

const MenuItemList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const getMenuItems = async () => {
      try {
        const response = await fetchMenuItems();
        console.log('Fetched menu items:', response); // Log the response to inspect the data structure
        setMenuItems(response); // Ensure menuItems is correctly set
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    getMenuItems();
  }, []);

  const handleUpdate = (id) => {
    console.log(`Update menu item with ID: ${id}`);
    // Add update logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete menu item with ID: ${id}`);
    setMenuItems((prevMenuItems) => prevMenuItems.filter((menuItem) => menuItem.itemId !== id));
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Menu Items
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: '20px' }}
      >
        Add Menu Item
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Menu Item Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.length > 0 ? (
              menuItems.map((menuItem) => (
                <TableRow key={menuItem.itemId}>
                  <TableCell>{menuItem.itemName || 'No Name'}</TableCell>   {/* Changed item_name to itemName */}
                  <TableCell>{menuItem.itemCategory || 'No Category'}</TableCell> {/* Changed item_category to itemCategory */}
                  <TableCell>{`Rs ${menuItem.itemPrice || 'N/A'}`}</TableCell> {/* Changed item_price to itemPrice */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(menuItem.itemId)}
                      sx={{ marginRight: '10px' }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(menuItem.itemId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No menu items available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MenuItemList;
