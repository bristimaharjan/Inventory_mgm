"use client";
import {
  AccessTime,
  Add,
  ExpandLess,
  ExpandMore,
  ListAlt,
  Logout,
  Menu,
  Person,
  Fastfood, // For Canteen Menu Management
  ShoppingCart, // For Orders
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { removeToken } from "../util/authUtil";

export default function AdminSidebar({ drawerOpen, toggleDrawer }) {
  const [openUser, setOpenUser] = useState(false); // State for User menu
  const [openMenu, setOpenMenu] = useState(false); // State for Canteen Menu
  const [openOrders, setOpenOrders] = useState(false); // State for Orders menu

  const router = useRouter();
  const routToPage = (url) => {
    router.push(url);
  };

  // Toggle the "User" menu
  const toggleUserMenu = () => setOpenUser(!openUser);

  // Toggle the "Menu" menu
  const toggleMenu = () => setOpenMenu(!openMenu);

  // Toggle the "Orders" menu
  const toggleOrders = () => setOpenOrders(!openOrders);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerOpen ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerOpen ? 240 : 60,
          boxSizing: "border-box",
          transition: "width 0.3s ease", // Smooth transition for expansion
        },
      }}
    >
      <Box
        sx={{
          width: drawerOpen ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerOpen ? 240 : 60,
            boxSizing: "border-box",
            transition: "width 0.3s",
          },
        }}
      >
        {/* Hamburger menu (three lines) */}
        <IconButton
          onClick={toggleDrawer}
          sx={{ display: "block", marginBottom: 2 }}
        >
          <Menu />
        </IconButton>

        {/* Project Name */}
        {drawerOpen && (
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Canteen Management System
          </Typography>
        )}
      </Box>

      {/* Space before the menu items */}
      <Box sx={{ paddingTop: 4 }} />

      <List>
        {/* User Management Menu */}
        <ListItem onClick={toggleUserMenu}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="User Management" />}
          {openUser ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openUser} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }} onClick={() => routToPage("/user/add")}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Add User" />}
            </ListItem>
            <ListItem sx={{ pl: 4 }} onClick={() => routToPage("/user/list")}>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="List Users" />}
            </ListItem>
          </List>
        </Collapse>

        <Divider />

        {/* Canteen Menu Management */}
        <ListItem onClick={toggleMenu}>
          <ListItemIcon>
            <Fastfood />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Menu Management" />}
          {openMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }} onClick={() => routToPage("/menu/add")}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Add Menu Item" />}
            </ListItem>
            <ListItem sx={{ pl: 4 }} onClick={() => routToPage("/menu/list")}>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Menu List" />}
            </ListItem>
          </List>
        </Collapse>

        <Divider />

        {/* Orders Management */}
        <ListItem onClick={toggleOrders}>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Orders" />}
          {openOrders ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openOrders} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }} onClick={() => routToPage("/orders/pending")}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Pending Orders" />}
            </ListItem>
            <ListItem sx={{ pl: 4 }} onClick={() => routToPage("/orders/history")}>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Order History" />}
            </ListItem>
          </List>
        </Collapse>

        <Divider />
      </List>

      {/* Logout Button */}
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider />
        <List>
          <ListItem alignItems="right" onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Logout" />}
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
