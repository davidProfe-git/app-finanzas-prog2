const db = require('../config/db')

class GastosModel {

    static async consultarGastos() {
        let [movimientos] = await db.query('SELECT * FROM movimientos')
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