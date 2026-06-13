let ingresos = document.getElementById("row-ingreso");

let titulo = "Sueldo"
let valor = 2500000

for(i=0; i<5; i++){
    ingresos.innerHTML += `<tr>
                            <td>${titulo + i}</td>
                            <td>${valor}</td>
                        </tr>`
}