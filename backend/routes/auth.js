const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Register user
// Register user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    // Cek apakah username atau email sudah ada
    db.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email],
      async (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length > 0)
          return res
            .status(409)
            .json({ message: "Username or email already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user baru
        db.query(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          [username, email, hashedPassword],
          (err, result) => {
            if (err) return res.status(500).json({ message: err.message });

            const newUser = {
              id: result.insertId,
              username,
              email,
            };

            // Buat JWT token
            const token = jwt.sign(
              { id: newUser.id, username: newUser.username },
              process.env.JWT_SECRET,
              { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(201).json({
              message: "User registered successfully",
              token,
              user: newUser,
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0)
        return res
          .status(401)
          .json({ message: "Invalid username or password" });

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res
          .status(401)
          .json({ message: "Invalid username or password" });

      // Buat JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.json({
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    }
  );
});

module.exports = router;
