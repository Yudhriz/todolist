const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateToken = require("../middleware/auth");

// Get all todos for logged-in user
router.get("/", authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.query(
    "SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
});

// Add new todo
router.post("/", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { task } = req.body;
  if (!task) return res.status(400).json({ message: "Task is required" });

  db.query(
    "INSERT INTO todos (task, user_id) VALUES (?, ?)",
    [task, userId],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ id: result.insertId, task, completed: false });
    }
  );
});

// Update todo (task or completed)
router.put("/:id", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const todoId = req.params.id;
  const { task, completed } = req.body;

  // Pastikan todo milik user
  db.query(
    "SELECT * FROM todos WHERE id = ? AND user_id = ?",
    [todoId, userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "Todo not found" });

      db.query(
        "UPDATE todos SET task = ?, completed = ? WHERE id = ?",
        [task, completed, todoId],
        (err) => {
          if (err) return res.status(500).json({ message: err.message });
          res.json({ id: todoId, task, completed });
        }
      );
    }
  );
});

// Delete todo
router.delete("/:id", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const todoId = req.params.id;

  db.query(
    "SELECT * FROM todos WHERE id = ? AND user_id = ?",
    [todoId, userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "Todo not found" });

      db.query("DELETE FROM todos WHERE id = ?", [todoId], (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "Todo deleted" });
      });
    }
  );
});

module.exports = router;
