let registros = document.getElementById('registros-contenedor')

fetch('http://localhost:3000/api/movimiento')
.then(datos => datos.json())
.then((objeto)=>{ 

    for(i=0;i<3;i++){

        if(objeto.data[i].tipo == "Gasto"){
              registros.innerHTML += `<div class="fila rojo">
                        <div >${objeto.data[i].nombre}</div>
                        <div>$ ${objeto.data[i].valor}</div>
                    </div>`
        }else if(objeto.data[i].tipo == "Ingreso"){
              registros.innerHTML += `<div class="fila verde">
                        <div >${objeto.data[i].nombre}</div>
                        <div>$ ${objeto.data[i].valor}</div>
                    </div>`
        }      
    }
})            