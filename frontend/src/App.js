import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/productos")
      .then(res => setProductos(res.data));
  }, []);

  return (
    <div>
      <h1>IslaPedidos 🍤</h1>
      {productos.map(p => (
        <div key={p._id}>
          <h2>{p.nombre}</h2>
          <p>${p.precio}</p>
        </div>
      ))}
    </div>
  );
}

export default App;