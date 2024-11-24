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
  MenuItem,
} from "@mui/material";
import { addMenuItems, fetchMenuItems, deleteMenuItem, updateMenuItem, findByItemId } from "../util/api";

const MenuItemList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    itemName: "",
    itemPrice: "",
    itemCategory: "",
  });
  const [editMenuItem, setEditMenuItem] = useState(null); // State for menu item being edited
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // State for edit dialog

  useEffect(() => {
    getMenuItems();
  }, []);

  const getMenuItems = async () => {
    try {
      const response = await fetchMenuItems();
      setMenuItems(response);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewMenuItem({
      itemName: "",
      itemPrice: "",
      itemCategory: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    newMenuItem.itemPrice = newMenuItem.itemPrice.toString();

    try {
      await addMenuItems(newMenuItem);
      handleCloseDialog();
      getMenuItems();
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteMenuItem(itemId);
      getMenuItems();
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleUpdate = async (itemId) => {
    try {
      // Use findByItemId() to get the menu item to edit
      const itemToEdit = await findByItemId(itemId); // Use API call or logic to find the item
      setEditMenuItem(itemToEdit);
      setEditOpen(true);
    } catch (error) {
      console.error("Error fetching menu item for edit:", error);
    }
  };

  const handleCloseEditDialog = () => {
    setEditOpen(false);
    setEditMenuItem(null);
  };

  const handleSaveEdit = async () => {
    try {
      // Ensure itemPrice is a string for consistency with backend
      const updatedItem = { ...editMenuItem, itemPrice: editMenuItem.itemPrice.toString() };
      
      // Call the update API with the edited item data and itemId
      await updateMenuItem(updatedItem, editMenuItem.itemId);
      setEditOpen(false);
      getMenuItems(); // Refresh menu items after update
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Menu Items</Typography>
      <Button variant="contained" color="primary" sx={{ marginBottom: "20px" }} onClick={handleOpenDialog}>Add Menu Item</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item ID</TableCell> {/* Added column for Item ID */}
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
                  <TableCell>{menuItem.itemId}</TableCell> {/* Display itemId here */}
                  <TableCell>{menuItem.itemName || "No Name"}</TableCell>
                  <TableCell>{menuItem.itemCategory || "No Category"}</TableCell>
                  <TableCell>{`Rs ${menuItem.itemPrice || "N/A"}`}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleUpdate(menuItem.itemId)} sx={{ marginRight: "10px" }}>Update</Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(menuItem.itemId)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No menu items available.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Menu Item Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add Menu Item</DialogTitle>
        <DialogContent>
          <TextField margin="dense" name="itemName" label="Item Name" type="text" fullWidth variant="outlined" value={newMenuItem.itemName} onChange={handleInputChange} />
          <TextField margin="dense" name="itemCategory" label="Item Category" select fullWidth variant="outlined" value={newMenuItem.itemCategory} onChange={handleInputChange}>
            {["SNACK", "BEVERAGE", "MEAL", "DESSERT"].map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </TextField>
          <TextField margin="dense" name="itemPrice" label="Item Price" type="number" fullWidth variant="outlined" value={newMenuItem.itemPrice} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleAdd} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Menu Item Dialog */}
      <Dialog open={editOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Menu Item</DialogTitle>
        <DialogContent>
          <TextField margin="dense" name="itemName" label="Item Name" type="text" fullWidth variant="outlined" value={editMenuItem?.itemName || ""} onChange={handleEditInputChange} />
          <TextField margin="dense" name="itemCategory" label="Item Category" select fullWidth variant="outlined" value={editMenuItem?.itemCategory || ""} onChange={handleEditInputChange}>
            {["SNACK", "BEVERAGE", "MEAL", "DESSERT"].map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </TextField>
          <TextField margin="dense" name="itemPrice" label="Item Price" type="number" fullWidth variant="outlined" value={editMenuItem?.itemPrice || ""} onChange={handleEditInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuItemList;
