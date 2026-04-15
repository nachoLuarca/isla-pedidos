import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: String,
  stock: { type: Number, default: 0 },
  fecha: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Product", productSchema);