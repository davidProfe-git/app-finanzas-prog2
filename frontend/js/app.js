let ingresos = document.getElementById("row-ingreso");
let gastos = document.getElementById("row-gasto");

fetch('http://localhost:3000/api/movimientos')
.then(datos => datos.json())
.then((objeto) => {

    for(i=0; i<5; i++){
        let tipoCategoria = objeto.data[i].tipo_categoria;
        if(tipoCategoria === "ingreso"){
            ingresos.innerHTML += `<tr>
                            <td>${objeto.data[i].nombre_categoria}</td>
                            <td>${objeto.data[i].monto}</td>
                        </tr>`
        } else if(tipoCategoria === "gasto"){
            gastos.innerHTML += `<tr>
                            <td>${objeto.data[i].nombre_categoria}</td>
                            <td>${objeto.data[i].monto}</td>
                        </tr>`
        }
}
})