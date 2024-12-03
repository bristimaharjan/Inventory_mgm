"use client";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Homepage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuthenticated(true);
      router.push("/menu/menu"); // Redirect to menu if authenticated
    }
  }, [router]);



  return (
    <html>
      <body>
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
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#26a69a" }}
      >
        Welcome to the Canteen Management System!
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Simplify ordering, streamline inventory, and optimize operations for a
        seamless canteen experience.
      </Typography>

      {/* Separate Login and Sign Up Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/login")} // Navigate to Login Page
          sx={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push("/signup")} // Navigate to Sign Up Page
          sx={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Sign Up
        </Button>
      </Box>

      {/* Grid for Card Layout */}
      <Grid container spacing={4} justifyContent="center">
        {/* Card 1: Delicious Meals */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: "#e0f2f1",
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
                objectFit: "cover",
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
        </Grid>

        {/* Card 2: Modern Canteen Facilities */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: "#e0f2f1",
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
                objectFit: "cover",
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
        </Grid>

        {/* Card 3: Refreshing Beverages */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: "#e0f2f1",
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
                objectFit: "cover",
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
        </Grid>

        {/* Card 4: Delicious Desserts */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: "#e0f2f1",
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
                objectFit: "cover",
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
        </Grid>
      </Grid>
    </Box>
      </body>
    </html>
    
  );
}
