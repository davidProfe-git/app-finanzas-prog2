echo 'const express = require("express");
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Bienvenido a la App de Gestion de Finanzas, aprende a llevar tu dinero");
});
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});' > index.js