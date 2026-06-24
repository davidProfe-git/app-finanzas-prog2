let registros = document.getElementById('registros-contenedor')

//datos del formulario
let inp_monto = document.getElementById('monto') 
let btn_categoria = document.getElementById('categoria')
let btn_fecha = document.getElementById('fecha')




let btn_ingresos = document.getElementById('boton-ingresos')



//aca se pintan los datos del select
fetch('http://localhost:3000/api/categoria')
.then(datos => datos.json())
.then((categoria)=>{ 

    for(i=0;i < categoria.data.length;i++){

        
              btn_categoria.innerHTML += `<option value=${categoria.data[i].id}>${categoria.data[i].nombre}</option>`      
    }
}) 


//aca se pintan los registros de transacciones
fetch('http://localhost:3000/api/movimiento')
.then(datos => datos.json())
.then((objeto)=>{ 

    for(i=0;i<5;i++){

        if(objeto.data[i].tipo == "Gasto"){
              registros.innerHTML += `<div class="fila rojo">
                        <div >${objeto.data[i].nombre}</div>
                        <div>$ ${objeto.data[i].valor}</div>
                    </div>`
        }else if(objeto.data[i].tipo == "Ingreso"){
              registros.innerHTML += `<div class="fila verde">
                        <div>${objeto.data[i].nombre}</div>
                        <div>$ ${objeto.data[i].valor}</div>
                    </div>`
        }       
    }
})            



btn_ingresos.addEventListener('click', ()=> guardar())


function guardar(){

    let datosForm = {

     id_categoria: btn_categoria.value, 
     valor: inp_monto.value, 
     fecha: btn_fecha.value

    }





}