"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { login } from "../util/api";
import { useRouter } from "next/navigation";

export default function Login() {
  // State for login data
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  // State for errors
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    // Clear errors for the field being updated
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {};

    // Username validation
    if (!loginData.username.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    // Password validation
    if (!loginData.password || loginData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    // If validation fails, update the errors state
    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, proceed with login
    console.log("Login Data:", loginData);
    const response = await login (loginData);
    console.log(response);
    if(response.success){
      router.push("/list");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="blue"
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius={3}
        boxShadow={3}
        width={400}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {/* Username Field */}
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          fullWidth
          value={loginData.username}
          margin="normal"
          onChange={handleChange}
          error={Boolean(errors.username)}
          helperText={errors.username}
        />

        {/* Password Field */}
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          fullWidth
          value={loginData.password}
          margin="normal"
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />

        {/* Forgot Password & Sign Up */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">
            <a href="#" style={{ textDecoration: "none", color: "#6c5ce7" }}>
              Forgot password? Click here!
            </a>
          </Typography>
          <Button variant="text" color="primary">
            Sign Up
          </Button>
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
