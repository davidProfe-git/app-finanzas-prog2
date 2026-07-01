document.addEventListener("DOMContentLoaded", () => {


    console.log("JS cargado correctamente");


    const registros = document.getElementById("registros-contenedor");
    const select = document.getElementById("categoria");



    // =========================
    // CARGAR CATEGORIAS
    // =========================

    function cargarCategorias(){


        fetch("http://localhost:3000/api/categoria")

        .then(res => res.json())

        .then(respuesta => {


            select.innerHTML =
            `<option value="">Selecciona una opción</option>`;


            respuesta.data.forEach(cat => {


                select.innerHTML += `

                <option value="${cat.id}">

                    ${cat.nombre}

                </option>

                `;


            });


        })

        .catch(error => {

            console.error(
                "Error cargando categorias:",
                error
            );

        });


    }


    cargarCategorias();





    // =========================
    // CARGAR MOVIMIENTOS
    // =========================


    function cargarMovimientos(){


        fetch("http://localhost:3000/api/movimiento")


        .then(res => res.json())


        .then(respuesta => {


            console.log(
                "movimientos:",
                respuesta
            );


            registros.innerHTML = "";



            respuesta.data.forEach(item => {


                registros.innerHTML += `


                <li class="historial-item">


                    <div class="item-info">


                        <span class="item-nombre">

                            ${item.nombre_categoria}

                        </span>



                        <span class="item-fecha">

                            ${item.tipo}

                        </span>



                    </div>



                    <span class="item-monto ${
                        
                        item.tipo === "Ingreso"
                        ? "ingreso"
                        : "gasto"

                    }">

                        $${item.valor}

                    </span>



                </li>


                `;


            });


        })


        .catch(error => {

            console.error(
                "Error cargando movimientos:",
                error
            );

        });



    }



    cargarMovimientos();

    






    // =========================
    // TIPO MOVIMIENTO
    // =========================


    let tipoActual = "Gasto";



    document.querySelector(".btn-ingresos")

    .onclick = () => {


        tipoActual = "Ingreso";


        document.querySelector(".form-titulo")
        .innerText = "Registrar ingreso";


    };





    document.querySelector(".btn-gastos")

    .onclick = () => {


        tipoActual = "Gasto";


        document.querySelector(".form-titulo")
        .innerText = "Registrar gasto";


    };








    // =========================
    // GUARDAR MOVIMIENTO
    // =========================


    document.querySelector(".guardar")

    .onclick = () => {



        const valor =
        document.getElementById("monto").value;



        const categoria =
        document.getElementById("categoria").value;



        if(valor === "" || categoria === ""){


            alert("Complete todos los campos");

            return;

        }




        fetch("http://localhost:3000/api/movimiento",
        {


            method:"POST",


            headers:{


                "Content-Type":"application/json"


            },


            body:JSON.stringify({

                valor:Number(valor),

                tipo:tipoActual,

                id_categoria:Number(categoria)

            })


        })



        .then(res => res.json())


        .then(data => {


            console.log(
                "RESPUESTA:",
                data
            );



            if(data.success){


                alert("Movimiento guardado");



                document.getElementById("monto")
                .value = "";



                cargarMovimientos();

                cargarResumen();



            }else{


                alert(
                    "Error: "
                    + data.error
                );


            }



        })



        .catch(error => {


            console.error(error);


            alert(
                "Error conectando al servidor"
            );


        });



    };

    // =========================
// CREAR NUEVA CATEGORIA
// =========================


const btnCategoria =
document.getElementById("btnCategoria");


const nuevaCategoriaBox =
document.getElementById("nuevaCategoriaBox");


const guardarCategoria =
document.getElementById("guardarCategoria");



btnCategoria.onclick = () => {


    if(nuevaCategoriaBox.style.display === "none"){

        nuevaCategoriaBox.style.display="block";

    }else{

        nuevaCategoriaBox.style.display="none";

    }

};





guardarCategoria.onclick = () => {


    const nombre =
    document.getElementById("nombreCategoria").value;



    if(nombre.trim()===""){


        alert("Ingrese una categoría");

        return;

    }




    fetch("http://localhost:3000/api/categoria",
    {


        method:"POST",


        headers:{

            "Content-Type":"application/json"

        },


        body:JSON.stringify({

            nombre:nombre

        })


    })



    .then(res=>res.json())


    .then(data=>{


        console.log("categoria creada:", data);



        if(data.success){


            alert("Categoría agregada");


            document.getElementById("nombreCategoria")
            .value="";


            cargarCategorias();



        }else{


            alert("Error: "+data.error);

        }



    })



    .catch(error=>{


        console.error(error);

        alert("Error conectando");

    });



};
    function cargarResumen(){


fetch("http://localhost:3000/api/resumen")


.then(res=>res.json())


.then(data=>{


const ingresos =
Number(data.data.ingresos || 0);


const gastos =
Number(data.data.gastos || 0);



const balance =
ingresos - gastos;



document.getElementById("balance")
.innerText =
"$" + balance.toLocaleString();



document.getElementById("totalIngresos")
.innerText =
"$" + ingresos.toLocaleString();



document.getElementById("totalGastos")
.innerText =
"$" + gastos.toLocaleString();



})


}

});