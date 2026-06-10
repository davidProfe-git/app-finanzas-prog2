const db = require('../config/db')

class GastosModel {

    static async consultarGastos() {
        let [movimientos] = await db.query('SELECT nombre, valor, tipo FROM movimiento mov INNER JOIN categoria cat on cat.id_categoria = mov.id_categoria')  //[datos][metadatos]
        return movimientos
    }
}

module.exports = GastosModel
//como probar la conexion con la base
// async function probar() {
//     const resultado = await GastosModel.consultarGastos()
//     console.log(resultado)
// }

// probar()