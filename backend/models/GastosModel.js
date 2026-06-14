const db = require('../config/db')

class GastosModel {

    static async consultarGastos() {
        let [movimientos] = await db.query('SELECT c.tipo_categoria, c.nombre_categoria, m.monto, m.fecha FROM movimientos m INNER JOIN categorias c ON m.categoria_id = c.categoria_id')
        return movimientos
    }

}

module.exports = GastosModel

// Clase solo para probar que la conexión funcione
/*async function probar() {
    const resultado = await GastosModel.consultarGastos()
    console.log(resultado)
}

probar()*/