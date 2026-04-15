import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 🔐 REGISTRO
export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // validar
    if (!nombre || !email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // verificar si existe
    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ msg: "Usuario ya existe" });
    }

    // encriptar password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      nombre,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ msg: "Usuario registrado" });

  } catch (error) {
    res.status(500).json(error);
  }
};

// 🔑 LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Usuario no existe" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ msg: "Password incorrecta" });
    }

    // generar token
    const token = jwt.sign(
      { id: user._id , role: user.role},
      "secreto123",
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json(error);
  }
};