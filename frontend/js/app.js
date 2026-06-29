//Elementos de las tablas de ingresos y gastos
let ingresos = document.getElementById("row-ingreso");
let gastos = document.getElementById("row-gasto");

//Elementos de los Datos del formulario
let value_inserted = document.getElementById('valor')
let slt_categorias = document.getElementById("select-categorias");
let date = document.getElementById("fecha");

//Elementos de interacción con el usuario
let btn_registrar = document.getElementById("btn-registrar")

//Elementos del modal de edición
let modal = document.getElementById("modal-editar");
let btnGuardarEditar = document.getElementById("btn-guardar-editar");
let btnCancelarEditar = document.getElementById("btn-cancelar-editar");
let editarId = document.getElementById("editar-id");
let editarValor = document.getElementById("editar-valor");
let editarCategoria = document.getElementById("editar-categoria");
let editarFecha = document.getElementById("editar-fecha");

//Variables globales a usar
let listaMovimientos = [];
let movimientoIdEditable;

// Cargamos todo al iniciar la página
cargarMovimientos();
cargarCategorias();

//Eventos de interacción con el usuario
value_inserted.addEventListener('input', () => formatearCampoValor(value_inserted));
editarValor.addEventListener('input', () => formatearCampoValor(editarValor));
btn_registrar.addEventListener('click',()=>guardarMovimiento());
btnCancelarEditar.addEventListener('click', () => cerrarModal());
btnGuardarEditar.addEventListener('click', () => guardarEdicion(movimientoIdEditable));

function cargarMovimientos(){
    fetch('http://localhost:3000/api/movimientos')
    .then(datos => datos.json())
    .then((movimientos) => {

        listaMovimientos = movimientos.data

        ingresos.innerHTML = ""
        gastos.innerHTML = ""
        let totalIngresos = 0;
        let totalGastos = 0;

        for(let i=0; i<movimientos.data.length; i++){
            let movimiento = movimientos.data[i]
            let tipoCategoria = movimientos.data[i].tipo_categoria

            let fila = `<tr title="${movimiento.descripcion}">
                <td>${movimiento.nombre_categoria}</td>
                <td>${formatearMoneda(movimiento.monto)}</td>
                <td>${formatearFecha(movimiento.fecha)}</td>
                <td class="acciones">
                    <span class="icon-editar" onclick="editarMovimiento(${movimiento.movimiento_id})">✏️</span>
                    <span class="icon-eliminar" onclick="eliminarMovimiento(${movimiento.movimiento_id})">🗑️</span>
                </td>
            </tr>`

            if(tipoCategoria === "ingreso"){
                ingresos.innerHTML += fila
                totalIngresos += Number(movimiento.monto)
            } else if (tipoCategoria === "gasto") {
                gastos.innerHTML += fila
                totalGastos += Number(movimiento.monto)
            }
        }

        ingresos.innerHTML += `<tr class="fila-total">
            <td colspan="4">TOTAL INGRESOS ${formatearMoneda(totalIngresos)}</td>
        </tr>`

        gastos.innerHTML += `<tr class="fila-total">
            <td colspan="4">TOTAL GASTOS ${formatearMoneda(totalGastos)}</td>
        </tr>`
        
        let balance = totalIngresos - totalGastos;
        document.getElementById("balance-ingresos").textContent = formatearMoneda(totalIngresos);
        document.getElementById("balance-gastos").textContent = formatearMoneda(totalGastos);
        
        let balanceTotal = document.getElementById("balance-total");
        balanceTotal.textContent = formatearMoneda(balance);

        // Color según si el balance es positivo o negativo
        if(balance >= 0){
            balanceTotal.className = "balance-positivo";
        } else {
            balanceTotal.className = "balance-negativo";
        }
    })
}

function cargarCategorias(){
    cargarCategoriasEnSelect(slt_categorias);
}

function cargarCategoriasEnSelect(selectDestino,idSeleccionado){
    fetch('http://localhost:3000/api/categorias')
    .then(datos => datos.json())
    .then((categoriasDb) => {
        selectDestino.innerHTML = `<option value="" selected disabled hidden>-- Seleccione una categoría --</option>`;
        for(let i=0; i<categoriasDb.data.length; i++){
            selectDestino.innerHTML += `<option value="${categoriasDb.data[i].categoria_id}" title="${categoriasDb.data[i].descripcion}">[${categoriasDb.data[i].tipo_categoria.toUpperCase()}] ${categoriasDb.data[i].nombre_categoria}</option>`
        }
        if(idSeleccionado !== undefined){
            selectDestino.value = idSeleccionado;
        }
    })
}

function limpiarFormulario(){
    value_inserted.value = ""
    slt_categorias.value = ""
    date.value = ""
}

function formatearMoneda(valor){
    return Number(valor).toLocaleString('es-CO');
}

function formatearFecha(fechaSQL){
    let solofecha = fechaSQL.split("T")[0]
    let [year, month, day] = solofecha.split("-")
    return `${day}/${month}/${year}`
}

function formatearCampoValor(campoDestino){
    let numeroLimpio = campoDestino.value.replace(/[^0-9]/g, '');
    if (numeroLimpio === '') {
        campoDestino.value = ''
        return
    }
    campoDestino.value = formatearMoneda(numeroLimpio);
}

function guardarMovimiento(){
    if(value_inserted.value === "" || slt_categorias.value === "" || date.value === ""){
        alert("Por favor completa todos los campos");
        return;
    }

    let datosForm = {
        categoria_id: slt_categorias.value,
        monto: value_inserted.value.replace(/[^0-9]/g, ''),
        fecha: date.value
    }
    fetch('http://localhost:3000/api/submit/movimiento',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosForm)
    })
    .then(() => {
        limpiarFormulario()
        cargarMovimientos()
    })
    .catch((error) => {
        alert("Ocurrió un error al registrar el movimiento")
    })
}

function eliminarMovimiento(movimiento_id){
    let confirmado = confirm("¿Estás seguro de eliminar este movimiento?")
    if (!confirmado){
        return
    }
    fetch(`http://localhost:3000/api/delete/movimiento/${movimiento_id}`,{
        method: 'DELETE'
    })
    .then(() => {
        cargarMovimientos()
    })
    .catch((error) => {
        alert("Ocurrió un error al eliminar el movimiento")
    })
}

function editarMovimiento(movimiento_id){
    let movimiento = listaMovimientos.find(m => m.movimiento_id === movimiento_id);
    
    movimientoIdEditable = movimiento_id;
    editarValor.value = formatearMoneda(movimiento.monto);
    editarFecha.value = movimiento.fecha.split("T")[0];
    
    cargarCategoriasEnSelect(editarCategoria, movimiento.categoria_id);    
    modal.className = "modal-overlay visible";
}

function cerrarModal(){
    modal.className = "modal-overlay";
}

function guardarEdicion(movimientoId){
    let datosActualizados = {
        categoria_id: editarCategoria.value,
        monto: editarValor.value.replace(/[^0-9]/g, ''),
        fecha: editarFecha.value
    }
    fetch(`http://localhost:3000/api/update/movimiento/${movimientoId}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizados)
    })
    .then(() => {
        cerrarModal()
        cargarMovimientos()
    })
    .catch((error) => {
        alert("Ocurrió un error al actualizar el movimiento")
    })
}
