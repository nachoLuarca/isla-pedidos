import Product from "../models/Product.js";

// ✅ Crear
export const createProduct = async (req, res) => {
  try {
    const { nombre, precio, descripcion, stock } = req.body;

    // 🔥 VALIDAR CAMPOS
    if (!nombre || !precio || !descripcion || stock === undefined) {
      return res.status(400).json({
        msg: "Todos los campos son obligatorios"
      });
    }

    // 🔥 VALIDAR NÚMEROS
    if (precio <= 0) {
      return res.status(400).json({
        msg: "Precio inválido"
      });
    }

    if (stock < 0) {
      return res.status(400).json({
        msg: "Stock inválido"
      });
    }

    const product = new Product({
      nombre,
      precio,
      descripcion,
      stock
    });

    await product.save();

    res.json(product);

  } catch (error) {
    res.status(500).json(error);
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