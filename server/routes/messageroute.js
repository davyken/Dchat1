// routes/messageRoutes.js
import express from "express";
import { sendMessage, getMessages, markMessageAsRead } from "../controllers/message_controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Get messages for a specific conversation
router.get("/:id", protectRoute, getMessages);

// Send a message to a specific conversation
router.post("/send/:id", protectRoute, sendMessage);

// Mark a message as read
router.post("/:id/read", protectRoute, markMessageAsRead); // New endpoint for marking a message as read

export default router;