import express, { Router } from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup)

router.get("/login", (req, res) => {
    res.send("Login Endpoint");
})

router.get("/logout", (req, res) => {
    res.send("Logut Endpoint");
})

export default router