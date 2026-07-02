const db = require('../config/db')

class GastosModel {

    static async consultarGastos() {
        let [movimientos] = await db.query('SELECT id_movimiento, categoria, valor, `tipo movimiento` AS tipo, fecha, usuario FROM movimiento')
        return movimientos
    }

    static async obtenerCategoria() {
        let [categoria] = await db.query('SELECT id_categoria, nombre, tipo FROM categoria')
        return categoria
    }

    static async obtenerUsuarios() {
        let [usuarios] = await db.query('SELECT usuario FROM usuario')
        return usuarios
    }

    static async crearGasto(usuario, categoria, valor, tipo, fecha) {
        let [resultado] = await db.query(
            'INSERT INTO movimiento (usuario, categoria, valor, `tipo movimiento`, fecha) VALUES (?, ?, ?, ?, ?)',
            [usuario, categoria, valor, tipo, fecha]
        )
        return resultado
    }

    static async actualizarGasto(id, usuario, categoria, valor, tipo, fecha) {
        let [resultado] = await db.query(
            'UPDATE movimiento SET usuario = ?, categoria = ?, valor = ?, `tipo movimiento` = ?, fecha = ? WHERE id_movimiento = ?',
            [usuario, categoria, valor, tipo, fecha, id]
        )
        return resultado
    }

    static async eliminarGasto(id) {
        let [resultado] = await db.query(
            'DELETE FROM movimiento WHERE id_movimiento = ?',
            [id]
        )
        return resultado
    }

}

module.exports = GastosModel