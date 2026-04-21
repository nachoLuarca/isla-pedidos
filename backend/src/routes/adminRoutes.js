import express from "express";
import {
  getUsers,
  updateUserRole,
  deleteUser
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// 🔐 SOLO ADMIN
router.get("/users", authMiddleware, roleMiddleware(["admin"]), getUsers);

router.put(
  "/users/:id/role",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateUserRole
);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteUser
);

export default router;