const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM gastos", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { usuario_id, descripcion, monto, fecha } = req.body;
  db.query(
    "INSERT INTO gastos (usuario_id, descripcion, monto, fecha) VALUES (?, ?, ?, ?)",
    [usuario_id, descripcion, monto, fecha],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: "Gasto creado", id: result.insertId });
    }
  );
});

module.exports = router;
