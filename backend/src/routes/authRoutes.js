import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// 🔥 TEST (IMPORTANTE)
router.get("/test", (req, res) => {
  res.send("Auth funcionando 🔐");
});

router.post("/register", register);
router.post("/login", login);

export default router;