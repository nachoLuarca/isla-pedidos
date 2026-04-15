import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // 🔴 No hay header
    if (!authHeader) {
      return res.status(401).json({ msg: "No hay token" });
    }

    // 🔥 FORMATO: Bearer TOKEN
    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, "secreto123");

    // guardamos usuario
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};

export default authMiddleware;