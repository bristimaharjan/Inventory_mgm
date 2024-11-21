"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getUsers } from "../util/api";

export default function SignUp() {
  // State to handle form data and validation errors
  const [signUpData, setSignUpData] = useState({
    name: "",
    role:"",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });

    // Reset errors for the current field
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};

    // Validate email
    if (!signUpData.email.endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com";
      valid = false;
    }

    // Validate password length
    if (signUpData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    // If validation fails, set errors and return
    if (!valid) {
      setErrors(newErrors);
      return;
    }

    console.log("Sign Up Data:", signUpData);
    const response = await getUsers (signUpData);
    console.log(response);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "blue",
        padding: 2,
      }}
    >
      <Box
        bgcolor="white"
        p={5}
        borderRadius={4}
        boxShadow={4}
        width={400}
      >
        <Typography variant="h4" color="black" align="center" gutterBottom>
          Sign Up
        </Typography>

        {/* Name Field */}
        <TextField
          label="FirstName"
          name="name"
          variant="outlined"
          value={signUpData.name}
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
           <TextField
          label="LastName"
          name="name"
          variant="outlined"
          value={signUpData.name}
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
         {/* Username Field */}
         <TextField
          label="UserRole"
          variant="outlined"
          name="role"
          fullWidth
          value={signUpData.role}
          margin="normal"
          onChange={handleChange}
          error={Boolean(errors.role)}
          helperText={errors.role}
        />

        {/* Email Field */}
        <TextField
          label="Email ID"
          name="email"
          variant="outlined"
          value={signUpData.email}
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
         {/* Username Field */}
         <TextField
          label="Username"
          variant="outlined"
          name="username"
          fullWidth
          value={signUpData.username}
          margin="normal"
          onChange={handleChange}
          error={Boolean(errors.username)}
          helperText={errors.username}
        />


        {/* Password Field */}
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          value={signUpData.password}
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />

        {/* Action Buttons */}
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
          <Typography variant="body2">
            <a href="#" style={{ textDecoration: "none", color: "#6c5ce7" }}>
              Already have an account? Login here!
            </a>
          </Typography>
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
