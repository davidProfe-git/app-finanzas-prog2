let registros = document.getElementById('registros-contenedor')
let btn_categoria = document.getElementById('categoria')
let inputMonto = document.getElementById('monto')
let inputFecha = document.getElementById('fecha')
let btnIngreso = document.getElementById('boton-ingresos')
let btnGasto = document.getElementById('boton-gastos')

let idEditar = null

// Cargar categorías en el select
fetch('http://localhost:3000/api/categoria')
.then(datos => datos.json())
.then((categoria)=>{
    for(let i=0; i < categoria.data.length; i++){
        btn_categoria.innerHTML += `<option value="${categoria.data[i].nombre}">${categoria.data[i].nombre}</option>`
    }
})

// Función para cargar y mostrar los movimientos
function cargarMovimientos(){

    registros.innerHTML = ''

    fetch('http://localhost:3000/api/movimiento')
    .then(datos => datos.json())
    .then((objeto)=>{

        for(let i=0; i<objeto.data.length; i++){

            let mov = objeto.data[i]

            let claseColor = (mov.tipo === 'Ingreso') ? 'verde' : 'rojo'

            registros.innerHTML += `
                <div class="fila ${claseColor}">
                    <div>${mov.categoria}</div>
                    <div>$ ${mov.valor}</div>
                    <div>${mov.fecha.substring(0,10)}</div>

                    <button onclick="editarMovimiento(
                        ${mov.id_movimiento},
                        '${mov.categoria}',
                        '${mov.valor}',
                        '${mov.tipo}',
                        '${mov.fecha.substring(0,10)}'
                    )">
                        Editar
                    </button>

                    <button onclick="eliminarMovimiento(${mov.id_movimiento})">
                        Eliminar
                    </button>

                </div>
            `
        }

    })

}

function crearMovimiento(tipo){

    const monto = inputMonto.value
    const categoria = btn_categoria.value
    const fecha = inputFecha.value

    if(!monto || !categoria || !fecha){
        alert('Por favor completa todos los campos')
        return
    }

    if(idEditar != null){

        fetch(`http://localhost:3000/api/movimiento/${idEditar}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                usuario:'eileen',
                categoria:categoria,
                valor:monto,
                tipo:tipo,
                fecha:fecha
            })
        })
        .then(datos=>datos.json())
        .then(respuesta=>{

            idEditar=null

            inputMonto.value=''
            inputFecha.value=''

            cargarMovimientos()

        })

    }else{

        fetch('http://localhost:3000/api/movimiento',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                usuario:'eileen',
                categoria:categoria,
                valor:monto,
                tipo:tipo,
                fecha:fecha
            })
        })
        .then(datos=>datos.json())
        .then(respuesta=>{

            inputMonto.value=''
            inputFecha.value=''

            cargarMovimientos()

        })

    }

}

function eliminarMovimiento(id){

    if(confirm("¿Desea eliminar este movimiento?")){

        fetch(`http://localhost:3000/api/movimiento/${id}`,{
            method:'DELETE'
        })
        .then(datos=>datos.json())
        .then(respuesta=>{
            cargarMovimientos()
        })

    }

}
function editarMovimiento(id,categoria,valor,tipo,fecha){

    idEditar = id

    btn_categoria.value = categoria
    inputMonto.value = valor
    inputFecha.value = fecha

    alert("Modifica los datos y luego presiona Ingresos o Gastos para actualizar.")

}

cargarMovimientos()

btnIngreso.addEventListener('click', ()=> crearMovimiento('Ingreso'))
btnGasto.addEventListener('click', ()=> crearMovimiento('Gasto'))