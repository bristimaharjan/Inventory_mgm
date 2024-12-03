"use client";
import { useEffect, useState } from "react";
import Homepage from "./homepage";

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initial state as null

  useEffect(() => {
    // Check authentication status on the client
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Set true if token exists, false otherwise
  }, []);

  // While waiting for authentication status, render nothing or a loader
  //if (isAuthenticated === null) {
    //return <div>Loading...</div>; // Replace with a spinner/loader if needed
  //}

  // If not authenticated, render Homepage
  if (!isAuthenticated) {
    return <Homepage />;
  }

  // If authenticated, render Dashboard
  return <div>Welcome to the Dashboard!</div>;
}
