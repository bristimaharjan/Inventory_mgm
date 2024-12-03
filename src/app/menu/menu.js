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

export default function Sidebar({ drawerOpen, toggleDrawer }) {
  const [openUser, setOpenUser] = useState(false); // State for User menu
  const [openAttendance, setOpenAttendance] = useState(false); // State for Attendance menu
  // State to control sidebar expansion/collapse
  const router = useRouter();
  const routToPage = (url) => {
    router.push(url);
  };
  // Toggle the "User" menu
  const toggleUserMenu = () => setOpenUser(!openUser);

  // Toggle the "Attendance" menu
  const toggleAttendanceMenu = () => setOpenAttendance(!openAttendance);

  const handleLogout = () => {
    removeToken();
    //router.push("/login");
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
            Canteen management system 
          </Typography>
        )}
      </Box>

      {/* Space before the menu items */}
      <Box sx={{ paddingTop: 4 }} />

      <List>
        {/* User Menu */}
        <ListItem onClick={toggleUserMenu}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="User" />}
          {openUser ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openUser} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon onClick={() => routToPage("/user/add")}>
                <Add />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Add" />}
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon onClick={() => routToPage("/user/list")}>
                <ListAlt />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="List" />}
            </ListItem>
          </List>
        </Collapse>

        <Divider />

        {/* Attendance Menu */}
        <ListItem onClick={toggleAttendanceMenu}>
          <ListItemIcon>
            <AccessTime />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Attendance" />}
          {openAttendance ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAttendance} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Add" />}
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="List" />}
            </ListItem>
          </List>
        </Collapse>
      </List>

      {/* Logout Menu */}
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider />
        <List>
          <ListItem alignItems="right">
            <Logout onClick={handleLogout} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}