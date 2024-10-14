const express = require("express")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { Name, Email, Password, Type } = req.body;
        
        const existingUser = await User.findOne({ Email: Email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = await User.create({
            Name: Name,
            Email: Email,
            Password: Password,
            UserType: Type
        });

        const payload = {
            id: newUser._id,
            Name: Name,
            Type: Type,
            Email: Email
        };

        const token = jwt.sign(payload, process.env.SECRET);

        res.status(201).json({ 
            message: 'New User registered successfully', 
            user: {
                Name: Name,
                Type: Type,
                token: token
            }
        });
    } catch (error) {
        res.status(500).json({error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Find user by email
        const user = await User.findOne({ Email: Email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check password
        // const isPasswordValid = await bcrypt.compare(Password, user.Password);

        // if (!isPasswordValid) {
        //     return res.status(401).json({ message: "Invalid email or password" });
        // }

        const payload = {
            id: user._id,
            Name: user.Name,
            Type: user.UserType,
            Email: user.Email
        };

        const token = jwt.sign(payload, process.env.SECRET);

        res.status(200).json({ 
            message: 'Login successful', 
            user: {
                Name: user.Name,
                Type: user.UserType,
                token: token
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;