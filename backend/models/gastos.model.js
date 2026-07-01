const db = require('../config/db')


class GastosModel {



static async consultarGastos(){


let [movimientos] = await db.query(

`SELECT 
    IFNULL(cat.nombre,mov.tipo) AS nombre_categoria,
    mov.valor,
    mov.tipo
 FROM movimiento mov
 LEFT JOIN categoria cat
 ON cat.id_categoria = mov.id_categoria`

)


return movimientos


}






static async obtenerCategoria(){


let [categoria] = await db.query(

`SELECT 
    id_categoria as id,
    nombre
 FROM categoria`

)


return categoria


}






static async crearMovimiento(datos){


let [resultado] = await db.query(

`INSERT INTO movimiento
(id_categoria,valor,tipo,fecha)
VALUES(?,?,?,CURRENT_DATE)`,

[

datos.id_categoria,
datos.valor,
datos.tipo

]


)


return resultado


}






static async crearCategoria(nombre){


let [resultado] = await db.query(

`INSERT INTO categoria(nombre,tipo)
VALUES(?, 'Gasto')`,

[nombre]

)


return resultado


}



}



module.exports = GastosModel