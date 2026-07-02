const model = require('../models/gastos.model')

class GastosController {

    static async consultarGastos(req, res) {
        const movimiento = await model.consultarGastos()
        res.status(200).json({
            success: true,
            data: movimiento
        })
    }

    static async obtenerCategoria(req, res) {
        const categoria = await model.obtenerCategoria()
        res.status(200).json({
            success: true,
            data: categoria
        })
    }

    static async obtenerUsuarios(req, res) {
        const usuarios = await model.obtenerUsuarios()
        res.status(200).json({
            success: true,
            data: usuarios
        })
    }

    static async crearGasto(req, res) {
        const { usuario, categoria, valor, tipo, fecha } = req.body

        const resultado = await model.crearGasto(
            usuario,
            categoria,
            valor,
            tipo,
            fecha
        )

        res.status(201).json({
            success: true,
            data: resultado
        })
    }

    static async actualizarGasto(req, res) {
        const { id } = req.params
        const { usuario, categoria, valor, tipo, fecha } = req.body

        const resultado = await model.actualizarGasto(
            id,
            usuario,
            categoria,
            valor,
            tipo,
            fecha
        )

        res.status(200).json({
            success: true,
            data: resultado
        })
    }

    static async eliminarGasto(req, res) {
        const { id } = req.params

        const resultado = await model.eliminarGasto(id)

        res.status(200).json({
            success: true,
            data: resultado
        })
    }

}

module.exports = GastosController