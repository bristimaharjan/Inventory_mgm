"use client";
import {
  Add,
  ExpandLess,
  ExpandMore,
  ListAlt,
  Logout,
  Menu,
  ShoppingCart,
  Payment,
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

export default function StudentSidebar({ drawerOpen, toggleDrawer }) {
  const [openMenu, setOpenMenu] = useState(false); // State for Menu Management
  const [openOrders, setOpenOrders] = useState(false); // State for Orders menu
  const [openPayment, setOpenPayment] = useState(false); // State for Bill & Payment menu

  const router = useRouter();
  const routToPage = (url) => {
    router.push(url);
  };

  // Toggle the "Menu" menu
  const toggleMenu = () => setOpenMenu(!openMenu);

  // Toggle the "Orders" menu
  const toggleOrders = () => setOpenOrders(!openOrders);

  // Toggle the "Bill & Payment" menu
  const togglePayment = () => setOpenPayment(!openPayment);

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
        {/* Menu Management */}
        <ListItem onClick={toggleMenu}>
          <ListItemIcon>
            <Menu />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Menu" />}
          {openMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }} onClick={() => routToPage("/menu/view")}>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="View Menu" />}
            </ListItem>
            <ListItem sx={{ pl: 4 }} onClick={() => routToPage("/menu/add")}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Add Menu Item" />}
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
            <ListItem sx={{ pl: 4 }} onClick={() => routToPage("/orders/view")}>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="View Orders" />}
            </ListItem>
            <ListItem sx={{ pl: 4 }} onClick={() => routToPage("/orders/delete")}>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Delete Order" />}
            </ListItem>
          </List>
        </Collapse>

        <Divider />

        {/* Bill & Payment */}
        <ListItem onClick={togglePayment}>
          <ListItemIcon>
            <Payment />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Bill & Payment" />}
          {openPayment ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPayment} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }} onClick={() => routToPage("/payment/view")}>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="View Bill" />}
            </ListItem>
            <ListItem sx={{ pl: 4 }} onClick={() => routToPage("/payment/pay")}>
              <ListItemIcon>
                <Payment />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Pay Bill" />}
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
