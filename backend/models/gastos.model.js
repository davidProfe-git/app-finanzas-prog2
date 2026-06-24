const db = require('../config/db')

class GastosModel {

    static async consultarGastos() {
        let [movimientos] = await db.query('SELECT nombre, valor, tipo FROM movimiento mov INNER JOIN categoria cat on cat.id_categoria = mov.id_categoria')  //[datos][metadatos]
        return movimientos
    }

    static async obtenerCategoria() {
        let [categoria] = await db.query('SELECT id_categoria as id, nombre FROM categoria')  //[datos][metadatos]
        return categoria
    }

    static async crearMovimiento(datosFormulario){
        
        const consulta = 'INSERT INTO movimeinto (usuario, id_categoria, valor, fecha) VALUES(? , ? , ? , ?)'
        let resultado = await db.query(consulta,['david', ])

    }




}

module.exports = GastosModel


//como probar la conexion con la base
// async function probar() {
//     const resultado = await GastosModel.consultarGastos()
//     console.log(resultado)
// }

// probar()