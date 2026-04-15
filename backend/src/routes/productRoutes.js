import express from "express";
import Product from "../models/Product.js";


const router = express.Router();

// ✅ Crear producto
router.post("/", async (req, res) => {
  try {
    const producto = new Product(req.body);
    const saved = await producto.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Obtener todos
router.get("/", async (req, res) => {
  const productos = await Product.find();
  res.json(productos);
});

// ✅ Obtener uno
router.get("/:id", async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) return res.status(404).json({ msg: "No encontrado" });
    res.json(producto);
  } catch {
    res.status(400).json({ msg: "ID inválido" });
  }
});

// ✅ Actualizar
router.put("/:id", async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(producto);
  } catch {
    res.status(400).json({ msg: "Error al actualizar" });
  }
});

// ✅ Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Producto eliminado" });
  } catch {
    res.status(400).json({ msg: "Error al eliminar" });
  }
});

export default router;