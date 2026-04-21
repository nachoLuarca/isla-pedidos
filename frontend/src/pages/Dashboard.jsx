import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  // 🔄 cargar productos
  const getProducts = () => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(() => alert("Error cargando productos"));
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ➕ crear producto
  const createProduct = async () => {
    try {
      await api.post("/products", {
        nombre,
        precio: Number(precio) // 🔥 CLAVE POR QUE EL BACK ESPERA UN NUMERO NO STRING SE DEFINE ANTES DE ENVIARLO
      });

      setNombre("");
      setPrecio("");

      getProducts(); // refrescar

    } catch {
      alert("Error creando producto ❌");
    }
  };

  // ❌ eliminar producto
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      getProducts();
    } catch {
      alert("No autorizado ❌");
    }
  };

  // 🔓 logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={logout}>Cerrar sesión</button>

      <h3>Crear producto</h3>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />

      <input
        placeholder="Precio"
        value={precio}
        onChange={e => setPrecio(e.target.value)}
      />

      <button onClick={createProduct}>
        Crear
      </button>

      <h3>Productos:</h3>

      {products.map(p => (
        <div key={p._id}>
          {p.nombre} - ${p.precio}

          <button onClick={() => deleteProduct(p._id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;