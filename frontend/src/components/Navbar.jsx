import React from "react";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className='bg-white shadow p-4 flex justify-between items-center'>
      <div className='font-bold text-lg'>Todo App</div>
      <div>
        <span className='mr-4'>Halo, {user.username}</span>
        <button
          onClick={onLogout}
          className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
