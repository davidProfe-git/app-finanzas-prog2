const db = require('../config/db')

class GastosModel {

    static async consultarGastos() {
        let [movimientos] = await db.query('SELECT c.tipo_categoria, c.nombre_categoria, m.monto, m.fecha FROM movimientos m INNER JOIN categorias c ON m.categoria_id = c.categoria_id')
        return movimientos
    }

    static async consultarCategorias() {
        let [categorias] = await db.query('SELECT * FROM categorias')
        return categorias
    }

    static async crearMovimiento(datosFormulario){
        let {categoria_id, monto, fecha} = datosFormulario
        const consulta = 'INSERT INTO movimientos (usuario_id, categoria_id, monto, fecha) VALUES(? , ? , ? , ?)'
        let resultado = await db.query(consulta,['1', categoria_id, monto, fecha])
        return resultado
    }

}

module.exports = GastosModel