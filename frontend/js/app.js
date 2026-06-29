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

function cargarMovimientos(){
    fetch('http://localhost:3000/api/movimientos')
    .then(datos => datos.json())
    .then((movimientos) => {

        ingresos.innerHTML = ""
        gastos.innerHTML = ""

        for(i=0; i<movimientos.data.length; i++){
            let tipoCategoria = movimientos.data[i].tipo_categoria
            if(tipoCategoria === "ingreso"){
                ingresos.innerHTML += `<tr>
                <td>${movimientos.data[i].nombre_categoria}</td>
                <td>${movimientos.data[i].monto}</td>
                </tr>`
            } else if (tipoCategoria === "gasto") {
                gastos.innerHTML += `<tr>
                <td>${movimientos.data[i].nombre_categoria}</td>
                <td>${movimientos.data[i].monto}</td>
                </tr>`
            }
        }
    })
}

function cargarCategorias(){
    fetch('http://localhost:3000/api/categorias')
    .then(datos => datos.json())
    .then((categoriasDb) => {
        for(i=0; i<categoriasDb.data.length; i++){
            slt_categorias.innerHTML += `<option value="${categoriasDb.data[i].categoria_id}">${categoriasDb.data[i].nombre_categoria+" ("+categoriasDb.data[i].descripcion+")"}</option>`
        }
    })
}

function limpiarFormulario(){
    value_inserted.value = ""
    slt_categorias.value = ""
    date.value = ""
}

btn_registrar.addEventListener('click',()=>guardar()) 

function guardar(){
    //alert("Se ha registrado el movimiento correctamente")
    let datosForm = {
        categoria_id: slt_categorias.value,
        monto: value_inserted.value,
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
        console.error('Error:', error)
    })
}

