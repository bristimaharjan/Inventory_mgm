"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { login } from "../util/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
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
    console.log("My data : ", loginData);
    const response = await login(loginData);
    console.log(response);

    if (response.Token) {
      router.push("/");
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #6c5ce7, #74b9ff)",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: 350,
          padding: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
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
              label="Username"
              variant="outlined"
              name="username"
              fullWidth
              value={loginData.username}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#f7f9fc",
                  border: "2px solid #74b9ff",
                  transition: "border-color 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#eef2f6",
                    borderColor: "#00cec9",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#ffffff",
                    borderColor: "#6c5ce7",
                    boxShadow: "0 0 5px 2px rgba(108, 92, 231, 0.3)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#636e72",
                  fontWeight: 500,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#6c5ce7",
                },
              }}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#f7f9fc",
                  border: "2px solid #74b9ff",
                  transition: "border-color 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#eef2f6",
                    borderColor: "#00cec9",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#ffffff",
                    borderColor: "#6c5ce7",
                    boxShadow: "0 0 5px 2px rgba(108, 92, 231, 0.3)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#636e72",
                  fontWeight: 500,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#6c5ce7",
                },
              }}
            />
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "#0984e3",
                    fontWeight: 500,
                  }}
                >
                  Forgot password?
                </a>
              </Typography>
              <Button
                variant="text"
                color="secondary"
                sx={{ textTransform: "none", fontWeight: "bold" }}
              >
                Sign Up
              </Button>
            </Box>
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
    </Box>
  );
}