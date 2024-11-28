"use client";
import {
  Box,
  CssBaseline,
  Typography,
  Button,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isTokenValid, removeToken } from "./util/authUtil";

export default function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Validate token on mount or when pathname changes
  const validateToken = () => {
    const token = localStorage.getItem("authToken");
    if (isTokenValid(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      removeToken();
      router.push("/login");
    }
  };

  useEffect(() => {
    validateToken();
  }, [pathname]);

  // Sidebar state
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <html>
      <body>
        <CssBaseline />
        <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
          {/* Sidebar */}
          {isAuthenticated && (
            <Box
              sx={{
                width: drawerOpen ? "320px" : "100px", // Increased sidebar width
                backgroundColor: "#00796b", // Teal color that complements blue
                color: "white",
                transition: "width 0.3s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 2,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Sidebar Title */}
              <Typography
                variant="h6"
                sx={{
                  marginBottom: 3,
                  textAlign: "center",
                  fontWeight: "bold",
                  visibility: drawerOpen ? "visible" : "hidden",
                }}
              >
                🍴 Canteen Management
              </Typography>

              {/* Login and Signup Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                  paddingX: drawerOpen ? 2 : 1,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => router.push("/login")}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    backgroundColor: "#4db6ac", // Light teal color
                    ":hover": {
                      backgroundColor: "#009688", // Darker teal on hover
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  onClick={() => router.push("/signup")}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "#ffffff",
                    borderColor: "#ffffff",
                    ":hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          )}

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              marginLeft: drawerOpen ? "320px" : "100px", // Adjust margin according to new sidebar width
              transition: "margin-left 0.3s ease",
              padding: 4,
              backgroundColor: "#fafafa", // Soft beige background
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "1000px",  // Increased max width
              width: "100%",  // Set width to 100% of the max width
            }}
          >
            {pathname === "/" ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 4,
                  padding: 4,
                  backgroundColor: "white",
                  borderRadius: 2,
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                  width: "100%",  // Ensure full width within the maxWidth
                  height: "auto", // Adjust height to auto or set a fixed height
                  minHeight: "500px", // You can change this value to make it taller
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#26a69a" }}
                >
                  Welcome to the Canteen Management System!
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Simplify ordering, streamline inventory, and optimize
                  operations for a seamless canteen experience.
                </Typography>

                {/* Static Images */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {/* Food Image */}
                  <Box
                    sx={{
                      width: "300px",
                      padding: 2,
                      backgroundColor: "#e0f2f1", // Light teal background
                      borderRadius: 2,
                      textAlign: "center",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src="/images/food.jpg"
                      alt="Food"
                      style={{
                        width: "100%",
                        height: "150px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: "#26a69a", fontWeight: "bold" }}
                    >
                      Delicious Meals
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Enjoy a variety of tasty dishes!
                    </Typography>
                  </Box>

                  {/* Canteen Image */}
                  <Box
                    sx={{
                      width: "300px",
                      padding: 2,
                      backgroundColor: "#e0f2f1", // Light teal background
                      borderRadius: 2,
                      textAlign: "center",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src="/images/canteen.jpg"
                      alt="Canteen"
                      style={{
                        width: "100%",
                        height: "150px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: "#26a69a", fontWeight: "bold" }}
                    >
                      Modern Canteen Facilities
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Experience our clean and modern space.
                    </Typography>
                  </Box>

                  {/* Beverages Image */}
                  <Box
                    sx={{
                      width: "300px",
                      padding: 2,
                      backgroundColor: "#e0f2f1", // Light teal background
                      borderRadius: 2,
                      textAlign: "center",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src="/images/beverages.jpg"
                      alt="Beverages"
                      style={{
                        width: "100%",
                        height: "150px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: "#26a69a", fontWeight: "bold" }}
                    >
                      Refreshing Beverages
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Enjoy a selection of refreshing drinks.
                    </Typography>
                  </Box>

                  {/* Desserts Image */}
                  <Box
                    sx={{
                      width: "300px",
                      padding: 2,
                      backgroundColor: "#e0f2f1", // Light teal background
                      borderRadius: 2,
                      textAlign: "center",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src="/images/desserts.jpg"
                      alt="Desserts"
                      style={{
                        width: "100%",
                        height: "150px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: "#26a69a", fontWeight: "bold" }}
                    >
                      Delicious Desserts
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Satisfy your sweet tooth with our desserts.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              children
            )}
          </Box>
        </Box>
      </body>
    </html>
  );
}
