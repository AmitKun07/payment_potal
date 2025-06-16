const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();

// Fetch Wallet Balance Route
router.get("/balance/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ balance: user.balance });
    } catch (error) {
        console.error("Error fetching wallet balance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Add Funds to Wallet Route
router.post("/add-funds", async (req, res) => {
    const { userId, amount } = req.body;

    try {
        // Validate input
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add funds
        user.balance += amount;
        await user.save();

        res.status(200).json({
            message: "Funds added successfully",
            balance: user.balance
        });
    } catch (error) {
        console.error("Error adding funds:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Deduct Funds from Wallet Route
router.post("/deduct-funds", async (req, res) => {
    const { userId, amount } = req.body;

    try {
        // Validate input.....
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        // Find user......
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check for sufficient balance......
        if (user.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Deduct funds......
        user.balance -= amount;
        await user.save();

        res.status(200).json({
            message: "Funds deducted successfully",
            balance: user.balance
        });
    } catch (error) {
        console.error("Error deducting funds:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;