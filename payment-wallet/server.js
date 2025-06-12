const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");

const app = express();

// Middleware
app.use(express.json()); // To parse JSON data
app.use(cors());         // To allow cross-origin requests

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/wallet", walletRoutes);    // Wallet routes

// Database Connection
mongoose.connect("mongodb+srv://Intern:Intern%40Amit@cluster0.lurgvcb.mongodb.net/digital-wallet")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Database connection failed:", err));

// Start Server
const PORT = process.env.PORT || 5001; // Dynamically choose a port or default to 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));` `