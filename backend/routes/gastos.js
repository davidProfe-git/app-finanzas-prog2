const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM gastos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { usuario_id, descripcion, monto, categoria, fecha } = req.body;
  db.query(
    "INSERT INTO gastos (usuario_id, descripcion, monto, categoria, fecha) VALUES (?, ?, ?, ?, ?)",
    [usuario_id, descripcion, monto, categoria, fecha],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: "Gasto creado ✅", id: results.insertId });
    }
  );
});

module.exports = router;