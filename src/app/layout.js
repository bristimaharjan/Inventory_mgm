"use client";
import { Box, CssBaseline } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
//import Sidebar from "./menu/menu";
import { isTokenValid, removeToken } from "./util/authUtil";
import Homepage from "./homepage"; // Import Homepage component
import AdminSidebar from "./admin/page";
import StudentSidebar from "./student/page"; 

// This layout will be used across all pages of the app
export default function Layout({ children }) {


  const [isAuthenticated, setIsAuthenticated] = useState(null); // Use null as the initial state
  const [drawerOpen, setDrawerOpen] = useState(true); // Keep this hook at the top level
  const [role, setRole] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  // Validate token to check if the user is authenticated
  const validateToken = () => {
    const token = localStorage.getItem("authToken");
    if (isTokenValid(token)) {
      setIsAuthenticated(true);
      console.log("Authenticated");
    } else {
      setIsAuthenticated(false);
      removeToken();
    }
  };

  useEffect(() => {
    validateToken();
  }, [pathname]);
 
  useEffect(() => {
    // Retrieve user role from localStorage (or you can use an API call to get it)
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);



  // If the user is not authenticated, handle the homepage and login routing
  if (!isAuthenticated) {
    if (pathname === "/") {
      return <Homepage />; // Show the Homepage for the root URL
    } 
  }

  return (
    <html>
      <body>

      <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      <CssBaseline />
      
      {/* Conditionally render the sidebar based on the user's role */}
      {role === "admin" ? (
        <AdminSidebar drawerOpen={true} toggleDrawer={() => {}} />
      ) : role === "student" ? (
        <StudentSidebar drawerOpen={true} toggleDrawer={() => {}} />
      ) : (
        <div>Loading...</div> // Show loading state while fetching user role
      )
      }

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: role === "admin" || role === "student" ? "240px" : "60px", // Sidebar width adjustment
          transition: "margin-left 0.3s ease", // Smooth transition for sidebar toggle
          padding: 2, // Add padding for inner content
        }}
      >
        {children}
      </Box>
    </Box>
      </body>
    </html>
  );
}