import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// 🔐 SOLO ADMIN
router.post("/", authMiddleware, roleMiddleware(["admin"]), createProduct);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteProduct);

// 🔓 PUBLICAS
router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;