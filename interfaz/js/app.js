let registros = document.getElementById('registros-contenedor')
let btn_categoria = document.getElementById('categoria')




fetch('http://localhost:3000/api/categoria')
.then(datos => datos.json())
.then((categoria)=>{ 

    for(i=0;i < categoria.data.length;i++){

        
              btn_categoria.innerHTML += `<option value=${categoria.data[i].id}>${categoria.data[i].nombre}</option>`      
    }
}) 








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
                        <div >${objeto.data[i].nombre}</div>
                        <div>$ ${objeto.data[i].valor}</div>
                    </div>`
        }      
    }
})            