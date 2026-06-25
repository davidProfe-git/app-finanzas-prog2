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
        
        const consulta = 'INSERT INTO movimiento (usuario, id_categoria, valor, fecha) VALUES(? , ? , ? , ?)'
        let resultado = await db.query(consulta,['david', ])

    }

}

module.exports = GastosModel