const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM registro", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { usuario_id, tipo, descripcion, monto, fecha } = req.body;
  db.query(
    "INSERT INTO registro (usuario_id, tipo, descripcion, monto, fecha) VALUES (?, ?, ?, ?, ?)",
    [usuario_id, tipo, descripcion, monto, fecha],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: "Registro creado ✅", id: results.insertId });
    }
  );
});

module.exports = router;