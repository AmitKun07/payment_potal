const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Sign-Up Route
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Input Validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password (for validation)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, balance: 0 });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Input Validation
    if (!email || !password) {
        return res.status(400).json({ message: "Both email and password are required" });
    }

    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Exclude sensitive data from response
        const { _id, name, email: userEmail, balance } = user;
        res.status(200).json({
            message: "Login successful",
            user: {
                _id,
                name,
                email: userEmail,
                balance
            }
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;