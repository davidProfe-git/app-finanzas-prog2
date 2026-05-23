const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./db");

app.use(express.json());

const usuariosRoutes = require("./routes/usuarios");
const ingresosRoutes = require("./routes/ingresos");
const gastosRoutes = require("./routes/gastos");
const registroRoutes = require("./routes/registro");

app.use("/usuarios", usuariosRoutes);
app.use("/ingresos", ingresosRoutes);
app.use("/gastos", gastosRoutes);
app.use("/registro", registroRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido a la App de Gestión de Finanzas, aprende a llevar tu dinero");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});