import path from "path";  
import express from "express";  
import dotenv from "dotenv";  
import cookieParser from "cookie-parser";  
import { OAuth2Client } from "google-auth-library"; // Importing OAuth2Client  
import jwt from "jsonwebtoken";  
import multer from "multer";  
import cloudinary from 'cloudinary';  

// Import your routes  
import authRoutes from "./routes/authroutes.js";  
import messageRoutes from "./routes/messageroute.js";  
import userRoutes from "./routes/user_routes.js";  

import connectToMongoDB from "./db/connectToMongoDB.js";  
import { app, server } from "./socket/socket.js";  
import User from "./models/user_model.js";  

// Load environment variables  
dotenv.config();  

const __dirname = path.resolve();  
const PORT = process.env.PORT || 5000;  

// Create an instance of OAuth2Client  
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Make sure you set GOOGLE_CLIENT_ID in your .env file  

// Configure Cloudinary  
cloudinary.v2.config({  
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY,  
    api_secret: process.env.CLOUDINARY_API_SECRET,  
});  

// Middleware  
app.use(express.json());  
app.use(cookieParser());  

// Set up multer for handling file uploads  
const storage = multer.diskStorage({  
    destination: (req, file, cb) => {  
        cb(null, 'uploads/'); // Ensure this directory exists  
    },  
    filename: (req, file, cb) => {  
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid name collisions  
    }  
});  
const upload = multer({ storage });  

// Generate JWT Token  
const generateToken = (userId) => {  
    return jwt.sign({ userId }, process.env.JWT_SECRET, {  
        expiresIn: "15d",  
    });  
};  

// Set cookie  
const generateTokenAndSetCookie = (userId, res) => {  
    const token = generateToken(userId);  
    res.cookie("jwt", token, {  
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days  
        httpOnly: true,  
        sameSite: "strict",  
        secure: process.env.NODE_ENV !== "development",  
    });  
    return token;  
};  

// Endpoint for Google authentication  
app.post("/api/auth/google", async (req, res) => {  
    try {  
        const { credential } = req.body;  

        const ticket = await googleClient.verifyIdToken({  
            idToken: credential,  
            audience: process.env.GOOGLE_CLIENT_ID,  
        });  

        const payload = ticket.getPayload();  
        const { sub: googleId, email, name, picture } = payload;  

        // Check if user exists  
        let user = await User.findOne({ email });  

        if (!user) {  
            // Create new user if doesn't exist  
            user = await User.create({  
                fullName: name,  
                email,  
                googleId,  
                profilePic: picture,  
                password: "", // Empty password for Google auth users  
                gender: "N/A", // Default value, can be updated later  
            });  
        }  

        // Generate token and set cookie  
        const token = generateTokenAndSetCookie(user._id, res);  

        res.status(200).json({  
            token,  
            user: {  
                _id: user._id,  
                fullName: user.fullName,  
                email: user.email,  
                profilePic: user.profilePic,  
                gender: user.gender,  
            },  
        });  
    } catch (error) {  
        console.error("Error in Google authentication:", error);  
        res.status(500).json({  
            error: "Authentication failed",  
            details: process.env.NODE_ENV === "development" ? error.message : undefined,  
        });  
    }  
});  

// File upload route  
app.post("/api/upload", upload.single('file'), async (req, res) => {  
    try {  
        if (req.file) {  
            // Upload to Cloudinary  
            const result = await cloudinary.v2.uploader.upload(req.file.path);  
            
            // Optionally save the URL to MongoDB  
            // await YourModel.create({ imageUrl: result.secure_url });  

            return res.status(200).json({ fileUrl: result.secure_url });  
        }  
        return res.status(400).send("File upload failed");  
    } catch (error) {  
        console.error("Cloudinary upload error:", error);  
        return res.status(500).send("Error uploading file");  
    }  
});  

// Your existing routes  
app.use("/api/auth", authRoutes);  
app.use("/api/messages", messageRoutes);  
app.use("/api/users", userRoutes);  

// Serve static files  
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  

// Ensure the index.html file is served correctly  
app.use(express.static(path.join(__dirname, "client", "dist")));  
app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"), (err) => {  
        if (err) {  
            res.status(err.status).end();  
        }  
    });  
});  

// Start the server  
server.listen(PORT, () => {  
    connectToMongoDB();  
    console.log(`Server Running on port ${PORT}`);  
});