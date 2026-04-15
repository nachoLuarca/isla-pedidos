const roleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!roles.includes(user.role)) {
        return res.status(403).json({ msg: "No tienes permisos" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ msg: "Error de permisos" });
    }
  };
};

export default roleMiddleware;