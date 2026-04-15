import Product from "../models/Product.js";

// ✅ Crear
export const createProduct = async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    // 🔥 VALIDACIÓN
    if (!nombre || typeof precio !== "number") {
        return res.status(400).json({ msg: "Datos inválidos" });
    }

    const producto = new Product(req.body);
    const saved = await producto.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Obtener todos
export const getProducts = async (req, res) => {
  const productos = await Product.find();
  res.json(productos);
};

// ✅ Obtener uno
export const getProduct = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) return res.status(404).json({ msg: "No encontrado" });
    res.json(producto);
  } catch {
    res.status(400).json({ msg: "ID inválido" });
  }
};

// ✅ Actualizar
export const updateProduct = async (req, res) => {
  const producto = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(producto);
};

// ✅ Eliminar
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Producto eliminado" });
};