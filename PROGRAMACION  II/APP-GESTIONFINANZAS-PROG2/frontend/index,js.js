// ===== MI CONTROL FINANCIERO - APP ORIGINAL =====

// Estado de la aplicación
const app = {
  usuario: { nombre: '', email: '' },
  transacciones: [],
  categorias: ['alimentacion', 'transporte', 'servicios', 'arriendo', 'entretenimiento', 'otros'],
  seccionActual: 'dashboard'
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
  cargarDatos();
  actualizarFecha();
  renderizarDashboard();
  renderizarCategoriasConfig();

  // Set fecha actual en modales
  const hoy = new Date().toISOString().split('T')[0];
  document.getElementById('fechaIngreso').value = hoy;
  document.getElementById('fechaGasto').value = hoy;
});

// ===== NAVEGACIÓN =====
function mostrarSeccion(seccion) {
  // Ocultar todas
  document.querySelectorAll('.seccion-activa, .seccion-oculta').forEach(el => {
    el.classList.remove('seccion-activa');
    el.classList.add('seccion-oculta');
  });

  // Mostrar seleccionada
  document.getElementById('seccion-' + seccion).classList.remove('seccion-oculta');
  document.getElementById('seccion-' + seccion).classList.add('seccion-activa');

  // Actualizar menú
  document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
  event.target.classList.add('active');

  // Actualizar título
  const titulos = {
    'dashboard': 'Dashboard',
    'transacciones': 'Movimientos',
    'reportes': 'Reportes',
    'configuracion': 'Configuración'
  };
  document.getElementById('tituloSeccion').innerText = titulos[seccion];

  app.seccionActual = seccion;

  if (seccion === 'reportes') renderizarReportes();
  if (seccion === 'transacciones') renderizarTablaTransacciones();
}

// ===== FECHA =====
function actualizarFecha() {
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('fechaActual').innerText = new Date().toLocaleDateString('es-CO', opciones);
}

// ===== MODALES =====
function abrirModal(tipo) {
  const modalId = tipo === 'ingreso' ? 'modalIngreso' : 'modalGasto';
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();
}

// ===== REGISTRAR INGRESO =====
function registrarIngreso() {
  const monto = parseFloat(document.getElementById('montoIngreso').value);
  const concepto = document.getElementById('conceptoIngreso').value || 'Ingreso';
  const fecha = document.getElementById('fechaIngreso').value;

  if (!monto || monto <= 0) {
    mostrarToast('Ingrese un monto válido', 'error');
    return;
  }

  const transaccion = {
    id: generarId(),
    tipo: 'ingreso',
    monto,
    concepto,
    fecha,
    categoria: 'ingreso',
    timestamp: new Date().getTime()
  };

  app.transacciones.unshift(transaccion);
  guardarDatos();

  // Cerrar modal
  bootstrap.Modal.getInstance(document.getElementById('modalIngreso')).hide();

  // Limpiar
  document.getElementById('montoIngreso').value = '';
  document.getElementById('conceptoIngreso').value = '';

  mostrarToast(`Ingreso registrado: ${formatMoney(monto)}`, 'success');
  renderizarDashboard();
}

// ===== REGISTRAR GASTO =====
function registrarGasto() {
  const monto = parseFloat(document.getElementById('montoGasto').value);
  const concepto = document.getElementById('conceptoGasto').value || 'Gasto';
  const categoria = document.getElementById('categoriaGasto').value;
  const fecha = document.getElementById('fechaGasto').value;

  if (!monto || monto <= 0) {
    mostrarToast('Ingrese un monto válido', 'error');
    return;
  }

  const transaccion = {
    id: generarId(),
    tipo: 'gasto',
    monto,
    concepto,
    categoria,
    fecha,
    timestamp: new Date().getTime()
  };

  app.transacciones.unshift(transaccion);
  guardarDatos();

  // Cerrar modal
  bootstrap.Modal.getInstance(document.getElementById('modalGasto')).hide();

  // Limpiar
  document.getElementById('montoGasto').value = '';
  document.getElementById('conceptoGasto').value = '';

  mostrarToast(`Gasto registrado: ${formatMoney(monto)}`, 'error');
  renderizarDashboard();
}

// ===== RENDERIZAR DASHBOARD =====
function renderizarDashboard() {
  const ingresos = app.transacciones.filter(t => t.tipo === 'ingreso').reduce((s, t) => s + t.monto, 0);
  const gastos = app.transacciones.filter(t => t.tipo === 'gasto').reduce((s, t) => s + t.monto, 0);
  const neto = ingresos - gastos;

  document.getElementById('kpiIngresos').innerText = formatMoney(ingresos);
  document.getElementById('kpiGastos').innerText = formatMoney(gastos);
  document.getElementById('kpiNeto').innerText = formatMoney(neto);

  // Color del neto
  const netoEl = document.getElementById('kpiNeto');
  netoEl.style.color = neto >= 0 ? '#10b981' : '#ef4444';

  renderizarChart(ingresos, gastos);
  renderizarUltimosMovimientos();
}

// ===== CHART =====
function renderizarChart(ingresos, gastos) {
  const max = Math.max(ingresos, gastos, 1);
  const container = document.getElementById('chartMensual');

  container.innerHTML = `
    <div class="bar-group">
      <div class="bar-valor">${formatMoney(ingresos)}</div>
      <div class="bar bar-ingreso" style="height: ${(ingresos/max)*150}px"></div>
      <div class="bar-label">Ingresos</div>
    </div>
    <div class="bar-group">
      <div class="bar-valor">${formatMoney(gastos)}</div>
      <div class="bar bar-gasto" style="height: ${(gastos/max)*150}px"></div>
      <div class="bar-label">Gastos</div>
    </div>
  `;
}

// ===== ÚLTIMOS MOVIMIENTOS =====
function renderizarUltimosMovimientos() {
  const container = document.getElementById('ultimosMovimientos');
  const ultimos = app.transacciones.slice(0, 5);

  if (ultimos.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted py-5">
        <i class="fas fa-inbox fa-3x mb-3"></i>
        <p>No hay movimientos registrados aún</p>
      </div>`;
    return;
  }

  container.innerHTML = ultimos.map(t => `
    <div class="movimiento-item movimiento-${t.tipo}">
      <div class="movimiento-icono">
        <i class="fas fa-${t.tipo === 'ingreso' ? 'arrow-trend-up' : 'arrow-trend-down'}"></i>
      </div>
      <div class="movimiento-info">
        <div class="movimiento-titulo">${t.concepto}</div>
        <div class="movimiento-fecha">${formatearFecha(t.fecha)}</div>
      </div>
      <div class="movimiento-monto">
        ${t.tipo === 'ingreso' ? '+' : '-'} ${formatMoney(t.monto)}
      </div>
    </div>
  `).join('');
}

// ===== TABLA DE TRANSACCIONES =====
function renderizarTablaTransacciones(filtro = 'todos') {
  const tbody = document.getElementById('tablaTransacciones');
  let lista = app.transacciones;

  if (filtro !== 'todos') {
    lista = lista.filter(t => t.tipo === filtro);
  }

  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No hay movimientos</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(t => `
    <tr>
      <td>${formatearFecha(t.fecha)}</td>
      <td><span class="badge bg-${t.tipo === 'ingreso' ? 'success' : 'danger'}">${t.tipo}</span></td>
      <td>${t.categoria || '-'}</td>
      <td>${t.concepto}</td>
      <td class="text-end fw-bold text-${t.tipo === 'ingreso' ? 'success' : 'danger'}">
        ${t.tipo === 'ingreso' ? '+' : '-'} ${formatMoney(t.monto)}
      </td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarTransaccion('${t.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function filtrarMovimientos(filtro) {
  renderizarTablaTransacciones(filtro);
}

// ===== REPORTES =====
function renderizarReportes() {
  const gastos = app.transacciones.filter(t => t.tipo === 'gasto');

  // Agrupar por categoría
  const porCategoria = {};
  gastos.forEach(g => {
    porCategoria[g.categoria] = (porCategoria[g.categoria] || 0) + g.monto;
  });

  const totalGastos = Object.values(porCategoria).reduce((s, v) => s + v, 0);

  // Renderizar distribución
  const container = document.getElementById('distribucionGastos');
  const colores = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#6b7280'];

  if (totalGastos === 0) {
    container.innerHTML = `
      <div class="text-center text-muted py-4">
        <p>Registra gastos para ver el análisis</p>
      </div>`;
    document.getElementById('resumenCategorias').innerHTML = '<tr><td colspan="3" class="text-center text-muted">Sin datos</td></tr>';
    return;
  }

  let html = '';
  let i = 0;
  for (const [cat, monto] of Object.entries(porCategoria)) {
    const porcentaje = (monto / totalGastos * 100).toFixed(1);
    html += `
      <div class="distribucion-item">
        <div class="distribucion-header">
          <span>${capitalizar(cat)}</span>
          <span>${formatMoney(monto)} (${porcentaje}%)</span>
        </div>
        <div class="distribucion-barra">
          <div class="distribucion-progreso" style="width: ${porcentaje}%; background: ${colores[i % colores.length]}"></div>
        </div>
      </div>`;
    i++;
  }
  container.innerHTML = html;

  // Tabla resumen
  const tbody = document.getElementById('resumenCategorias');
  tbody.innerHTML = Object.entries(porCategoria).map(([cat, monto]) => {
    const count = gastos.filter(g => g.categoria === cat).length;
    return `
      <tr>
        <td>${capitalizar(cat)}</td>
        <td class="text-center">${count}</td>
        <td class="text-end">${formatMoney(monto)}</td>
      </tr>
    `;
  }).join('');
}

// ===== CONFIGURACIÓN =====
function renderizarCategoriasConfig() {
  const container = document.getElementById('listaCategoriasConfig');
  container.innerHTML = app.categorias.map(cat => `
    <div class="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
      <span>${capitalizar(cat)}</span>
      <button class="btn btn-sm btn-outline-danger" onclick="eliminarCategoria('${cat}')">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');

  // Actualizar select de gastos
  const select = document.getElementById('categoriaGasto');
  select.innerHTML = app.categorias.map(cat => 
    `<option value="${cat}">${capitalizar(cat)}</option>`
  ).join('');
}

function agregarCategoria() {
  const input = document.getElementById('nuevaCategoria');
  const nombre = input.value.trim().toLowerCase();

  if (!nombre) return;
  if (app.categorias.includes(nombre)) {
    mostrarToast('Esta categoría ya existe', 'error');
    return;
  }

  app.categorias.push(nombre);
  input.value = '';
  guardarDatos();
  renderizarCategoriasConfig();
  mostrarToast('Categoría agregada', 'success');
}

function eliminarCategoria(cat) {
  if (!confirm(`¿Eliminar la categoría "${capitalizar(cat)}"?`)) return;
  app.categorias = app.categorias.filter(c => c !== cat);
  guardarDatos();
  renderizarCategoriasConfig();
}

// ===== PERFIL =====
function guardarPerfil() {
  const nombre = document.getElementById('perfilNombre').value;
  const email = document.getElementById('perfilEmail').value;

  if (nombre) {
    app.usuario.nombre = nombre;
    app.usuario.email = email;
    document.getElementById('userDisplay').innerText = nombre;
    guardarDatos();
    mostrarToast('Perfil actualizado', 'success');
    bootstrap.Modal.getInstance(document.getElementById('perfilModal')).hide();
  }
}

// ===== ELIMINAR =====
function eliminarTransaccion(id) {
  if (!confirm('¿Eliminar este movimiento?')) return;
  app.transacciones = app.transacciones.filter(t => t.id !== id);
  guardarDatos();
  renderizarDashboard();
  if (app.seccionActual === 'transacciones') renderizarTablaTransacciones();
  mostrarToast('Movimiento eliminado', 'success');
}

function limpiarTodo() {
  if (!confirm('¿ESTÁS SEGURO? Se eliminarán TODOS los datos permanentemente.')) return;
  app.transacciones = [];
  app.usuario = { nombre: '', email: '' };
  app.categorias = ['alimentacion', 'transporte', 'servicios', 'arriendo', 'entretenimiento', 'otros'];
  localStorage.removeItem('miControlFinanciero');
  document.getElementById('userDisplay').innerText = 'Invitado';
  renderizarDashboard();
  renderizarCategoriasConfig();
  mostrarToast('Todos los datos han sido eliminados', 'error');
}

// ===== UTILIDADES =====
function formatMoney(amount) {
  return '$' + amount.toLocaleString('es-CO');
}

function formatearFecha(fechaStr) {
  if (!fechaStr) return '-';
  const fecha = new Date(fechaStr + 'T00:00:00');
  return fecha.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
}

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ===== LOCALSTORAGE =====
function guardarDatos() {
  localStorage.setItem('miControlFinanciero', JSON.stringify({
    usuario: app.usuario,
    transacciones: app.transacciones,
    categorias: app.categorias
  }));
}

function cargarDatos() {
  const datos = localStorage.getItem('miControlFinanciero');
  if (datos) {
    const parsed = JSON.parse(datos);
    app.usuario = parsed.usuario || { nombre: '', email: '' };
    app.transacciones = parsed.transacciones || [];
    app.categorias = parsed.categorias || app.categorias;

    if (app.usuario.nombre) {
      document.getElementById('userDisplay').innerText = app.usuario.nombre;
      document.getElementById('perfilNombre').value = app.usuario.nombre;
      document.getElementById('perfilEmail').value = app.usuario.email || '';
    }
  }
}

// ===== TOAST =====
function mostrarToast(mensaje, tipo) {
  const toastEl = document.getElementById('toastNotificacion');
  const mensajeEl = document.getElementById('toastMensaje');

  mensajeEl.innerText = mensaje;
  toastEl.className = `toast align-items-center text-white bg-${tipo === 'error' ? 'danger' : tipo === 'success' ? 'success' : 'primary'}`;

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}