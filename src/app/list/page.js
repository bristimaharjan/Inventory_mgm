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
  const [editMenuItem, setEditMenuItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

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
      const itemToEdit = await findByItemId(itemId);
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
      const updatedItem = { ...editMenuItem, itemPrice: editMenuItem.itemPrice.toString() };
      await updateMenuItem(updatedItem, editMenuItem.itemId);
      setEditOpen(false);
      getMenuItems();
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6c5ce7, #74b9ff)",
        padding: "20px",
      }}
    >
      <Paper elevation={6} sx={{ padding: "30px", maxWidth: "800px", width: "100%", borderRadius: "10px" }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Menu
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: "20px", display: "block", marginLeft: "auto", marginRight: "auto" }}
          onClick={handleOpenDialog}
        >
          Add Menu Item
        </Button>
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item ID</TableCell>
                <TableCell>Menu Item </TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menuItems.length > 0 ? (
                menuItems.map((menuItem) => (
                  <TableRow key={menuItem.itemId}>
                    <TableCell>{menuItem.itemId}</TableCell>
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
                      <Button variant="contained" color="error" onClick={() => handleDelete(menuItem.itemId)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No menu items available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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
            select
            fullWidth
            variant="outlined"
            value={newMenuItem.itemCategory}
            onChange={handleInputChange}
          >
            {["SNACK", "BEVERAGE", "MEAL", "DESSERT"].map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
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

      {/* Edit Menu Item Dialog */}
      <Dialog open={editOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Menu Item</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"name="itemName"
            label="Item Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editMenuItem?.itemName || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            name="itemCategory"
            label="Item Category"
            select
            fullWidth
            variant="outlined"
            value={editMenuItem?.itemCategory || ""}
            onChange={handleEditInputChange}
          >
            {["SNACK", "BEVERAGE", "MEAL", "DESSERT"].map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            name="itemPrice"
            label="Item Price"
            type="number"
            fullWidth
            variant="outlined"
            value={editMenuItem?.itemPrice || ""}
            onChange={handleEditInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuItemList;
``