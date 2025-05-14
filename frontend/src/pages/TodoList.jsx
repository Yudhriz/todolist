import React, { useState, useEffect } from "react";

export default function TodoList({ token }) {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingTask, setEditingTask] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch todos dari backend
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Gagal mengambil todos");
      } else {
        setTodos(data);
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Tambah todo baru
  const addTodo = async () => {
    if (!newTask.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task: newTask }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Gagal menambah todo");
      } else {
        setTodos([data, ...todos]);
        setNewTask("");
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  // Update todo (task atau completed)
  const updateTodo = async (id, updatedFields) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Gagal mengupdate todo");
      } else {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, ...updatedFields } : todo
          )
        );
        setEditingId(null);
        setEditingTask("");
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  // Hapus todo
  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Gagal menghapus todo");
      } else {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white p-6 rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>Todo List</h2>
      {error && (
        <div className='bg-red-100 text-red-700 p-2 rounded mb-4'>{error}</div>
      )}
      <div className='flex mb-4'>
        <input
          type='text'
          placeholder='Tambah tugas baru...'
          className='flex-grow border border-gray-300 rounded-l px-3 py-2'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
          disabled={loading}
        />
        <button
          onClick={addTodo}
          disabled={loading}
          className='bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 disabled:opacity-50'
        >
          Tambah
        </button>
      </div>
      {loading && <div className='mb-4'>Loading...</div>}
      <ul>
        {todos.length === 0 && !loading && (
          <li className='text-gray-500'>Belum ada tugas</li>
        )}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className='flex items-center justify-between border-b border-gray-200 py-2'
          >
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() =>
                  updateTodo(todo.id, {
                    task: todo.task,
                    completed: !todo.completed,
                  })
                }
                disabled={loading}
              />
              {editingId === todo.id ? (
                <input
                  type='text'
                  value={editingTask}
                  onChange={(e) => setEditingTask(e.target.value)}
                  className='border border-gray-300 rounded px-2 py-1'
                  disabled={loading}
                />
              ) : (
                <span
                  className={todo.completed ? "line-through text-gray-500" : ""}
                >
                  {todo.task}
                </span>
              )}
            </div>
            <div className='space-x-2'>
              {editingId === todo.id ? (
                <>
                  <button
                    onClick={() =>
                      updateTodo(todo.id, {
                        task: editingTask,
                        completed: todo.completed,
                      })
                    }
                    disabled={loading || !editingTask.trim()}
                    className='text-green-600 hover:underline'
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingTask("");
                    }}
                    disabled={loading}
                    className='text-red-600 hover:underline'
                  >
                    Batal
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditingTask(todo.task);
                    }}
                    disabled={loading}
                    className='text-blue-600 hover:underline'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    disabled={loading}
                    className='text-red-600 hover:underline'
                  >
                    Hapus
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
