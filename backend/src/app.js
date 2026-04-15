import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express(); // ✅ PRIMERO creas app

app.use(cors());
app.use(express.json());

// ✅ AHORA sí puedes usar rutas
app.use("/api/products", productRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo conectado 🚀");

    app.listen(3000, () => {
      console.log("Servidor 3000 🚀");
    });
  })
  .catch(err => {
    console.log("ERROR MONGO ❌", err);
  });

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});