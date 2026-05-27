const db = require('../config/db')

class GastosModel {

    static async consultarGastos() {
        let [movimientos] = await db.query('SELECT * FROM movimiento')
        return movimientos
    }

}


async function probar() {
    const resultado = await GastosModel.consultarGastos()
    console.log(resultado)
}

probar()