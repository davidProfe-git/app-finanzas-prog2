//Elementos de las tablas de ingresos y gastos
let ingresos = document.getElementById("row-ingreso");
let gastos = document.getElementById("row-gasto");

//Elementos de los Datos del formulario
let value_inserted = document.getElementById('valor')
let slt_categorias = document.getElementById("select-categorias");
let date = document.getElementById("fecha");

//Elementos de interacción con el usuario
let btn_registrar = document.getElementById("btn-registrar")

// Cargamos todo al iniciar la página
cargarMovimientos();
cargarCategorias();

//Eventos de interacción con el usuario
value_inserted.addEventListener('input', () => formatearCampoValor());
btn_registrar.addEventListener('click',()=>guardarMovimiento());

function cargarMovimientos(){
    fetch('http://localhost:3000/api/movimientos')
    .then(datos => datos.json())
    .then((movimientos) => {

        ingresos.innerHTML = ""
        gastos.innerHTML = ""

        for(let i=0; i<movimientos.data.length; i++){
            let movimiento = movimientos.data[i]
            let tipoCategoria = movimientos.data[i].tipo_categoria

            let fila = `<tr title="${movimientos.data[i].descripcion}">
                <td>${movimientos.data[i].nombre_categoria}</td>
                <td>${formatearMoneda(movimientos.data[i].monto)}</td>
                <td>${formatearFecha(movimientos.data[i].fecha)}</td>
                <td class="acciones">
                    <span class="icon-editar">✏️</span>
                    <span class="icon-eliminar">🗑️</span>
                </td>
            </tr>`

            if(tipoCategoria === "ingreso"){
                ingresos.innerHTML += fila
            } else if (tipoCategoria === "gasto") {
                gastos.innerHTML += fila
            }
        }
    })
}

function cargarCategorias(){
    fetch('http://localhost:3000/api/categorias')
    .then(datos => datos.json())
    .then((categoriasDb) => {
        for(let i=0; i<categoriasDb.data.length; i++){
            slt_categorias.innerHTML += `<option value="${categoriasDb.data[i].categoria_id}" title="${categoriasDb.data[i].descripcion}">[${categoriasDb.data[i].tipo_categoria.toUpperCase()}] ${categoriasDb.data[i].nombre_categoria}</option>`
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

function formatearCampoValor(){
    let numeroLimpio = value_inserted.value.replace(/[^0-9]/g, '');
    if (numeroLimpio === '') {
        value_inserted.value = ''
        return
    }
    value_inserted.value = formatearMoneda(numeroLimpio);
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

