"use client";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { login } from "../util/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [errorDialogOpen, setErrorDialogOpen] = useState(false); // Track error dialog visibility
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data: ", loginData);

    try {
      const response = await login(loginData);
      console.log("API Response: ", response);

      if (response?.Token) {
        const normalizedRole = loginData.role.toLowerCase(); // Normalize role to lowercase

        if (normalizedRole === "admin") {
          router.push("/admin");
        } else if (normalizedRole === "student") {
          router.push("/student");
        } else {
          alert("Invalid role! Please enter 'Admin' or 'Student'.");
        }
      } else {
        setErrorDialogOpen(true); // Show error dialog on failed login
      }
    } catch (error) {
      console.error("Login Error: ", error);
      setErrorDialogOpen(true); // Show error dialog on error
    }
  };

  const handleDialogClose = () => {
    setErrorDialogOpen(false); // Close the dialog
  };

  const handleSignUpRedirect = () => {
    router.push("/signup"); // Navigate to the signup page
  };

  return (
    <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url('/images/background.jpg')", // High-resolution image
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    imageRendering: "auto", // Ensures clarity
  }}
>
  <Box
    sx={{
      width: 350,
      padding: 4,
      borderRadius: 3,
      backgroundColor: "rgba(255, 255, 255, 0.95)", // Reduce transparency
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      // backdropFilter: "blur(10px)", // Remove or reduce this to sharpen background
    }}
  >
        <Typography variant="h4" gutterBottom textAlign="center" color="primary">
          Welcome Back!
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          gutterBottom
          sx={{ color: "#636e72" }}
        >
          Login to continue to your dashboard.
        </Typography>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              label="Role (Admin/Student)"
              variant="outlined"
              name="role"
              fullWidth
              value={loginData.role}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              fullWidth
              value={loginData.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              fullWidth
              type="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#6c5ce7",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#5a4dcb",
                },
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Login Failed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The username or password is incorrect, or the user is not registered. Would you like to sign up?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSignUpRedirect} color="primary" variant="contained">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
