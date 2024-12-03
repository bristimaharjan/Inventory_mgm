import axios from "axios";
import { getToken, saveToken } from "./authUtil";

const API_BASE_URL = "http://localhost:8080";

export async function makeApiCall(endpoint, method = "GET", body = null) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers,
    };

    if (body) {
      config.data = body;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error in API call to ${endpoint}:`, error);

    // Check if the error is a response error
    if (error.response) {
      throw new Error(error.response.data.message || "API error");
    } else {
      throw new Error(error.message);
    }
  }
}

export function getUsers(){
    return makeApiCall("/users/list", "GET");
}

export async function login(data) {
    console.log("Making api call");
    const response = await makeApiCall("/auth/login", "POST", data);
    saveToken(response.Token);
    return response;
    
}

export async function deleteUser(id) {
    return await makeApiCall(`/users/${id}`,"DELETE");
    
}
export async function addUser(User){
  console.log("Adding user to database");
  return await makeApiCall("/users/add","POST",User);
}

export async function fetchMenuItems() {
    console.log("Fetching menu items");
    return await makeApiCall("/menu_items/list", "GET");
}

export async function addMenuItems(MenuItem){
    console.log("Adding menu items");
    return await makeApiCall("/menu_items/add","POST",MenuItem);
}

export async function deleteMenuItem(itemId) {
    console.log("Deleting menu items");
    return await makeApiCall(`/menu_items/${itemId}`,"DELETE");
    
}

export async function updateMenuItem(MenuItem, itemId) {
    console.log("Updating menu items");
    return await makeApiCall(`/menu_items/${itemId}`, "PUT", MenuItem);
}

export async function findByItemId  (itemId) {
    return await makeApiCall(`/menu_items/${itemId}`, "GET");
}
export async function fetchOrders() {
  return await makeApiCall("/orders/list", "GET");
}
export async function fetchOrdersByStatus(status) {
  return await makeApiCall(`/orders/status/${status}`, "GET");
}
export async function fetchOrdersByUserId(userId) {
  return await makeApiCall(`/orders/user/${userId}`, "GET");
}
export async function fetchOrderById(orderId) {
  return await makeApiCall(`/orders/${orderId}`, "GET");
}
