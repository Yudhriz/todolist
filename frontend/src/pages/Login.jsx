import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!username || !password) {
      setError("Username dan password wajib diisi");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login gagal");
      } else {
        onLogin(data.token, data.user);
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white p-6 rounded shadow space-y-4'
    >
      <h2 className='text-2xl font-bold text-center'>Login</h2>
      {error && (
        <div className='bg-red-100 text-red-700 p-2 rounded'>{error}</div>
      )}
      <input
        type='text'
        placeholder='Username'
        className='w-full border border-gray-300 rounded px-3 py-2'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        className='w-full border border-gray-300 rounded px-3 py-2'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type='submit'
        disabled={loading}
        className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50'
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
