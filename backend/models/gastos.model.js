const db = require('../config/db')

class GastosModel {

    static async consultarGastos(){

        let [movimientos] = await db.query(
            `SELECT 
                cat.nombre AS nombre_categoria,
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

}

module.exports = GastosModel