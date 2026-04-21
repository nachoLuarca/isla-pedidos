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
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">

        <div className="flex gap-6 text-sm font-medium">
          <Link to="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>

          {role === "admin" && (
            <Link to="/admin" className="hover:text-yellow-400">
              Admin
            </Link>
          )}
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
        >
          Cerrer sesión
        </button>
      </nav>

      {/* CONTENIDO */}
      <main className="p-6 w-full">
        {children}
      </main>

    </div>
  );
}

export default Layout;