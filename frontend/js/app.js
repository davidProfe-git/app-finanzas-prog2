let ingresos = document.getElementById("row-ingreso");
let gastos = document.getElementById("row-gasto");
let slt_categorias = document.getElementById("select-categorias");

fetch('http://localhost:3000/api/movimientos')
.then(datos => datos.json())
.then((movimientos) => {

    for(i=0; i<5; i++){
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

fetch('http://localhost:3000/api/categorias')
.then(datos => datos.json())
.then((categoriasDb) => {

    for(i=0; i<categoriasDb.data.length; i++){
        slt_categorias.innerHTML += `<option value="${categoriasDb.data[i].nombre_categoria}">${categoriasDb.data[i].nombre_categoria+" ("+categoriasDb.data[i].descripcion+")"}</option>`
    }
})

