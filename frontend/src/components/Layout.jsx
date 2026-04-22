import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    role = payload.role;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">

        <h2 className="text-lg font-bold mb-6">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-3 text-sm">

          <Link
            to="/dashboard"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Dashboard
          </Link>

          {role === "admin" && (
            <Link
              to="/admin"
              className="hover:bg-gray-700 p-2 rounded"
            >
              Usuarios
            </Link>
          )}

        </nav>

        <button
          onClick={logout}
          className="mt-auto bg-red-500 hover:bg-red-600 p-2 rounded text-sm"
        >
          Logout
        </button>

      </aside>

      {/* 🔥 CONTENIDO */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}

export default Layout;