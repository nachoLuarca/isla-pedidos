import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import toast from "react-hot-toast"; // 🔥 IMPORTANTE

function Dashboard() {

  // 🔹 LISTA DE PRODUCTOS
  const [products, setProducts] = useState([]);

  // 🔹 CAMPOS DEL FORM
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");

  // 🔹 CONTROL DE EDICIÓN
  const [editingId, setEditingId] = useState(null);

  // 🔥 REFERENCIA AL FORM
  const formRef = useRef(null);
  // 🔍 FILTROS (NIVEL 2)
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [sort, setSort] = useState("");


  // 🔥 OBTENER PRODUCTOS
  const getProducts = () => {
    api.get("/products")
      .then(res => setProducts(res.data));
  };

  // 🔥 CARGA INICIAL
  useEffect(() => {
    getProducts();
  }, []);

  // 🔥 CREAR O EDITAR PRODUCTO
  const saveProduct = async () => {
    try {

      if (editingId) {
        // ✏️ EDITAR
        await api.put(`/products/${editingId}`, {
          nombre,
          precio: Number(precio),
          descripcion,
          stock: Number(stock)
        });

        toast.success("Producto actualizado ✏️");

      } else {
        // ➕ CREAR
        await api.post("/products", {
          nombre,
          precio: Number(precio),
          descripcion,
          stock: Number(stock)
        });

        toast.success("Producto creado 🚀");
      }

      // 🔄 LIMPIAR FORM
      setNombre("");
      setPrecio("");
      setDescripcion("");
      setStock("");
      setEditingId(null);

      getProducts();

    } catch {
      toast.error("Error guardando ❌");
    }
  };

  // 🔥 ELIMINAR PRODUCTO (CON CONFIRMACIÓN)
  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar este producto?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      toast.success("Producto eliminado 🗑️");
      getProducts();
    } catch {
      toast.error("Error eliminando ❌");
    }
  };
  // 🔥 ACTIVAR EDICIÓN + SCROLL
  const startEdit = (product) => {
    setEditingId(product._id);

    setNombre(product.nombre);
    setPrecio(product.precio);
    setDescripcion(product.descripcion);
    setStock(product.stock);

    // 🔥 SCROLL HACIA EL FORM
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 100);
  };
  // 🔥 CANCELAR EDICIÓN
  const cancelEdit = () => {
    setEditingId(null);
    setNombre("");
    setPrecio("");
    setDescripcion("");
    setStock("");
  };
  // 🔥 FILTRADO + ORDENAMIENTO
  const filteredProducts = products
    .filter(p =>
      p.nombre.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p =>
      minPrice ? p.precio >= Number(minPrice) : true
    )
    .sort((a, b) => {
      if (sort === "asc") return a.precio - b.precio;
      if (sort === "desc") return b.precio - a.precio;
      return 0;
    }
  );
  return (
    <div className="w-full">

      <h2 className="text-2xl font-bold mb-6">
        Mantenedor de Productos
      </h2>
      {/* 🔥 FORMULARIO */}
      <div
        ref={formRef}
        className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-2"
      >

        <input
          className="border p-2 rounded w-full md:flex-1"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full md:w-32"
          placeholder="Precio"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full md:w-64"
          placeholder="Descripción"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full md:w-32"
          placeholder="Cantidad"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />
        {/* 🔥 BOTÓN DINÁMICO */}
        <button
          onClick={saveProduct}
          className={`px-4 rounded text-white ${
            editingId
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {editingId ? "Actualizar" : "Agregar"}
        </button>

        {/* 🔥 CANCELAR */}
        {editingId && (
          <button
            onClick={cancelEdit}
            className="bg-gray-400 text-white px-4 rounded"
          >
            Cancelar
          </button>
        )}      
      </div>
      {/* 🔥 TÍTULO */}
      <p className="text-xl font-bold mb-4">
        Filtros de Busqueda
      </p>

      <div className="bg-white p-4 rounded shadow mb-6">
      {/* 🔥 FILTROS EN COLUMNAS */}
        <div className="flex flex-wrap gap-4 items-end">

          {/* 🔹 BUSCAR */}
          <div className="flex flex-col">
            <input
              className="border p-2 rounded w-48"
              placeholder="Buscar producto..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* 🔹 PRECIO */}
          <div className="flex flex-col">
            <input
              className="border p-2 rounded w-40"
              placeholder="Precio mínimo"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />
          </div>

          {/* 🔹 ORDEN */}
          <div className="flex flex-col">
            <select
              className="border p-2 rounded w-40"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="asc">Menor a Mayor</option>
              <option value="desc">Mayor a Menor</option>
            </select>
          </div>

        </div>
      </div>
      {/* 🔥 LISTA */}
      <div className="grid gap-3">

        {filteredProducts.map(p => (
          <div
            key={p._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >

            <div>
              <p className="font-semibold">{p.nombre}</p>
              <p className="text-sm text-gray-500">{p.descripcion}</p>
              <p className="text-sm text-gray-500">${p.precio}</p>
              <p className="text-sm text-gray-500">
                Cantidad: {p.stock}
              </p>
            </div>


            <div className="flex gap-2">

              <button
                onClick={() => startEdit(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Editar
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;