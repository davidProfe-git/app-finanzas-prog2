document.addEventListener("DOMContentLoaded", () => {

    console.log("JS cargado correctamente");

    const registros = document.getElementById("registros-contenedor");
    const select = document.getElementById("categoria");

    // ==========================
    // CARGAR CATEGORÍAS
    // ==========================
    fetch("http://localhost:3000/api/categoria")
        .then(res => res.json())
        .then((respuesta) => {

            select.innerHTML = `<option value="">Selecciona una opción</option>`;

            respuesta.data.forEach(cat => {

                select.innerHTML += `
                    <option value="${cat.id_categoria}">
                        ${cat.nombre}
                    </option>
                `;

            });

        })
        .catch(error => {
            console.error("Error cargando categorías:", error);
        });

    // ==========================
    // CARGAR MOVIMIENTOS
    // ==========================
    fetch("http://localhost:3000/api/movimiento")
        .then(res => res.json())
        .then((respuesta) => {

            console.log("movimientos:", respuesta);

            registros.innerHTML = "";

            respuesta.data.forEach(item => {

                registros.innerHTML += `
                    <li class="historial-item">

                        <div class="item-info">
                            <span class="item-nombre">
                                ${item.nombre_categoria || "Ingreso"}
                            </span>

                            <span class="item-fecha">
                                ${item.tipo}
                            </span>
                        </div>

                        <span class="item-monto ${item.tipo === "Ingreso" ? "ingreso" : "gasto"}">
                            $${item.valor}
                        </span>

                    </li>
                `;

            });

        })
        .catch(error => {
            console.error("Error cargando movimientos:", error);
        });

});