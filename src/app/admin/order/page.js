"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { fetchOrderById, fetchOrders, fetchOrdersByStatus, fetchOrdersByUserId } from "@/app/util/api";
import {
  IconButton,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { FilterList, Delete, Edit, RemoveRedEye } from "@mui/icons-material";

// Filter options
const filterOptions = [
  { label: "Order Status", value: "status" },
  { label: "User ID", value: "user_id" },
  { label: "Order ID", value: "order_id" },
];

export default function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const [filterType, setFilterType] = useState("status");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await fetchOrders();
      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const applyFilter = async () => {
    try {
      let response;
      if (filterType === "status") {
        response = await fetchOrdersByStatus(filterValue);
      } else if (filterType === "user_id") {
        response = await fetchOrdersByUserId(filterValue);
      } else if (filterType === "order_id") {
        response = await fetchOrderById(filterValue);
      }
      setOrders(response);
    } catch (error) {
      console.error("Error applying filter:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        padding: 2,
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: 1200,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          padding: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{ color: "#6c5ce7", fontWeight: "bold" }}
        >
          Order Management Dashboard
        </Typography>

        {/* Filter Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TextField
            select
            label="Filter By"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            sx={{ width: "30%" }}
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Filter Value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            sx={{ width: "30%" }}
          />

          <Button
            variant="contained"
            startIcon={<FilterList />}
            onClick={applyFilter}
            sx={{ width: "20%", backgroundColor: "#0984e3" }}
          >
            Apply Filter
          </Button>
        </Box>

        {/* Orders Table */}
        <TableContainer component={Paper} elevation={4}>
          <Table
            sx={{
              minWidth: 650,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
            aria-label="simple table"
          >
            <TableHead
              sx={{
                backgroundColor: "#6c5ce7",
              }}
            >
              <TableRow>
                {["Order ID", "User ID", "Status", "Total Amount", "Action"].map(
                  (header) => (
                    <TableCell
                      key={header}
                      align="right"
                      sx={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f8f9fa",
                    },
                    "&:nth-of-type(even)": {
                      backgroundColor: "#ffffff",
                    },
                    "&:hover": {
                      backgroundColor: "#dfe6e9",
                    },
                  }}
                >
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.user_id}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.total_amount}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      sx={{
                        color: "#6c5ce7",
                        "&:hover": {
                          color: "#5a4dcb",
                        },
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: "#d63031",
                        "&:hover": {
                          color: "#c0392b",
                        },
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: "#0984e3",
                        "&:hover": {
                          color: "#74b9ff",
                        },
                      }}
                    >
                      <RemoveRedEye />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
