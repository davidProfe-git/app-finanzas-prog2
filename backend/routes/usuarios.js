const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { nombre, email, password } = req.body;
  db.query(
    "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
    [nombre, email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: "Usuario creado ✅", id: results.insertId });
    }
  );
});

module.exports = router;