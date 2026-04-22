import { BrowserRouter, Routes, Route } from "react-router-dom";
// 🔝 Manejo de rutas en React

import { Toaster } from "react-hot-toast";
// 🔥 Librería para mostrar notificaciones (toast)

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
// 📄 Páginas de la aplicación

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
// 🔐 Componentes que protegen rutas (autenticación y roles)

import Layout from "./components/Layout";
// 🧱 Layout con sidebar/navbar que envuelve las páginas


function App() {
  return (
    <BrowserRouter>
      {/* 🌐 CONTENEDOR PRINCIPAL DE RUTAS */}

      {/* 🔥 TOASTER GLOBAL */}
      {/* Permite mostrar notificaciones en cualquier parte de la app */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff"
          }
        }}
      />

      <Routes>
        {/* 📍 AQUÍ DEFINES TODAS LAS RUTAS */}

        {/* 🔓 RUTA PÚBLICA (LOGIN) */}
        {/* No requiere autenticación */}
        <Route path="/" element={<Login />} />

        {/* 🔐 RUTA PROTEGIDA (USUARIOS LOGEADOS) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {/* 🔒 Verifica si hay token */}
              
              <Layout>
                {/* 🧱 Aplica sidebar + estructura */}
                <Dashboard />
                {/* 📄 Página principal */}
              </Layout>

            </PrivateRoute>
          }
        />

        {/* 🔐 RUTA SOLO ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              {/* 🔒 Verifica token + rol = admin */}

              <Layout>
                {/* 🧱 Mismo layout */}
                <Admin />
                {/* 📄 Panel de administración */}
              </Layout>

            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;