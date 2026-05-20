let balance = 0

let contador ={
    salud:0,
    servicios:0,
    arriendo:0,
    transporte:0,
    otros:0
};

function actualizar(){
    document.getElementById("amount").innerText = balance.toLocaleString();
}

function toggleIngresos(){
    let menu = document.getElementById("menuIngresos");
    menu.style.display = (menu.style.display === "none" ? "block" : "none");
}
 
function toggleGastos(){
    let menu = document.getElementById("menuGastos");
    menu.style.display = (menu.style.display === "none" ? "block" : "none");
}

function agregarIngresos(valor){
    balance += valor;
    actualizar();
}

function ingresoOtros(){
    let valor = parseFloat(prompt("Ingrese el monto del ingreso:"));
    if (!isNaN(valor) && valor > 0) {
        balance += valor;
        actualizar();
    }
}

function agregarGastos(tipo, valor){
    balance -= valor;
    contador[tipo] ++;
    document.getElementById("contador-" + tipo).innerText = contador[tipo];
    actualizar();
}

function gastoOtros(){
    let valor = parseFloat(prompt("Ingrese el monto del gasto:"));
    if (!isNaN(valor) && valor > 0) {
        balance -= valor;
        actualizar();
    }
}