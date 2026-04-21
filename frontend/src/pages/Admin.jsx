import { useEffect, useState } from "react";
import api from "../services/api";

function Admin() {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    api.get("/admin/users")
      .then(res => setUsers(res.data));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const changeRole = async (id, role) => {
    await api.put(`/admin/users/${id}/role`, { role });
    getUsers();
  };

  const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    getUsers();
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">Panel Admin 👑</h2>

      <div className="grid gap-3">

        {users.map(u => (
          <div
            key={u._id}
            className="bg-white p-4 rounded shadow"
          >
            <p className="font-semibold">{u.nombre}</p>
            <p className="text-sm text-gray-500">{u.email}</p>
            <p className="text-sm mb-2">Rol: {u.role}</p>

            <div className="flex gap-2">
              <button
                onClick={() => changeRole(u._id, "admin")}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Admin
              </button>

              <button
                onClick={() => changeRole(u._id, "user")}
                className="bg-gray-500 text-white px-2 py-1 rounded"
              >
                User
              </button>

              <button
                onClick={() => deleteUser(u._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
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

export default Admin;