import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoList from "./pages/TodoList";
import Navbar from "./components/Navbar";

export default function App() {
  // State untuk menyimpan token dan user info
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [page, setPage] = useState("login"); // 'login' | 'register' | 'todo'

  // Jika token ada, langsung ke todo list
  useEffect(() => {
    if (token) setPage("todo");
  }, [token]);

  // Fungsi logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setPage("login");
  };

  // Fungsi untuk simpan token dan user setelah login/register
  const handleLogin = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setPage("todo");
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      {token && <Navbar user={user} onLogout={logout} />}
      <div className='max-w-md mx-auto p-4'>
        {page === "login" && (
          <>
            <Login onLogin={handleLogin} />
            <p className='mt-4 text-center'>
              Belum punya akun?{" "}
              <button
                className='text-blue-600 underline'
                onClick={() => setPage("register")}
              >
                Daftar di sini
              </button>
            </p>
          </>
        )}
        {page === "register" && (
          <>
            <Register onRegister={handleLogin} />
            <p className='mt-4 text-center'>
              Sudah punya akun?{" "}
              <button
                className='text-blue-600 underline'
                onClick={() => setPage("login")}
              >
                Login di sini
              </button>
            </p>
          </>
        )}
        {page === "todo" && <TodoList token={token} />}
      </div>
    </div>
  );
}
