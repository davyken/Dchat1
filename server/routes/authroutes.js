import express from "express";
import { forgotPassword, login ,logout, resetPassword, signup } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/signup", signup); 

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;