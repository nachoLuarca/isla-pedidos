import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState(""); // 👈 NUEVO

  const getProducts = () => {
    api.get("/products")
      .then(res => setProducts(res.data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const createProduct = async () => {
    await api.post("/products", {
      nombre,
      precio: Number(precio),
      descripcion,
      stock: Number(stock) // 👈 SE ENVÍA
    });

    setNombre("");
    setPrecio("");
    setDescripcion("");
    setStock("");
    getProducts();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    getProducts();
  };

  return (
    <div className="w-full">

      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <input
          className="border p-2 rounded w-32"
          placeholder="Precio"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
        />
        <input className="border p-2 rounded w-full md:w-64" 
          placeholder="Descripción" 
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)} />
        <input
          className="border p-2 rounded w-32"
          placeholder="Stock"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />
        <button
          onClick={createProduct}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Crear
        </button>

      </div>

      {/* LISTA */}
      <div className="grid gap-3">

        {products.map(p => (
          <div
            key={p._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.nombre}</p>
              <p className="text-sm text-gray-500"> {p.descripcion} </p>
              <p className="text-sm text-gray-500">${p.precio}</p>
              <p className="text-sm text-gray-500">Stock: {p.stock}</p>
            </div>

            <button
              onClick={() => deleteProduct(p._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;