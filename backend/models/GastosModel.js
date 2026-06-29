const db = require('../config/db')

class GastosModel {

    static async consultarGastos() {
        let [movimientos] = await db.query('SELECT c.tipo_categoria, c.nombre_categoria, m.monto, m.fecha, c.descripcion FROM movimientos m INNER JOIN categorias c ON m.categoria_id = c.categoria_id')
        return movimientos
    }

    static async consultarCategorias() {
        let [categorias] = await db.query('SELECT * FROM categorias ORDER BY tipo_categoria, nombre_categoria')
        return categorias
    }

    static async crearMovimiento(datosFormulario){
        let {categoria_id, monto, fecha} = datosFormulario
        const consulta = 'INSERT INTO movimientos (usuario_id, categoria_id, monto, fecha) VALUES(? , ? , ? , ?)'
        let resultado = await db.query(consulta,['1', categoria_id, monto, fecha])
        return resultado
    }

    static async eliminarMovimiento(movimiento_id){
        const consulta = 'DELETE FROM movimientos WHERE movimiento_id = ?'
        let resultado = await db.query(consulta, [movimiento_id])
        return resultado
    }

    static async actualizarMovimiento(movimiento_id, datos_actualizados){
        let {categoria_id, monto, fecha} = datos_actualizados
        const consulta = 'UPDATE movimientos SET categoria_id = ?, monto = ?, fecha = ? WHERE movimiento_id = ?'
        let resultado = await db.query(consulta, [categoria_id, monto, fecha, movimiento_id])
        return resultado
    }

}

module.exports = GastosModel