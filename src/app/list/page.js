"use client";

import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { addMenuItems, fetchMenuItems, deleteMenuItem, updateMenuItem } from "../util/api";

const MenuItemList = () => {
  const [menuItems, setMenuItems] = useState([]); // State to store menu items
  const [newMenuItem, setNewMenuItem] = useState({
    itemName: "",
    itemPrice: "",
    itemCategory: "",
    
  }); // State for new menu item
  const [open, setOpen] = useState(false); // Dialog open state

  // Fetch menu items on component load
  useEffect(() => {
    getMenuItems();
  }, []);
  const getMenuItems = async () => {
    try {
      const response = await fetchMenuItems();
      console.log('Fetched menu items:', response); // Log the response to inspect the data structure
      setMenuItems(response); // Ensure menuItems is correctly set
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  // Handle opening the dialog
  const handleOpenDialog = () => {
    setOpen(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setOpen(false);
    setNewMenuItem({
      itemName: "",
      itemPrice: "",
      itemCategory: "",
    }); // Reset new menu item state
  };

  // Handle input changes for new menu item
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new menu item
  
    const handleAdd = async () => {
      // Ensure itemPrice is sent as a string or number that BigDecimal can interpret
      newMenuItem.itemPrice = newMenuItem.itemPrice.toString(); // Ensure it's sent as a string
  
      try {
          console.log("Sending new menu item:", newMenuItem); // Log to check the format
          const response = await addMenuItems(newMenuItem);
          console.log("Menu item added:", response);
          handleCloseDialog();
          getMenuItems(); // Refresh the list
      } catch (error) {
          console.error("Error adding menu item:", error);
      }
  };
  
  

  // Handle deleting a menu item
  const handleDelete = async (itemId) => {
    try {
      const response = await deleteMenuItem(itemId); // Call API to delete menu item
      console.log("Menu item deleted:", response);
      getMenuItems(); // Refresh the menu items list
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  // Handle updating a menu item (stub for now)
  const handleUpdate = async (itemId) => {
    try {
      const response = await updateMenuItem(itemId); // Call API to delete menu item
      console.log("Menu item has been updated:", response);
      getMenuItems(); // Refresh the menu items list
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };


  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Menu Items
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: "20px" }}
        onClick={handleOpenDialog}
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
                  <TableCell>{menuItem.itemName || "No Name"}</TableCell>
                  <TableCell>{menuItem.itemCategory || "No Category"}</TableCell>
                  <TableCell>{`Rs ${menuItem.itemPrice || "N/A"}`}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(menuItem.itemId)}
                      sx={{ marginRight: "10px" }}
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

      {/* Add Menu Item Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add Menu Item</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="itemName"
            label="Item Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newMenuItem.itemName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="itemCategory"
            label="Item Category"
            type="text"
            fullWidth
            variant="outlined"
            value={newMenuItem.itemCategory}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="itemPrice"
            label="Item Price"
            type="number"
            fullWidth
            variant="outlined"
            value={newMenuItem.itemPrice}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuItemList;
