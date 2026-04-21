import User from "../models/User.js";

// 🔹 Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener usuarios" });
  }
};

// 🔹 Cambiar rol
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    // validar rol
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ msg: "Rol inválido" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar rol" });
  }
};

// 🔹 Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    // evitar auto eliminación
    if (req.user.id === req.params.id) {
      return res.status(400).json({ msg: "No puedes eliminarte" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ msg: "Usuario eliminado" });

  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar usuario" });
  }
};