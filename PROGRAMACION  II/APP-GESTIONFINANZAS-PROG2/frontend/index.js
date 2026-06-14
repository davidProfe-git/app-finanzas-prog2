const API = "http://localhost:3000";

async function cargarMovimientos() {
  try {
    const ingresos = await fetch(`${API}/ingresos`).then(r => r.json());
    const gastos = await fetch(`${API}/gastos`).then(r => r.json());

    const tabla = document.getElementById("tablaMovimientos");
    if (!tabla) return;
    tabla.innerHTML = "";

    let totalIngresos = 0;
    let totalGastos = 0;

    ingresos.forEach(i => {
      totalIngresos += parseFloat(i.monto);
      tabla.innerHTML += `
        <tr>
          <td style="color:green">Ingreso</td>
          <td>${i.descripcion}</td>
          <td>$${parseFloat(i.monto).toLocaleString()}</td>
          <td>${i.fecha ? i.fecha.split('T')[0] : ''}</td>
        </tr>`;
    });

    gastos.forEach(g => {
      totalGastos += parseFloat(g.monto);
      tabla.innerHTML += `
        <tr>
          <td style="color:red">Gasto</td>
          <td>${g.descripcion}</td>
          <td>$${parseFloat(g.monto).toLocaleString()}</td>
          <td>${g.fecha ? g.fecha.split('T')[0] : ''}</td>
        </tr>`;
    });

    const balance = totalIngresos - totalGastos;
    const balanceEl = document.getElementById("balance");
    if (balanceEl) {
      balanceEl.textContent = `$${balance.toLocaleString()}`;
      balanceEl.style.color = balance >= 0 ? "green" : "red";
    }

  } catch(err) {
    console.error("Error cargando datos:", err);
  }
}

async function agregarIngreso() {
  const descripcion = document.getElementById("descIngreso").value;
  const monto = document.getElementById("montoIngreso").value;
  const fecha = document.getElementById("fechaIngreso").value;

  if (!descripcion || !monto || !fecha) {
    alert("Por favor llena todos los campos");
    return;
  }

  await fetch(`${API}/ingresos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario_id: 1, descripcion, monto, fecha })
  });

  document.getElementById("descIngreso").value = "";
  document.getElementById("montoIngreso").value = "";
  document.getElementById("fechaIngreso").value = "";
  cargarMovimientos();
}

async function agregarGasto() {
  const descripcion = document.getElementById("descGasto").value;
  const monto = document.getElementById("montoGasto").value;
  const categoria = document.getElementById("categoriaGasto").value;
  const fecha = document.getElementById("fechaGasto").value;

  if (!descripcion || !monto || !fecha) {
    alert("Por favor llena todos los campos");
    return;
  }

  await fetch(`${API}/gastos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario_id: 1, descripcion, monto, categoria, fecha })
  });

  document.getElementById("descGasto").value = "";
  document.getElementById("montoGasto").value = "";
  document.getElementById("categoriaGasto").value = "";
  document.getElementById("fechaGasto").value = "";
  cargarMovimientos();
}

window.onload = cargarMovimientos;